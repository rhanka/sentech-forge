<script lang="ts">
  import heroImage from '@/assets/hero-tech.jpg';
  import { Card, LoadingState } from '@sent-tech/components-svelte';
  import Icon from '@/components/Icon.svelte';
  import { language } from '@/i18n/config';
  import { loadHeroContent, type Locale } from '@/lib/content';
  import { location, navigate } from '@/lib/router';
  import type { MarkdownContent, ParsedMarkdownSection } from '@/lib/markdownLoader';

  let main: MarkdownContent | null = null;
  let quicklinks: ParsedMarkdownSection[] = [];
  let loading = true;
  let loadedLanguage: Locale | null = null;

  $: currentPathname = $location.pathname || '/';
  $: currentSearch = $location.search || '';

  $: currentLanguage = ($language === 'en' ? 'en' : 'fr') as Locale;

  $: if (currentLanguage !== loadedLanguage) {
    loadedLanguage = currentLanguage;
    void load(currentLanguage);
  }

  async function load(locale: Locale) {
    loading = true;
    try {
      const content = await loadHeroContent(locale);
      main = content.main;
      quicklinks = content.quicklinks;
    } catch (error) {
      console.error('Error loading hero content:', error);
      main = null;
      quicklinks = [];
    } finally {
      loading = false;
    }
  }

  function scrollToSection(targetId: string) {
    navigate(`${currentPathname}${currentSearch}#${targetId}`);
  }

  function getIconName(rawIcon: string | undefined): string {
    if (!rawIcon) return 'circle';
    return rawIcon;
  }

  function getCardTitle(content: string): string {
    const firstLine = content.split('\n')[0] ?? '';
    return firstLine.replace('# ', '');
  }

  function getCardItems(content: string): string[] {
    return content
      .split('\n')
      .filter((line) => line.startsWith('- '))
      .map((line) => line.substring(2));
  }
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
  <div
    class="absolute inset-0 z-0"
    style={`background-image: url(${heroImage}); background-size: cover; background-position: center;`}
  >
    <div class="absolute inset-0 bg-gradient-hero opacity-90"></div>
  </div>

  <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {#if loading || !main}
      <div class="text-center text-primary-foreground flex justify-center">
        <LoadingState
          label={currentLanguage === 'en' ? 'Loading...' : 'Chargement...'}
          style="
            --st-component-loadingState-text: hsl(var(--primary-foreground));
            --st-component-loadingState-indicator: hsl(var(--accent));
          "
        />
      </div>
    {:else}
      <div class="max-w-4xl mx-auto text-center text-primary-foreground mb-12">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{main.metadata.title}</h1>
        <p class="text-lg sm:text-xl mb-8 text-primary-foreground/90">
          {main.metadata.subtitle}
        </p>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {#each quicklinks as link}
          <Card
            interactive
            role="button"
            tabindex="0"
            data-qa="hero-quicklink"
            aria-label={getCardTitle(link.content)}
            class="!p-0 border bg-card text-card-foreground shadow-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/95 backdrop-blur text-left"
            style="
              --st-component-card-background: hsl(var(--card) / 0.95);
              --st-component-card-border: hsl(var(--border) / 0.5);
            "
            onclick={() => scrollToSection(String(link.metadata.targetId))}
            onkeydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                scrollToSection(String(link.metadata.targetId));
              }
            }}
          >
            <div class="flex flex-col space-y-1.5 p-6 pb-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center mb-3">
                <Icon name={getIconName(link.metadata?.icon as string | undefined)} className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 class="text-lg font-semibold tracking-tight">{getCardTitle(link.content)}</h3>
            </div>
            <div class="p-6 pt-0">
              <ul class="space-y-1.5">
                {#each getCardItems(link.content) as item}
                  <li class="text-xs text-muted-foreground flex items-start">
                    <span class="mr-1.5 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </Card>
        {/each}
      </div>
    {/if}
  </div>

  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground/60">
    <div class="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
      <div class="w-1 h-3 bg-primary-foreground/40 rounded-full"></div>
    </div>
  </div>
</section>
