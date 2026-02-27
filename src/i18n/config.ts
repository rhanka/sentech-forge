import i18n from 'i18next';
import { writable } from 'svelte/store';
import fr from './locales/fr.json';
import en from './locales/en.json';

export type AppLanguage = 'fr' | 'en';

export function normalizeLanguage(value: string | null): AppLanguage | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;

  if (normalized === 'fr' || normalized.startsWith('fr-') || normalized.startsWith('fr_')) {
    return 'fr';
  }

  if (normalized === 'en' || normalized.startsWith('en-') || normalized.startsWith('en_')) {
    return 'en';
  }

  return null;
}

function getLanguageFromQueryParams(params: URLSearchParams): AppLanguage | null {
  for (const [key, value] of params.entries()) {
    const normalizedKey = key.trim().toLowerCase();
    if (normalizedKey !== 'lang' && normalizedKey !== 'locale') continue;

    const normalizedValue = normalizeLanguage(value);
    if (normalizedValue) return normalizedValue;
  }

  return null;
}

function detectLanguageFromPath(pathname: string): AppLanguage | null {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    return 'fr';
  }

  return null;
}

const getSavedLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') return 'fr';

  const queryLanguage = getLanguageFromQueryParams(new URLSearchParams(window.location.search));
  if (queryLanguage) return queryLanguage;

  const pathLanguage = detectLanguageFromPath(window.location.pathname);
  if (pathLanguage) return pathLanguage;

  const savedLanguage = localStorage.getItem('language');
  return normalizeLanguage(savedLanguage) || 'fr';
};

const initialLanguage = getSavedLanguage();

i18n.init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export const language = writable<AppLanguage>((i18n.language as AppLanguage) || initialLanguage);

if (typeof document !== 'undefined') {
  document.documentElement.lang = (i18n.language as AppLanguage) || initialLanguage;
}

i18n.on('languageChanged', (nextLanguage) => {
  const validLanguage = nextLanguage === 'en' ? 'en' : 'fr';
  language.set(validLanguage);
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', validLanguage);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = validLanguage;
  }
});

export function t(key: string, fallback?: string): string {
  const translated = i18n.t(key);
  if (translated === key && fallback !== undefined) {
    return fallback;
  }
  return translated;
}

export async function setLanguage(nextLanguage: AppLanguage) {
  await i18n.changeLanguage(nextLanguage);
}

export async function syncLanguageFromPath(pathname?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const targetPath = pathname || window.location.pathname;
  // French is the default route when no `/en` prefix is present.
  const detectedLanguage: AppLanguage = detectLanguageFromPath(targetPath) || 'fr';

  if (i18n.language !== detectedLanguage) {
    await setLanguage(detectedLanguage);
    return;
  }

  language.set(detectedLanguage);
  document.documentElement.lang = detectedLanguage;
}

export async function toggleLanguage() {
  const nextLanguage: AppLanguage = i18n.language === 'fr' ? 'en' : 'fr';
  await setLanguage(nextLanguage);
}

export default i18n;
