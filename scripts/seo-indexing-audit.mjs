import fs from 'node:fs/promises';
import path from 'node:path';
import { createSign } from 'node:crypto';

const SEO_BASE_URL = (process.env.SEO_BASE_URL || 'https://www.sent-tech.ca').replace(/\/$/, '');
const SITEMAP_URL = `${SEO_BASE_URL}/sitemap.xml`;
const GSC_PROPERTY_URL = (process.env.GSC_SITE_URL || `${SEO_BASE_URL}/`).trim();
const GSC_SCOPE = (process.env.GSC_SCOPE || 'https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly').trim();
const REPORT_DIR = '.artifacts';
const REPORT_FILE_TXT = path.join(REPORT_DIR, 'seo-indexing-audit.txt');
const REPORT_FILE_JSON = path.join(REPORT_DIR, 'seo-indexing-audit.json');
const MAX_URLS = Number.parseInt(process.env.SEO_INDEXING_URL_LIMIT || '0', 10);

function toBase64Url(value) {
  return Buffer.from(value).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function parseServiceAccount(raw) {
  if (!raw) return null;

  const trimmed = raw.trim();

  try {
    if (trimmed.startsWith('{')) {
      return JSON.parse(trimmed);
    }

    if (!path.isAbsolute(trimmed)) {
      raw = path.join(process.cwd(), trimmed);
    }

    return JSON.parse(await fs.readFile(raw, 'utf8'));
  } catch (error) {
    throw new Error(`Invalid GSC service account value: ${error.message}`);
  }
}

async function fetchJson(url, options = {}, retries = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'manual',
        headers: {
          ...(options.body && options.body instanceof URLSearchParams ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
          ...options.headers,
        },
        method: options.method || 'GET',
        body: options.body,
      });

      const text = await response.text();
      let data = { raw: text };
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }
      }

      return { status: response.status, data, ok: response.ok, text };
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown fetch error';
      if (attempt < retries) {
        await new Promise((resolve) => {
          setTimeout(resolve, 500 * attempt);
        });
      }
    }
  }

  throw new Error(lastError || 'Failed to call remote endpoint');
}

function parseSitemap(xml) {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim()).filter(Boolean);
  return [...new Set(matches)];
}

async function readSitemapUrls() {
  const sitemapResponse = await fetchJson(SITEMAP_URL, {}, 4);
  if (!sitemapResponse.ok) {
    throw new Error(`Cannot read sitemap ${SITEMAP_URL}: status ${sitemapResponse.status}`);
  }

  const sitemapText = sitemapResponse.data?.raw || '';
  const urls = parseSitemap(typeof sitemapText === 'string' ? sitemapText : `${sitemapText}`);

  if (!urls.length) {
    throw new Error(`No URLs found in sitemap ${SITEMAP_URL}`);
  }

  const limited = Number.isNaN(MAX_URLS) || MAX_URLS <= 0 ? urls : urls.slice(0, MAX_URLS);
  return limited;
}

async function getGoogleAccessToken() {
  const rawKey = process.env.GSC_SERVICE_ACCOUNT_KEY || process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!rawKey) return null;

  const account = await parseServiceAccount(rawKey);
  if (!account) return null;

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    iss: account.client_email,
    scope: GSC_SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: issuedAt,
    exp: issuedAt + 3600,
  };

  const privateKey = account.private_key.replace(/\\n/g, '\n');
  const signInput = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(payload))}`;
  const signer = createSign('RSA-SHA256');
  signer.update(signInput);
  signer.end();
  const signature = signer.sign(privateKey).toString('base64url');

  const token = `${signInput}.${signature}`;
  const tokenPayload = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: token,
  });

  const response = await fetchJson(
    'https://oauth2.googleapis.com/token',
    { method: 'POST', body: tokenPayload, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    3
  );

  if (!response.ok || !response.data.access_token) {
    const message = response.data?.error_description || response.data?.error || 'Unknown OAuth error';
    throw new Error(`Google OAuth token error: ${message}`);
  }

  return response.data.access_token;
}

async function submitGscSitemap(token) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_PROPERTY_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  const response = await fetchJson(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, 3);

  if (!response.ok && response.status !== 409) {
    const message = response.data?.error?.message || response.text || `HTTP ${response.status}`;
    return {
      result: 'FAIL',
      ok: false,
      statusCode: response.status,
      reason: `SITEMAP_SUBMIT_ERROR:${message}`,
    };
  }

  return {
    result: 'PASS',
    ok: true,
    statusCode: response.status,
    reason: response.status === 409 ? 'SITEMAP_ALREADY_SUBMITTED' : 'SITEMAP_SUBMIT_OK',
  };
}

async function inspectGscUrl(token, url) {
  const response = await fetchJson(
    'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: GSC_PROPERTY_URL,
      }),
    },
    3
  );

  if (!response.ok) {
    const message = response.data?.error?.message || `HTTP ${response.status}`;
    return {
      url,
      status: 'FAIL',
      ok: false,
      indexStatus: 'UNKNOWN',
      coverageState: 'UNKNOWN',
      robotsTxtState: 'UNKNOWN',
      userCanonical: '',
      googleCanonical: '',
      warnings: [],
      issues: [`gsc_error:${message}`],
      reason: `gsc_error:${message}`,
      raw: response.data,
    };
  }

  const result = response.data?.inspectionResult?.indexStatusResult || {};

  const indexStatus = result.indexStatus || 'UNKNOWN';
  const coverageState = result.coverageState || 'UNKNOWN';
  const robotsTxtState = result.robotsTxtState || 'UNKNOWN';
  const userCanonical = result.userCanonical || '';
  const googleCanonical = result.googleCanonical || '';

  const issues = [];
  const warnings = [];
  if (indexStatus === 'PASS') {
    // no issue
  } else if (indexStatus === 'UNKNOWN') {
    warnings.push(`indexStatus:${indexStatus}`);
  } else {
    issues.push(`indexStatus:${indexStatus}`);
  }

  if (robotsTxtState && robotsTxtState !== 'ALLOWED') {
    issues.push(`robotsTxt:${robotsTxtState}`);
  }

  if (googleCanonical && userCanonical && googleCanonical !== userCanonical) {
    issues.push(`canonical_mismatch user=${userCanonical} google=${googleCanonical}`);
  }

  const status = issues.length > 0 ? 'FAIL' : warnings.length > 0 ? 'WARN' : 'PASS';

  return {
    url,
    indexStatus,
    coverageState,
    robotsTxtState,
    userCanonical,
    googleCanonical,
    status,
    ok: status === 'PASS',
    warnings,
    issues: [...issues, ...warnings],
  };
}

async function runGscAudit() {
  const token = await getGoogleAccessToken();
  if (!token) {
    return {
      skipped: true,
      message: 'No GSC credentials found (GSC_SERVICE_ACCOUNT_KEY or GSC_SERVICE_ACCOUNT_JSON).',
      items: [],
    };
  }

  const urls = await readSitemapUrls();
  const items = [];
  const sitemapSubmission = await submitGscSitemap(token);

  console.log(`${sitemapSubmission.result} - GSC sitemap submit ${SITEMAP_URL}`);

  for (const url of urls) {
    const result = await inspectGscUrl(token, url);
    items.push(result);
    const status = result.status;
    const issues = result.issues && result.issues.length ? ` | ${result.issues.join(' | ')}` : '';
    console.log(`${status} - GSC ${url} [index=${result.indexStatus || 'n/a'} coverage=${result.coverageState || 'n/a'}]${issues}`);
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const failures = items.filter((item) => item.status === 'FAIL');
  const warnings = items.filter((item) => item.status === 'WARN');
  return {
    skipped: false,
    sitemapSubmission,
    items,
    failures,
    warnings,
  };
}

async function runBingAudit() {
  const endpoint = process.env.BING_REPORT_URL;
  if (!endpoint) {
    return {
      skipped: true,
      message: 'No Bing endpoint configured (BING_REPORT_URL).',
    };
  }

  const key = process.env.BING_REPORT_API_KEY || '';
  const headerName = process.env.BING_REPORT_HEADER_NAME || (key ? 'Authorization' : '');
  const headerValue = process.env.BING_REPORT_HEADER_VALUE || (key ? `Bearer ${key}` : '');
  const headers = headerName && headerValue ? { [headerName]: headerValue } : {};

  const url = endpoint.includes('{site}')
    ? endpoint.replace('{site}', encodeURIComponent(GSC_PROPERTY_URL))
    : endpoint;

  const response = await fetchJson(url, { method: 'GET', headers }, 2);
  if (!response.ok) {
    const message = response.data?.message || response.data?.error || `HTTP ${response.status}`;
    return {
      skipped: false,
      failures: [{ reason: `BING_API_ERROR:${message}` }],
      raw: response.data,
      status: response.status,
    };
  }

  return {
    skipped: false,
    status: response.status,
    raw: response.data,
  };
}

async function writeReports(payload) {
  await fs.mkdir(REPORT_DIR, { recursive: true });
  const plain = [];

  plain.push('SEO indexing audit');
  plain.push(`Date: ${new Date().toISOString()}`);
  plain.push(`Sitemap: ${SITEMAP_URL}`);
  plain.push('');

  if (payload.gsc?.skipped) {
    plain.push(`GSC: skipped (${payload.gsc.message})`);
  } else if (payload.gsc) {
    plain.push(`GSC: ${payload.gsc.items.length} URLs checked`);
    if (payload.gsc.sitemapSubmission) {
      plain.push(
        `GSC sitemap submit: ${payload.gsc.sitemapSubmission.result} (${payload.gsc.sitemapSubmission.reason})`
      );
    }
    if (payload.gsc.failures && payload.gsc.failures.length) {
      plain.push(`GSC: ${payload.gsc.failures.length} FAIL (blocking)`);
    }
    if (payload.gsc.warnings && payload.gsc.warnings.length) {
      plain.push(`GSC: ${payload.gsc.warnings.length} WARN (non-blocking)`);
    }
    for (const item of payload.gsc.items) {
      const status = item.status;
      const issues = item.issues && item.issues.length ? ` | ${item.issues.join(' | ')}` : '';
      plain.push(`${status} ${item.url} [index=${item.indexStatus}, coverage=${item.coverageState}]${issues}`);
    }
  }

  plain.push('');

  if (payload.bing?.skipped) {
    plain.push(`Bing: skipped (${payload.bing.message})`);
  } else if (payload.bing) {
    plain.push(`Bing: endpoint checked (status=${payload.bing.status || 'ok'})`);
    if (payload.bing.failures && payload.bing.failures.length) {
      for (const failure of payload.bing.failures) {
        plain.push(`FAIL Bing: ${failure.reason}`);
      }
    }
  }

  await fs.writeFile(REPORT_FILE_TXT, `${plain.join('\n')}\n`, 'utf8');
  await fs.writeFile(REPORT_FILE_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

async function main() {
  const [gsc, bing] = await Promise.all([runGscAudit(), runBingAudit()]);
  const payload = { gsc, bing };
  let failed = 0;

  if (!gsc.skipped && gsc.failures && gsc.failures.length) {
    failed += 1;
  }

  if (!gsc.skipped && gsc.sitemapSubmission && gsc.sitemapSubmission.ok === false) {
    failed += 1;
  }

  if (bing && !bing.skipped && bing.failures && bing.failures.length) {
    failed += 1;
  }

  await writeReports(payload);

  if (failed > 0) {
    console.error('SEO indexing audit found issues.');
    process.exitCode = 1;
  } else {
    console.log('SEO indexing audit passed');
  }
}

main().catch((error) => {
  console.error('SEO indexing audit failed with error:', error.message);
  process.exitCode = 1;
});
