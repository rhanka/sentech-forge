import { type AppLanguage } from '@/i18n/config';

const SITE_ORIGIN = 'https://www.sent-tech.ca';
const DEFAULT_DESCRIPTION_FR =
  'Services de conseil en IT, data et IA: stratégie numérique, architecture technique, développement, gouvernance et transformation digitale.';
const DEFAULT_DESCRIPTION_EN =
  'IT, data and AI consulting: digital strategy, architecture, development, governance, and digital transformation.';
const DEFAULT_IMAGE = 'https://www.sent-tech.ca/SENT-logo.svg';

const BASE_TITLE = 'SENT-tech | Expert IT, Data & IA';

export interface SeoPayload {
  path: string;
  locale: AppLanguage;
  title?: string;
  description?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  image?: string;
}

function ensureLeadingSlash(value: string): string {
  if (!value) {
    return '/';
  }

  if (value.startsWith('http')) {
    return value;
  }

  if (!value.startsWith('/')) {
    return `/${value}`;
  }

  return value;
}

function ensureTrailingSlash(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  const normalized = ensureLeadingSlash(path).replace(/\/+$/g, '');
  return `${normalized}/`;
}

function toAbsoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${ensureTrailingSlash(path)}`;
}

function toCanonicalPath(path: string, locale: AppLanguage): string {
  const normalized = ensureLeadingSlash(path).replace(/\/+$/g, '');

  if (locale === 'en' && !normalized.startsWith('/en')) {
    if (normalized === '' || normalized === '/') {
      return '/en/';
    }

    return ensureTrailingSlash(`/en${normalized}`);
  }

  if (locale === 'fr' && (normalized === '/en' || normalized.startsWith('/en/'))) {
    return ensureTrailingSlash(normalized.replace(/^\/en(?=\/|$)/, '') || '/');
  }

  return ensureTrailingSlash(normalized || '/');
}

export function getCanonicalUrl(path: string, locale: AppLanguage): string {
  return toAbsoluteUrl(toCanonicalPath(path, locale));
}

export function getLocaleAlternateUrls(path: string, locale: AppLanguage): Record<string, string> {
  const canonicalPath = ensureTrailingSlash(ensureLeadingSlash(path));
  const frenchPath = locale === 'fr' ? canonicalPath : canonicalPath.replace(/^\/en(?=\/|$)/, '');

  const englishPath =
    locale === 'en'
      ? canonicalPath
      : canonicalPath === '/'
        ? '/en/'
        : ensureTrailingSlash(`/en${canonicalPath}`);

  const canonicalizedFrenchPath = frenchPath === '' ? '/' : frenchPath;
  const canonicalizedEnglishPath = englishPath === '' ? '/en/' : englishPath;

  return {
    fr: getCanonicalUrl(canonicalizedFrenchPath, 'fr'),
    en: getCanonicalUrl(canonicalizedEnglishPath, 'en'),
    'x-default': getCanonicalUrl(canonicalizedFrenchPath, 'fr'),
  };
}

function setMetaName(content: string, value: string) {
  if (typeof document === 'undefined') return;

  const key = value ? value : '';
  const selector = `meta[name="${content}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const target = existing ?? document.createElement('meta');

  if (!existing) {
    target.setAttribute('name', content);
    document.head.appendChild(target);
  }

  target.setAttribute('content', key);
}

function setMetaProperty(content: string, value: string) {
  if (typeof document === 'undefined') return;

  const selector = `meta[property="${content}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const target = existing ?? document.createElement('meta');

  if (!existing) {
    target.setAttribute('property', content);
    document.head.appendChild(target);
  }

  target.setAttribute('content', value);
}

function setCanonical(href: string) {
  if (typeof document === 'undefined') return;

  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (existing) {
    existing.setAttribute('href', href);
    return;
  }

  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = href;
  document.head.appendChild(canonical);
}

function setAlternateLinks(alternates: Record<string, string>) {
  if (typeof document === 'undefined') return;

  document
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
    .forEach((link) => link.remove());

  Object.entries(alternates).forEach(([key, href]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.setAttribute('hreflang', key);
    link.href = href;
    document.head.appendChild(link);
  });
}

function setRobots(noIndex: boolean) {
  setMetaName('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
}

function getDefaultDescription(locale: AppLanguage): string {
  return locale === 'en' ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION_FR;
}

function cleanTextForSeo(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, (match) => match.replace(/\[([^\]]+)\]\([^)]*\)/, '$1'))
    .replace(/[#>*_`~\-]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*\n+\s*/g, ' ')
    .trim();
}

export function createArticleSummary(markdown: string): string {
  const cleaned = cleanTextForSeo(markdown);
  return cleaned.length > 220 ? `${cleaned.slice(0, 217)}...` : cleaned;
}

export function applySeo(payload: SeoPayload) {
  if (typeof document === 'undefined') return;

  const canonicalPath = toCanonicalPath(payload.path, payload.locale);
  const canonical = toAbsoluteUrl(canonicalPath);

  const title = payload.title || BASE_TITLE;
  const description = payload.description || getDefaultDescription(payload.locale);
  const image = payload.image || DEFAULT_IMAGE;

  document.title = title;
  setMetaName('title', title);
  setMetaName('description', description);
  setCanonical(canonical);
  setRobots(Boolean(payload.noIndex));

  const alternates = getLocaleAlternateUrls(canonicalPath, payload.locale);
  setAlternateLinks(alternates);

  setMetaName('language', payload.locale === 'en' ? 'English' : 'French');
  document.documentElement.lang = payload.locale;

  setMetaProperty('og:type', payload.type || 'website');
  setMetaProperty('og:url', canonical);
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:image', image);
  setMetaProperty('og:site_name', 'SENT-tech');
  setMetaProperty('og:locale', payload.locale === 'en' ? 'en_CA' : 'fr_CA');
  setMetaProperty('og:locale:alternate', payload.locale === 'en' ? 'fr_CA' : 'en_CA');

  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:url', canonical);
  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);
  setMetaName('twitter:image', image);
}
