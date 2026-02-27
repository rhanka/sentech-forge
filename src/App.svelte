<script lang="ts">
  import { location } from '@/lib/router';
  import Index from '@/pages/Index.svelte';
  import NotFound from '@/pages/NotFound.svelte';
  import BlogPost from '@/pages/BlogPost.svelte';
  import { normalizeLanguage, syncLanguageFromPath, type AppLanguage } from '@/i18n/config';
  import { applySeo } from '@/lib/seo';
  import { navigate } from '@/lib/router';
  
  function isEnglishPath(pathname: string): boolean {
    return pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/');
  }

  function isFrenchPath(pathname: string): boolean {
    return pathname === '/fr' || pathname === '/fr/' || pathname.startsWith('/fr/');
  }

  function redirectFromFrenchPrefix(pathname: string, search: string, hash: string) {
    if (!isFrenchPath(pathname)) return;

    const nextPath = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
    const nextLocation = `${nextPath}${search}${hash}`;
    const currentLocation = `${pathname}${search}${hash}`;

    if (nextLocation !== currentLocation) {
      navigate(nextLocation, true);
    }
  }

  function convertPathToLanguage(pathname: string, languageRoute: 'fr' | 'en'): string {
    const normalizedPath = pathname || '/';

    if (languageRoute === 'en') {
      if (isEnglishPath(normalizedPath)) return normalizedPath;
      if (normalizedPath === '/' || normalizedPath === '') return '/en/';
      if (isFrenchPath(normalizedPath)) {
        if (normalizedPath === '/fr' || normalizedPath === '/fr/') return '/en/';
        return normalizedPath.replace(/^\/fr(?=\/|$)/, '/en');
      }

      return `/en${normalizedPath}`;
    }

    if (isFrenchPath(normalizedPath)) return normalizedPath;
    if (isEnglishPath(normalizedPath)) {
      const withoutEnglish = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/';
      return withoutEnglish === '' ? '/' : withoutEnglish;
    }

    return normalizedPath;
  }

  function redirectFromLanguageQuery(pathname: string, search: string, hash: string) {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(search);
    let requestedLang: AppLanguage | null = null;
    const queryKeysToDelete: string[] = [];

    for (const [key, value] of params.entries()) {
      const normalizedKey = key.trim().toLowerCase();
      if (normalizedKey !== 'lang' && normalizedKey !== 'locale') continue;

      queryKeysToDelete.push(key);
      requestedLang = requestedLang || normalizeLanguage(value);
    }

    if (!requestedLang) return;

    queryKeysToDelete.forEach((key) => params.delete(key));
    const nextSearch = params.toString();
    const query = nextSearch ? `?${nextSearch}` : '';
    const nextPath = convertPathToLanguage(pathname, requestedLang);
    const nextLocation = `${nextPath}${query}${hash}`;
    const currentLocation = `${pathname}${search}${hash}`;

    if (nextLocation !== currentLocation) {
      navigate(nextLocation, true);
    }
  }

  let pathname = '/';
  let slug: string | null = null;

  let rawPathname = '/';
  let rawSearch = '';
  let rawHash = '';

  $: rawPathname = $location.pathname || '/';
  $: rawSearch = $location.search || '';
  $: rawHash = $location.hash || '';
  $: void syncLanguageFromPath(rawPathname);
  $: if (typeof window !== 'undefined') {
    redirectFromFrenchPrefix(rawPathname, rawSearch, rawHash);
    redirectFromLanguageQuery(rawPathname, rawSearch, rawHash);
  }

  $: {
    const normalizedPathname =
      rawPathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/fr(?=\/|$)/, '') || '/';
    pathname = normalizedPathname === '' ? '/' : normalizedPathname;
    pathname = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

    const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
    slug = blogMatch ? decodeURIComponent(blogMatch[1]) : null;

  }

  $: {
    const routeLocale: 'fr' | 'en' = isEnglishPath(rawPathname) ? 'en' : 'fr';

    const isBlogPage = slug !== null;
    const baseTitle = isBlogPage
      ? `SENT-tech | Blog ${slug ? `- ${slug}` : ''}`
      : `SENT-tech | ${routeLocale === 'en' ? 'Expert IT, Data & IA' : 'Expert IT, Data & IA'}`;
    const description =
      routeLocale === 'en'
        ? 'Expert IT, data and AI consulting: practical strategy, architecture, software development and innovation for ambitious teams.'
        : 'Conseil IT, données et IA: stratégie, architecture, développement, gouvernance et innovation pour entreprises ambitieuses.';

    applySeo({
      path: routeLocale === 'en' ? `/en${pathname}` : pathname,
      locale: routeLocale,
      title: baseTitle,
      description,
      type: isBlogPage ? 'article' : 'website',
      noIndex: false,
    });
  }
</script>

{#if pathname === '/' || pathname === '/blog'}
  <Index />
{:else if slug}
  <BlogPost {slug} />
{:else}
  <NotFound />
{/if}
