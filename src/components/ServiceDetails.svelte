<script lang="ts">
  import { Button, Card, EmptyState, Link as SentLink, LoadingState } from '@sent-tech/components-svelte';
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
  $: emptyTitle = currentLanguage === 'en' ? 'No experience available' : 'Aucune expérience disponible';
  $: emptyMessage =
    currentLanguage === 'en'
      ? 'This category will be enriched with new use cases.'
      : "Cette catégorie sera enrichie avec de nouveaux cas d'usage.";

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
        <Button type="button" variant="secondary" class="ml-4" onclick={scrollToServices}>
          <Icon name="arrow-left" className="w-4 h-4" />
          {t('common.backToServices')}
        </Button>
      </div>

      {#if loading}
        <div class="flex justify-center py-12">
          <LoadingState label={t('common.loading')} />
        </div>
      {:else if items.length === 0}
        <EmptyState title={emptyTitle} message={emptyMessage} />
      {:else}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {#each items as item}
            <Card interactive class="p-6 animate-fade-in">
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
                      <SentLink
                        href={link}
                        external
                        variant="standalone"
                        class="text-xs text-primary inline-flex items-center gap-1"
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
                      </SentLink>
                    {/if}
                  {/each}
                </div>
              {/if}
            </Card>
          {/each}
        </div>
      {/if}

      <Card class="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-2xl font-bold mb-4">{t(`${serviceType}.mandateFormat.title`)}</h3>
          <p class="text-muted-foreground mb-6">{t(`${serviceType}.mandateFormat.description`)}</p>
          <Button type="button" size="lg" onclick={scrollToContact}>
            {t(`${serviceType}.mandateFormat.cta`)}
          </Button>
        </div>
      </Card>
    </div>
  </section>
{/if}
