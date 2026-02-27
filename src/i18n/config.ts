import i18n from 'i18next';
import { writable } from 'svelte/store';
import fr from './locales/fr.json';
import en from './locales/en.json';

export type AppLanguage = 'fr' | 'en';

function normalizeLanguage(value: string | null): AppLanguage | null {
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

function detectLanguageFromPath(pathname: string): AppLanguage | null {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    return 'fr';
  }

  return null;
}

function detectLanguageFromQuery(search: string): AppLanguage | null {
  const params = new URLSearchParams(search);
  return normalizeLanguage(params.get('lang')) || normalizeLanguage(params.get('locale'));
}

const getSavedLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') return 'fr';

  const queryLanguage = detectLanguageFromQuery(window.location.search);
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
  const validLanguage = normalizeLanguage(nextLanguage) || 'fr';
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
  const queryLanguage = detectLanguageFromQuery(window.location.search);
  const detectedLanguage: AppLanguage = queryLanguage || detectLanguageFromPath(targetPath) || 'fr';

  if (i18n.language !== detectedLanguage) {
    await setLanguage(detectedLanguage);
    return;
  }

  language.set(detectedLanguage);
  document.documentElement.lang = detectedLanguage;
}

export async function toggleLanguage() {
  const currentLanguage = normalizeLanguage(i18n.language) || 'fr';
  const nextLanguage: AppLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
  await setLanguage(nextLanguage);
}

export default i18n;
