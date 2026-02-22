<script lang="ts">
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { loadAboutContent, type Locale } from '@/lib/content';
  import type { ParsedMarkdownSection } from '@/lib/markdownLoader';

  let sections: ParsedMarkdownSection[] = [];
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
      sections = await loadAboutContent(locale);
    } catch (error) {
      console.error('Error loading about content:', error);
      sections = [];
    } finally {
      loading = false;
    }
  }

  $: mainSection = sections.find((section) => section.id === 'about');
  $: bioSection = sections.find((section) => section.content.startsWith('# Bio'));
  $: statSections = sections.filter((section) => typeof section.metadata.order === 'number');
  $: backgroundSection = sections.find(
    (section) =>
      section.content.startsWith('# Background') ||
      section.content.startsWith('# Notable Background') ||
      section.content.startsWith('# Parcours notable'),
  );
  $: bioParagraphs = (bioSection?.content || '')
    .replace('# Bio\n\n', '')
    .split('\n\n')
    .filter((paragraph) => paragraph.trim());

  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

{#if loading}
  <section class="py-24 bg-secondary/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">Loading...</div>
    </div>
  </section>
{:else}
  <section class="py-24 bg-secondary/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl sm:text-5xl font-bold mb-4">{mainSection?.metadata.title}</h2>
          <p class="text-xl text-muted-foreground">{mainSection?.metadata.name}</p>
        </div>

        <div class="bg-card border border-border rounded-lg p-8 shadow-medium mb-8">
          <div class="prose prose-lg max-w-none text-foreground">
            {#each bioParagraphs as paragraph}
              <p class="text-lg leading-relaxed mb-6 last:mb-0">{paragraph}</p>
            {/each}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {#each [...statSections].sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0)) as stat}
            <div class="text-center p-6 bg-card border border-border rounded-lg">
              <div class="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <Icon name={String(stat.metadata.icon || 'circle')} className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 class="text-3xl font-bold text-primary mb-2">{stat.metadata.value}</h3>
              <p class="text-muted-foreground">{stat.metadata.label}</p>
            </div>
          {/each}
        </div>

        <div class="text-center">
          <p class="text-lg text-muted-foreground mb-6">
            {backgroundSection?.content.replace(/^# [^\n]+\n\n?/, '')}
          </p>
          <button
            type="button"
            on:click={scrollToContact}
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            <Icon name="mail" className="mr-2" />
            {t('about.contactCta', 'Contactez-moi')}
          </button>
        </div>
      </div>
    </div>
  </section>
{/if}
