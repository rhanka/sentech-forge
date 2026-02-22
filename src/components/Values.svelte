<script lang="ts">
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { loadValueContent, type Locale, type ValueItem } from '@/lib/content';

  let values: ValueItem[] = [];
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
      values = await loadValueContent(locale);
    } catch (error) {
      console.error('Error loading values content:', error);
      values = [];
    } finally {
      loading = false;
    }
  }
</script>

<section class="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">{t('values.title')}</h2>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">{t('values.subtitle')}</p>
    </div>

    {#if loading}
      <div class="text-center py-12">
        <p class="text-muted-foreground">{t('common.loading', 'Chargement...')}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each values as value}
          <div class="p-6 rounded-lg bg-card border border-border hover:border-accent transition-all duration-300 group">
            <div
              class="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors"
            >
              <Icon name={value.icon} className="w-6 h-6 text-accent" />
            </div>
            <h3 class="text-lg font-semibold mb-2">{value.title}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
