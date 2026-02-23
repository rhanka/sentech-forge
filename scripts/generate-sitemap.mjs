import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const canonicalHost = 'https://www.sent-tech.ca';

const sourceLocalePaths = [
  { locale: 'fr', dir: path.join(projectRoot, 'src', 'content', 'blog', 'fr'), routePrefix: '/blog' },
  { locale: 'en', dir: path.join(projectRoot, 'src', 'content', 'blog', 'en'), routePrefix: '/en/blog' },
];

const publicSitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const distSitemapPath = path.join(projectRoot, 'dist', 'sitemap.xml');

const fallbackBuildDate = new Date().toISOString().slice(0, 10);

function toAbsoluteUrl(route) {
  return `${canonicalHost}${route}`;
}

function parseFrontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { metadata: {} };
  }

  const metadata = {};
  const frontmatter = match[1];

  frontmatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex < 0) return;

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();
    if (!key) return;

    let normalizedValue = value;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      normalizedValue = value.slice(1, -1);
    }

    metadata[key] = normalizedValue;
  });

  return { metadata };
}

function getDateValue(metadataDate) {
  if (!metadataDate) return fallbackBuildDate;

  const parsed = Date.parse(metadataDate);
  return Number.isNaN(parsed) ? fallbackBuildDate : new Date(parsed).toISOString().slice(0, 10);
}

function getLocalePair(route) {
  if (route === '/en/' || route.startsWith('/en/')) {
    return {
      fr: route === '/en/' ? '/' : route.replace(/^\/en/, ''),
      en: route,
    };
  }

  return {
    fr: route,
    en: route === '/' ? '/en/' : `/en${route}`,
  };
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatUrlSet(entries) {
  const available = new Set(entries.map((entry) => entry.path));
  const pathEntries = [...entries].sort((a, b) => a.path.localeCompare(b.path));

  const body = pathEntries
    .map((entry) => {
      const localePair = getLocalePair(entry.path);
      const alternates = [];

      if (available.has(localePair.fr)) {
        alternates.push(`<xhtml:link rel="alternate" hreflang="fr" href="${toAbsoluteUrl(localePair.fr)}" />`);
      }
      if (available.has(localePair.en)) {
        alternates.push(`<xhtml:link rel="alternate" hreflang="en" href="${toAbsoluteUrl(localePair.en)}" />`);
      }

      const xDefault = available.has(localePair.fr) ? localePair.fr : entry.path;
      alternates.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${toAbsoluteUrl(xDefault)}" />`);

    return `  <url>\n    <loc>${xmlEscape(toAbsoluteUrl(entry.path))}</loc>\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>\n    <changefreq>${xmlEscape(entry.changefreq)}</changefreq>\n    <priority>${xmlEscape(entry.priority)}</priority>\n    ${alternates.join('\n    ')}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>`;
}

async function collectEntries() {
  const entries = [
    { path: '/', lastmod: fallbackBuildDate, changefreq: 'weekly', priority: '1.0' },
    { path: '/en/', lastmod: fallbackBuildDate, changefreq: 'weekly', priority: '1.0' },
    { path: '/blog', lastmod: fallbackBuildDate, changefreq: 'monthly', priority: '0.9' },
    { path: '/en/blog', lastmod: fallbackBuildDate, changefreq: 'monthly', priority: '0.9' },
  ];

  for (const item of sourceLocalePaths) {
    const files = await fs.readdir(item.dir, { withFileTypes: true });

    const slugs = files
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name.replace(/\.md$/, ''));

    for (const slug of slugs) {
      const filePath = path.join(item.dir, `${slug}.md`);
      const raw = await fs.readFile(filePath, 'utf8');
      const { metadata } = parseFrontmatter(raw);

      const route = `${item.routePrefix}/${slug}`;
      entries.push({
        path: route,
        lastmod: getDateValue(metadata.date),
        changefreq: 'monthly',
        priority: '0.8',
      });
    }
  }

  return entries;
}

async function main() {
  const entries = await collectEntries();
  const xml = formatUrlSet(entries);

  await fs.mkdir(path.dirname(distSitemapPath), { recursive: true });
  await fs.writeFile(publicSitemapPath, xml, 'utf8');
  await fs.writeFile(distSitemapPath, xml, 'utf8');
}

main().catch((error) => {
  console.error('Error while generating sitemap:', error);
  process.exitCode = 1;
});
