<script lang="ts">
  import { Globe } from 'lucide-svelte';
  import { language } from '@/i18n/config';
  import { location, navigate } from '@/lib/router';
  
  export let isScrolled = false;

  $: currentPath = $location.pathname || '/';

  $: currentLanguage = $language;

  function toEnRoute(pathname: string): string {
    if (pathname === '/' || pathname === '') return '/en/';
    if (pathname === '/en' || pathname.startsWith('/en/')) return pathname;
    if (pathname === '/fr' || pathname === '/fr/') return '/en/';
    if (pathname.startsWith('/fr/')) return pathname.replace(/^\/fr(?=\/|$)/, '/en');
    return `/en${pathname}`;
  }

  function toFrRoute(pathname: string): string {
    if (!pathname || pathname === '/en' || pathname === '/en/') return '/';
    if (pathname === '/fr' || pathname.startsWith('/fr/')) return pathname;
    if (pathname.startsWith('/en/')) return pathname.replace(/^\/en(?=\/|$)/, '');
    return pathname;
  }

  function getTargetPath(): string {
    if (currentLanguage === 'fr') {
      return toEnRoute(currentPath);
    }

    return toFrRoute(currentPath);
  }

  function toggleLanguageRoute() {
    navigate(getTargetPath());
  }
</script>

<button
  type="button"
  on:click={toggleLanguageRoute}
  class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-3 hover:text-accent hover:bg-transparent ${
    isScrolled ? 'text-foreground' : 'text-primary-foreground'
  }`}
>
  <Globe class="h-4 w-4" />
  <span class="font-medium">{currentLanguage === 'fr' ? 'EN' : 'FR'}</span>
</button>
