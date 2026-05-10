<script lang="ts">
  import { Card, LoadingState } from '@sent-tech/components-svelte';
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { loadSectorContent, type Locale, type SectorItem } from '@/lib/content';

  let sectors: SectorItem[] = [];
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
      sectors = await loadSectorContent(locale);
    } catch (error) {
      console.error('Error loading sectors content:', error);
      sectors = [];
    } finally {
      loading = false;
    }
  }
</script>

<section class="py-24">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">{t('sectors.title')}</h2>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">{t('sectors.subtitle')}</p>
    </div>

    {#if loading}
      <div class="flex justify-center py-12">
        <LoadingState label={t('common.loading', 'Chargement...')} />
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {#each sectors as sector}
          <Card class="text-center !p-6 transition-all duration-300 hover:!shadow-medium">
            <div class="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
              <Icon name={sector.icon} className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 class="text-xl font-semibold mb-2">{sector.title}</h3>
            <p class="text-muted-foreground">{sector.description}</p>
          </Card>
        {/each}
      </div>
    {/if}
  </div>
</section>
