import fs from 'node:fs/promises';
import path from 'node:path';

const checks = [];

function addCheck(name, pass, details = '') {
  checks.push({ name, pass, details });
}

async function readText(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

const root = process.cwd();
const themePath = path.join(root, 'src', 'lib', 'styles', 'sent-tech-forge-theme.css');
const upstreamThemePath = path.resolve(root, '..', 'sent-tech-design-system', 'packages', 'themes', 'css', 'forge.css');
const globalCssPath = path.join(root, 'src', 'index.css');
const indexHtmlPath = path.join(root, 'index.html');

const [themeCss, upstreamThemeCss, globalCss, indexHtml] = await Promise.all([
  readText(themePath),
  readText(upstreamThemePath),
  readText(globalCssPath),
  readText(indexHtmlPath),
]);

addCheck(
  'local Sent Tech Forge theme CSS exists',
  await fileExists(themePath),
  'src/lib/styles/sent-tech-forge-theme.css'
);

if (themeCss && upstreamThemeCss) {
  addCheck(
    'local theme CSS matches generated design-system theme',
    themeCss === upstreamThemeCss,
    '../sent-tech-design-system/packages/themes/css/forge.css'
  );
}

addCheck(
  'global CSS imports Sent Tech theme once',
  (globalCss?.match(/@import\s+["']\.\/lib\/styles\/sent-tech-forge-theme\.css["'];/g) || []).length === 1,
  'src/index.css'
);

addCheck(
  'document root scopes the Forge theme',
  Boolean(indexHtml?.includes('<html lang="fr" data-st-theme="forge">')),
  'index.html'
);

const bridgeTokens = [
  '--background: from var(--st-semantic-surface-default) h s l;',
  '--foreground: from var(--st-semantic-text-primary) h s l;',
  '--primary: from var(--st-semantic-action-primary) h s l;',
  '--accent: from var(--st-component-button-primaryBackground) h s l;',
  '--border: from var(--st-semantic-border-subtle) h s l;',
  '--ring: from var(--st-semantic-border-interactive) h s l;',
];

for (const token of bridgeTokens) {
  addCheck(`bridge maps ${token.split(':')[0]}`, Boolean(globalCss?.includes(token)), 'src/index.css');
}

let failed = 0;

for (const check of checks) {
  const status = check.pass ? 'OK  ' : 'FAIL';
  console.log(`${status} - ${check.name}${check.details ? ` (${check.details})` : ''}`);
  if (!check.pass) failed += 1;
}

if (failed > 0) {
  console.error(`Sent Tech theme verification failed with ${failed} issue${failed === 1 ? '' : 's'}`);
  process.exitCode = 1;
}
