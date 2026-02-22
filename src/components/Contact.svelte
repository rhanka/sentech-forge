<script lang="ts">
  import Icon from '@/components/Icon.svelte';
  import { language } from '@/i18n/config';
  import { loadContactContent, type Locale } from '@/lib/content';
  import type { ParsedMarkdownSection } from '@/lib/markdownLoader';

  let sections: ParsedMarkdownSection[] = [];
  let loading = true;
  let loadedLanguage: Locale | null = null;

  $: currentLanguage = ($language === 'en' ? 'en' : 'fr') as Locale;
  $: if (currentLanguage !== loadedLanguage) {
    loadedLanguage = currentLanguage;
    void load(currentLanguage);
  }

  async function load(locale: Locale) {
    loading = true;
    try {
      sections = await loadContactContent(locale);
    } catch (error) {
      console.error('Error loading contact content:', error);
      sections = [];
    } finally {
      loading = false;
    }
  }

  $: mainSection = sections.find((section) => section.id === 'contact');
  $: cardSections = sections.filter((section) => ['email', 'phone'].includes(section.id));
  $: socialSections = sections.filter((section) => ['send', 'linkedin', 'github'].includes(section.id));
</script>

{#if loading}
  <section class="py-24 bg-gradient-primary text-primary-foreground">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">Loading...</div>
    </div>
  </section>
{:else}
  <section class="py-24 bg-gradient-primary text-primary-foreground">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6">{mainSection?.metadata.title}</h2>
        <p class="text-xl mb-12 text-primary-foreground/90">{mainSection?.metadata.subtitle}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {#each [...cardSections].sort((a, b) => a.metadata.order - b.metadata.order) as card}
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur">
              <div class="p-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Icon name={String(card.metadata.icon)} className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div class="text-left">
                    <p class="text-sm text-primary-foreground/80 mb-1">{card.metadata.label}</p>
                    {#if card.id === 'email'}
                      <a href={String(card.metadata.link)} class="text-lg font-semibold text-primary-foreground hover:text-accent transition-colors">
                        {card.metadata.value}
                      </a>
                    {:else}
                      <div class="text-lg font-semibold text-primary-foreground">
                        <div>{card.metadata.value}</div>
                        {#if card.metadata.valueSecondary}
                          <div class="text-base">{card.metadata.valueSecondary}</div>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <div class="flex items-center gap-2">
            <Icon name="map-pin" className="w-5 h-5" />
            <span>{mainSection?.metadata.location}</span>
          </div>
        </div>

        <div class="flex gap-4 justify-center flex-wrap">
          {#each [...socialSections].sort((a, b) => a.metadata.order - b.metadata.order) as social}
            <a
              href={String(social.metadata.link)}
              target={social.id !== 'send' ? '_blank' : undefined}
              rel={social.id !== 'send' ? 'noopener noreferrer' : undefined}
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground bg-primary-foreground/10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/60"
            >
              <Icon name={String(social.metadata.icon)} className="mr-2 w-5 h-5" />
              {social.metadata.label}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>
{/if}
