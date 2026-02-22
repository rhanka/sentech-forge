<script lang="ts">
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { loadEngagementContent, type EngagementItem, type Locale } from '@/lib/content';

  let engagements: EngagementItem[] = [];
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
      engagements = await loadEngagementContent(locale);
    } catch (error) {
      console.error('Error loading engagement content:', error);
      engagements = [];
    } finally {
      loading = false;
    }
  }
</script>

<section class="py-24">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">{t('engagement.title')}</h2>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">{t('engagement.subtitle')}</p>
    </div>

    {#if loading}
      <div class="text-center py-12">
        <p class="text-muted-foreground">{t('common.loading', 'Chargement...')}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {#each engagements as engagement}
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border">
            <div class="flex flex-col space-y-1.5 p-6 text-center">
              <div class="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name={engagement.icon} className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 class="text-2xl font-semibold tracking-tight">{engagement.title}</h3>
              <p class="text-base text-sm text-muted-foreground">{engagement.description}</p>
            </div>

            <div class="p-6 pt-0">
              <p class="text-sm font-semibold text-muted-foreground mb-3">{t('engagement.fulltime.ideal')}</p>
              <ul class="space-y-3">
                {#each engagement.features || [] as feature}
                  <li class="flex items-start gap-2">
                    <Icon name="check-circle-2" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span class="text-foreground">{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
