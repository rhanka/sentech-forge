<script lang="ts">
  import { Badge, Card, EmptyState, Link as SentLink, LoadingState } from '@sent-tech/components-svelte';
  import Icon from '@/components/Icon.svelte';
  import { language, t } from '@/i18n/config';
  import { loadBlogContent, type BlogPostItem, type Locale } from '@/lib/content';
  import { navigate } from '@/lib/router';

  let posts: BlogPostItem[] = [];
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
      posts = await loadBlogContent(locale);
    } catch (error) {
      console.error('Error loading blog content:', error);
      posts = [];
    } finally {
      loading = false;
    }
  }

  function parseDate(rawDate: string) {
    const isoDateMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoDateMatch) {
      const [, year, month, day] = isoDateMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return new Date(rawDate);
  }

  function formatDate(rawDate: string, locale: string) {
    const parsedDate = parseDate(rawDate);
    if (Number.isNaN(parsedDate.getTime())) return rawDate;

    const formatLocale = locale === 'fr' ? 'fr-FR' : 'en-US';
    return new Intl.DateTimeFormat(formatLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(parsedDate);
  }

  function isDraftPost(post: { draft?: boolean; tags?: string[] }) {
    if (post.draft) return true;
    return Array.isArray(post.tags) && post.tags.some((tag) => tag.toLowerCase() === 'draft');
  }

  const hasModifier = (event: MouseEvent) =>
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

  function handleInternalLinkClick(event: MouseEvent, href: string) {
    if (event.defaultPrevented || event.button !== 0 || hasModifier(event)) return;

    event.preventDefault();
    navigate(href);
  }
</script>

<section class="py-24 bg-secondary/30">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl font-bold mb-4">{t('blog.title')}</h2>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">{t('blog.subtitle')}</p>
    </div>

    {#if loading}
      <div class="flex justify-center py-12">
        <LoadingState label={t('common.loading', 'Chargement...')} />
      </div>
    {:else if posts.length === 0}
      <EmptyState class="max-w-2xl mx-auto" title={t('blog.empty')} />
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {#each posts as post}
          {@const postUrl = post.url && post.url !== '#' ? post.url : `/blog/${post.id}`}
          {@const isExternal = postUrl.startsWith('http')}
          {@const publicationDate = post.date ? formatDate(post.date, currentLanguage) : t('blog.soon')}
          {@const isDraft = isDraftPost(post)}

          <Card interactive class="p-0 overflow-hidden">
            <div class="flex flex-col space-y-1.5 p-6">
              <div class="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                <Icon name={post.icon || 'newspaper'} className="w-6 h-6 text-accent-foreground" />
              </div>
              <div class="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                <span class="inline-flex items-center gap-1.5">
                  <Icon name="calendar" className="w-4 h-4" />
                  {publicationDate}
                </span>
                {#if post.readTime}
                  <span class="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="w-4 h-4" />
                    {post.readTime}
                  </span>
                {/if}
                {#if isDraft}
                  <Badge>{t('blog.draft', 'Draft')}</Badge>
                {/if}
              </div>
              <h3 class="text-2xl font-semibold tracking-tight">{post.title}</h3>
              <p class="text-base leading-relaxed text-sm text-muted-foreground">{post.description}</p>
            </div>

            <div class="p-6 pt-0">
              {#if isExternal}
                <SentLink
                  href={postUrl}
                  external
                  variant="standalone"
                  class="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  {t('blog.readArticle')}
                  <Icon name="arrow-up-right" className="w-4 h-4" />
                </SentLink>
              {:else}
                <SentLink
                  href={postUrl}
                  variant="standalone"
                  class="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-medium"
                  onclick={(event) => handleInternalLinkClick(event, postUrl)}
                >
                  {t('blog.readArticle')}
                  <Icon name="arrow-up-right" className="w-4 h-4" />
                </SentLink>
              {/if}
            </div>
          </Card>
        {/each}
      </div>
    {/if}
  </div>
</section>
