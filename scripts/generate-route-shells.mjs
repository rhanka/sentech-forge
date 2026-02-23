import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const templatePath = path.join(distRoot, 'index.html');

const sourceLocalePaths = [
  { locale: 'fr', dir: path.join(projectRoot, 'src', 'content', 'blog', 'fr') },
  { locale: 'en', dir: path.join(projectRoot, 'src', 'content', 'blog', 'en') },
];

function toRoutePath(slug) {
  return `/blog/${slug}`;
}

function normalizeRoute(route) {
  if (!route || route === '/') return '/';
  return route.replace(/\/+$/, '');
}

function routeToOutputFile(route) {
  if (route === '/') return path.join(distRoot, 'index.html');

  const trimmed = route.replace(/^\//, '');
  return path.join(distRoot, ...trimmed.split('/'), 'index.html');
}

async function collectSlugs(contentDir) {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name.replace(/\.md$/, ''));
}

async function writeRouteShell(route, templateContent) {
  const normalized = normalizeRoute(route);
  const outputPath = routeToOutputFile(normalized);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, templateContent, 'utf8');
}

async function main() {
  const template = await fs.readFile(templatePath, 'utf8');

  const routes = new Set(['/','/blog','/en/blog']);
  routes.add('/en/');

  for (const { dir, locale } of sourceLocalePaths) {
    const slugs = await collectSlugs(dir);
    for (const slug of slugs) {
      routes.add(toRoutePath(slug));
      if (locale === 'en') {
        routes.add(`/en${toRoutePath(slug)}`);
      }
    }
  }

  await Promise.all(Array.from(routes).map((route) => writeRouteShell(route, template)));
}

main().catch((error) => {
  console.error('Error while generating static route shells:', error);
  process.exitCode = 1;
});
