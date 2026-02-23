import fs from 'node:fs/promises';
import path from 'node:path';

const canonicalHost = 'https://www.sent-tech.ca';
const nonCanonicalHost = 'https://sent-tech.ca';

function printResult(name, pass, details = '') {
  const status = pass ? 'OK  ' : 'FAIL';
  const message = `${status} - ${name}`;
  if (details) {
    console.log(`${message} (${details})`);
  } else {
    console.log(message);
  }
}

async function head(url) {
  let lastError = 'Unknown fetch error';

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual',
      });

      return {
        status: response.status,
        location: response.headers.get('location') || '',
        error: '',
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown fetch error';
      if (attempt < 3) {
        await new Promise((resolve) => {
          setTimeout(resolve, 350 * attempt);
        });
      }
    }
  }

  return {
    status: 0,
    location: '',
    error: lastError,
  }
}

function assertRedirect(actualLocation, expectedUrl) {
  if (!actualLocation) return false;
  try {
    const normalizedActual = new URL(actualLocation, expectedUrl).toString();
    return normalizedActual === expectedUrl;
  } catch {
    return false;
  }
}

async function collectSlugs() {
  const roots = [
    path.join(process.cwd(), 'src', 'content', 'blog', 'fr'),
    path.join(process.cwd(), 'src', 'content', 'blog', 'en'),
  ];

  const slugSet = new Set();

  for (const root of roots) {
    const entries = await fs.readdir(root, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith('.md')) continue;

      slugSet.add(entry.name.replace(/\.md$/, ''));
    }
  }

  return [...slugSet].sort();
}

function parseSitemapEntries(xml) {
  const entries = [];

  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  for (const block of blocks) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc) continue;

    const alternates = [...block.matchAll(/<xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"[^>]*>/g)].map(
      ([, rel, href]) => ({ rel, href })
    );

    entries.push({ loc, alternates });
  }

  return entries;
}

async function main() {
  let failed = 0;

  const slugs = await collectSlugs();
  const blogChecks = slugs.map((slug) => ({
    canonical: [
      `${canonicalHost}/blog/${slug}/`,
      `${canonicalHost}/en/blog/${slug}/`,
    ],
  }));

  const canonicalChecks = [
    canonicalHost + '/',
    canonicalHost + '/blog/',
    canonicalHost + '/en/blog/',
    ...blogChecks.flatMap((entry) => entry.canonical),
  ];

  // Canonical routes expected in 200.
  for (const url of canonicalChecks) {
    const { status, error } = await head(url);
    const pass = status === 200 && !error;
    if (!pass) failed += 1;
    printResult(`HEAD ${url} -> ${status || 0}`, pass, error || undefined);
  }

  const redirectChecks = [
    {
      url: nonCanonicalHost + '/',
      expectedLocation: canonicalHost + '/',
    },
    {
      url: nonCanonicalHost + '/blog/ai-dev-autonomy/',
      expectedLocation: canonicalHost + '/blog/ai-dev-autonomy/',
    },
    {
      url: `${nonCanonicalHost}/blog/ai-dev-autonomy/?utm=1`,
      expectedLocation: `${canonicalHost}/blog/ai-dev-autonomy/?utm=1`,
    },
    {
      url: nonCanonicalHost + '/en/blog/',
      expectedLocation: canonicalHost + '/en/blog/',
    },
    {
      url: canonicalHost + '/blog',
      expectedLocation: canonicalHost + '/blog/',
    },
    {
      url: canonicalHost + '/en/blog',
      expectedLocation: canonicalHost + '/en/blog/',
    },
  ];

  for (const check of redirectChecks) {
    const { status, location, error } = await head(check.url);
    const pass = status === 301 && assertRedirect(location, check.expectedLocation) && !error;
    if (!pass) failed += 1;
    printResult(
      `HEAD ${check.url} -> ${status}`,
      pass,
      pass ? `location: ${location}` : `location: ${location || 'missing'}${error ? `, error: ${error}` : ''}`
    );
  }

  const sitemapContent = await fs.readFile(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
  const sitemapEntries = parseSitemapEntries(sitemapContent);

  for (const entry of sitemapEntries) {
    const { status, error } = await head(entry.loc);
    const trailingSlashOk = entry.loc === canonicalHost + '/' || entry.loc.endsWith('/');
    const hasFr = entry.alternates.some((value) => value.rel === 'fr');
    const hasEn = entry.alternates.some((value) => value.rel === 'en');
    const hasDefault = entry.alternates.some((value) => value.rel === 'x-default');

    const pass = status === 200 && !error && trailingSlashOk && hasFr && hasEn && hasDefault;
    if (!pass) failed += 1;

    const details = `status:${status || 0}, trailingSlash:${trailingSlashOk}, hreflang fr:${hasFr}/en:${hasEn}/x-default:${hasDefault}${error ? `, error: ${error}` : ''}`;
    printResult(`Sitemap ${entry.loc}`, pass, details);
  }

  if (failed > 0) {
    console.error(`SEO verify failed with ${failed} issues`);
    process.exitCode = 1;
    return;
  }

  console.log('SEO verify passed');
}

main().catch((error) => {
  console.error('SEO verify failed with error:', error.message);
  process.exitCode = 1;
});
