<script lang="ts">
  import { onMount } from 'svelte';
  import { Menu, X } from 'lucide-svelte';
  import { Button } from '@sentropic/design-system-svelte';
  import { t, language } from '@/i18n/config';
  import { location, navigate } from '@/lib/router';
  import LanguageSwitcher from './LanguageSwitcher.svelte';

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let currentPathname = '/';

  $: currentPathname = $location.pathname;
  $: navButtonTone = isScrolled ? 'hsl(var(--foreground))' : 'hsl(var(--primary-foreground))';
  $: $language;
  $: navLinks = [
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.sectors'), id: 'sectors' },
    { label: t('nav.values'), id: 'values' },
    { label: t('nav.blog'), id: 'blog' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function isEnglishRoute(pathname: string): boolean {
    return pathname === '/en' || pathname.startsWith('/en/');
  }

  function getHomePath(pathname: string): string {
    return isEnglishRoute(pathname) ? '/en/' : '/';
  }

  function scrollToSection(id: string) {
    navigate(`${getHomePath(currentPathname)}#${id}`);
    isMobileMenuOpen = false;
  }

  function handleLogoClick() {
    if (currentPathname === '/' || currentPathname === '/en' || currentPathname === '/en/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate(getHomePath(currentPathname));
  }
</script>

<nav
  class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-background/95 backdrop-blur-md shadow-medium' : 'bg-transparent'
  }`}
>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <button type="button" on:click={handleLogoClick} class="flex items-center h-12">
        <img
          src="/SENT-logo.png"
          alt="SENT-tech"
          class="h-8 md:h-10 w-auto transition-all duration-300"
          style={`filter: ${isScrolled ? 'none' : 'brightness(0) invert(1)'}`}
        />
      </button>

      <div class="hidden md:flex items-center gap-8">
        {#each navLinks as link}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onclick={() => scrollToSection(link.id)}
            style={`--st-semantic-text-link: ${navButtonTone};`}
            class={`!min-h-0 !h-auto !px-0 !py-0 font-medium transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'} hover:text-accent`}
          >
            {link.label}
          </Button>
        {/each}
        <LanguageSwitcher {isScrolled} />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="md"
        onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
        style={`--st-semantic-text-link: ${navButtonTone};`}
        class={`md:hidden !px-1 !py-1 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
      >
        {#if isMobileMenuOpen}
          <X class={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
        {:else}
          <Menu class={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
        {/if}
      </Button>
    </div>

    {#if isMobileMenuOpen}
      <div class="md:hidden pb-6 bg-background/95 backdrop-blur-md">
        {#each navLinks as link}
          <Button
            type="button"
            size="md"
            variant="ghost"
            onclick={() => scrollToSection(link.id)}
            style="--st-semantic-text-link: hsl(var(--foreground));"
            class="block !w-full !justify-start !rounded-none text-left !py-3 !px-4 text-foreground hover:bg-accent/10 transition-colors"
          >
            {link.label}
          </Button>
        {/each}
        <div class="px-4 pt-3">
          <LanguageSwitcher isScrolled={true} />
        </div>
      </div>
    {/if}
  </div>
</nav>
