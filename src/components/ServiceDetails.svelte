<script lang="ts">
  import { onDestroy } from 'svelte';
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { navigate } from '@/lib/router';
  import { loadBusinessCases, type BusinessCase, type Locale } from '@/lib/content';

  export let isOpen = false;
  export let onClose: (() => void) | undefined = undefined;
  export let serviceType: 'strategy' | 'governance' | 'development' | 'optimization';
  export let category: 'Strategy' | 'Architecture' | 'Innovation' | 'Operations';

  let items: BusinessCase[] = [];
  let loading = true;
  let loadedKey = '';
  let scrollTimer: ReturnType<typeof setTimeout> | undefined;

  $: currentLanguage = ($language === 'en' ? 'en' : 'fr') as Locale;
  $: loadKey = `${currentLanguage}:${category}`;

  $: if (loadKey !== loadedKey) {
    loadedKey = loadKey;
    void load(currentLanguage, category);
  }

  $: if (isOpen && !loading) {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const section = document.getElementById(`${serviceType}-details`);
      if (section) {
        const offset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 300);
  }

  onDestroy(() => {
    clearTimeout(scrollTimer);
  });

  async function load(locale: Locale, selectedCategory: typeof category) {
    loading = true;
    try {
      items = await loadBusinessCases(locale, selectedCategory);
    } catch (error) {
      console.error('Error loading business cases:', error);
      items = [];
    } finally {
      loading = false;
    }
  }

  function scrollToServices() {
    onClose?.();
    navigate('#services');
  }

  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }

  const parseHost = (value: string) => {
    try {
      return new URL(value).hostname;
    } catch {
      return '';
    }
  };
</script>

{#if isOpen}
  <section id={`${serviceType}-details`} class="py-20 bg-muted/30">
    <div class="container">
      <div class="flex justify-between items-start mb-12">
        <div class="flex-1">
          <h2 class="text-3xl font-bold mb-2">{t(`${serviceType}.title`)}</h2>
          <p class="text-muted-foreground max-w-3xl">{t(`${serviceType}.subtitle`)}</p>
        </div>
        <button
          type="button"
          on:click={scrollToServices}
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground gap-2 ml-4"
        >
          <Icon name="arrow-left" className="w-4 h-4" />
          {t('common.backToServices')}
        </button>
      </div>

      {#if loading}
        <div class="text-center py-12">
          <p class="text-muted-foreground">{t('common.loading')}</p>
        </div>
      {:else if items.length === 0}
        <div class="text-center py-12">
          <p class="text-muted-foreground">Aucune expérience disponible</p>
        </div>
      {:else}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {#each items as item}
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow animate-fade-in">
              <div class="flex items-start gap-4 mb-4">
                <div class="p-3 rounded-lg bg-primary/10 text-primary">
                  <Icon name={item.icon} className="w-6 h-6" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">{item.title}</h3>
                  <p class="text-sm text-muted-foreground mb-3">{item.subtitle}</p>
                </div>
              </div>
              <p class="text-sm text-foreground/80 mb-3">{item.description}</p>

              {#if item.url}
                <div class="flex flex-wrap gap-2 mt-4">
                  {#each Array.isArray(item.url) ? item.url : [item.url] as link}
                    {@const host = parseHost(link)}
                    {#if host}
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {host}
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}

      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-2xl font-bold mb-4">{t(`${serviceType}.mandateFormat.title`)}</h3>
          <p class="text-muted-foreground mb-6">{t(`${serviceType}.mandateFormat.description`)}</p>
          <button
            type="button"
            on:click={scrollToContact}
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            {t(`${serviceType}.mandateFormat.cta`)}
          </button>
        </div>
      </div>
    </div>
  </section>
{/if}
