<script lang="ts">
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { loadServiceContent, type Locale, type ServiceItem } from '@/lib/content';

  export let onStrategyClick: (() => void) | undefined = undefined;
  export let onGovernanceClick: (() => void) | undefined = undefined;
  export let onDevelopmentClick: (() => void) | undefined = undefined;
  export let onOptimizationClick: (() => void) | undefined = undefined;

  let services: ServiceItem[] = [];
  let loading = true;
  let loadedLanguage: Locale | null = null;

  $: currentLanguage = ($language === 'en' ? 'en' : 'fr') as Locale;
  $: $language;
  $: if (currentLanguage !== loadedLanguage) {
    loadedLanguage = currentLanguage;
    void load(currentLanguage);
  }

  async function load(locale: Locale) {
    loading = true;
    try {
      services = await loadServiceContent(locale);
    } catch (error) {
      console.error('Error loading services content:', error);
      services = [];
    } finally {
      loading = false;
    }
  }

  function handleServiceClick(service: ServiceItem) {
    if (service.clickable && service.scrollTo) {
      if (service.id === 'strategy') {
        onStrategyClick?.();
      } else if (service.id === 'governance') {
        onGovernanceClick?.();
      } else if (service.id === 'development') {
        onDevelopmentClick?.();
      } else if (service.id === 'optimization') {
        onOptimizationClick?.();
      }

      window.setTimeout(() => {
        const section = document.getElementById(service.scrollTo as string);
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
</script>

<section class="py-24 bg-secondary/30">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">{t('services.title')}</h2>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">{t('services.subtitle')}</p>
    </div>

    {#if loading}
      <div class="text-center py-12">
        <p class="text-muted-foreground">{t('common.loading', 'Chargement...')}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each services as service}
          {#if service.clickable}
            <div
              role="button"
              tabindex="0"
              class="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border cursor-pointer"
              on:click={() => handleServiceClick(service)}
              on:keydown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleServiceClick(service);
                }
              }}
            >
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Icon name={service.icon} className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 class="text-2xl font-semibold tracking-tight">{service.title}</h3>
              </div>
              <div class="p-6 pt-0">
                <p class="text-base leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </div>
          {:else}
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border">
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Icon name={service.icon} className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 class="text-2xl font-semibold tracking-tight">{service.title}</h3>
              </div>
              <div class="p-6 pt-0">
                <p class="text-base leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</section>
