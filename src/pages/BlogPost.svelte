<script lang="ts">
  import Footer from '@/components/Footer.svelte';
  import Icon from '@/components/Icon.svelte';
  import Link from '@/components/Link.svelte';
  import Navigation from '@/components/Navigation.svelte';
  import heroImage from '@/assets/hero-tech.jpg';
  import { language, t } from '@/i18n/config';
  import { loadBlogArticle, type BlogArticle, type Locale } from '@/lib/content';
  import { renderMarkdown } from '@/lib/markdownRenderer';
  import { applySeo, createArticleSummary } from '@/lib/seo';

  export let slug: string | null = null;

  let article: BlogArticle | null = null;
  let loading = true;
  let loadedKey = '';

  $: currentLanguage = ($language === 'en' ? 'en' : 'fr') as Locale;
  $: loadKey = `${currentLanguage}:${slug ?? ''}`;

  $: if (loadKey !== loadedKey) {
    loadedKey = loadKey;
    void load(currentLanguage, slug || undefined);
  }

  $: if (slug && !loading && article) {
    const routePath = currentLanguage === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`;
    const description = createArticleSummary(article.content);
    applySeo({
      path: routePath,
      locale: currentLanguage,
      title: `SENT-tech | ${article.title}`,
      description,
      type: 'article',
      noIndex: false,
    });
  } else if (slug && !loading && !article) {
    const routePath = currentLanguage === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`;
    applySeo({
      path: routePath,
      locale: currentLanguage,
      title: 'SENT-tech | Article not found',
      description:
        currentLanguage === 'en'
          ? 'This article does not exist or is not available in this language.'
          : "Cet article n'existe pas ou n'est pas disponible dans cette langue.",
      type: 'article',
      noIndex: true,
    });
  }

  $: renderedContent = article ? renderMarkdown(article.content) : '';

  async function load(locale: Locale, currentSlug?: string) {
    loading = true;
    try {
      article = await loadBlogArticle(locale, currentSlug);
    } catch (error) {
      console.error('Error loading blog article:', error);
      article = null;
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

  function isDraftArticle(value: { draft?: boolean; tags?: string[] }) {
    if (value.draft) return true;
    return Array.isArray(value.tags) && value.tags.some((tag) => tag.toLowerCase() === 'draft');
  }
</script>

<div class="min-h-screen">
  <Navigation />
  <main>
    <section class="relative overflow-hidden pt-28 pb-16 sm:pb-20">
      <div
        class="absolute inset-0 z-0"
        style={`background-image: url(${heroImage}); background-size: cover; background-position: center;`}
      >
        <div class="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-primary-foreground">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-primary-foreground transition-colors mb-8"
          >
            <Icon name="arrow-left" className="w-4 h-4" />
            {t('blog.backToBlog', 'Back to blog')}
          </Link>

          {#if loading}
            <p class="text-primary-foreground/85">{t('common.loading', 'Loading...')}</p>
          {:else if !article}
            <div class="rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 backdrop-blur p-8">
              <h1 class="text-2xl font-semibold mb-2">{t('blog.notFoundTitle', 'Article not found')}</h1>
              <p class="text-primary-foreground/85">
                {t('blog.notFoundBody', 'This article does not exist or is not available in this language.')}
              </p>
            </div>
          {:else}
            <h1 class="text-4xl sm:text-5xl font-bold mb-6">{article.title}</h1>
            <div class="flex items-center flex-wrap gap-4 text-sm text-primary-foreground/85">
              {#if article.date}
                <span class="inline-flex items-center gap-1.5">
                  <Icon name="calendar" className="w-4 h-4" />
                  {formatDate(article.date, currentLanguage)}
                </span>
              {/if}
              {#if article.readTime}
                <span class="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="w-4 h-4" />
                  {article.readTime}
                </span>
              {/if}
              {#if isDraftArticle(article)}
                <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/35">
                  {t('blog.draft', 'Draft')}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          {#if !loading && article}
            <article class="text-foreground">{@html renderedContent}</article>
          {/if}
        </div>
      </div>
    </section>
  </main>
  <Footer />
</div>
