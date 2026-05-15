<script lang="ts">
  import { onMount } from 'svelte';
  import { Globe } from 'lucide-svelte';
  import { Menu } from '@sentropic/design-system-svelte';
  import { language } from '@/i18n/config';
  import { location, navigate } from '@/lib/router';
  
  export let isScrolled = false;

  $: currentPath = $location.pathname || '/';
  $: currentLanguage = $language;
  $: labelTone = isScrolled ? 'hsl(var(--foreground))' : 'hsl(var(--primary-foreground))';
  $: menuTheme = `--st-component-menu-text: ${labelTone}; --st-component-menu-background: hsl(var(--popover)); --st-component-menu-border: hsl(var(--border));`;
  $: menuLabel = 'Language switcher menu';

  function isEnglishPath(pathname: string): boolean {
    return pathname === '/en' || pathname.startsWith('/en/');
  }

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

  const languageMenuItems = [
    { label: 'FR', value: 'fr' },
    { label: 'EN', value: 'en' },
  ];

  let isLanguageMenuOpen = false;
  let switcherRef: HTMLDivElement | null = null;

  function toggleLanguageMenu() {
    isLanguageMenuOpen = !isLanguageMenuOpen;
  }

  function selectLanguage(nextLanguage: string) {
    if (nextLanguage !== 'fr' && nextLanguage !== 'en') return;
    isLanguageMenuOpen = false;

    if (nextLanguage === currentLanguage) return;

    navigate(nextLanguage === 'en' ? toEnRoute(currentPath) : toFrRoute(currentPath));
  }

  onMount(() => {
    const closeMenu = (event: MouseEvent | KeyboardEvent) => {
      if (!isLanguageMenuOpen || !switcherRef) return;

      if (event instanceof KeyboardEvent && event.key === 'Escape') {
        isLanguageMenuOpen = false;
        return;
      }

      if (event instanceof MouseEvent) {
        const target = event.target as HTMLElement | null;
        if (!target || switcherRef.contains(target)) return;
        isLanguageMenuOpen = false;
      }
    };

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeMenu);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeMenu);
    };
  });
</script>

<div bind:this={switcherRef} class="relative">
  <button
    type="button"
    on:click={toggleLanguageMenu}
    class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-3 hover:text-accent hover:bg-transparent ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
  >
    <Globe class="h-4 w-4" />
    <span class="font-medium">{currentLanguage === 'fr' ? 'EN' : 'FR'}</span>
  </button>
  {#if isLanguageMenuOpen}
    <Menu
      class="absolute right-0 top-full z-50 mt-2 min-w-24"
      label={menuLabel}
      items={languageMenuItems}
      style={menuTheme}
      onselect={selectLanguage}
    />
  {/if}
</div>
