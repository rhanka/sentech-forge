<script lang="ts">
  import { Button, EmptyState } from '@sent-tech/components-svelte';
  import Footer from '@/components/Footer.svelte';
  import Navigation from '@/components/Navigation.svelte';
  import heroImage from '@/assets/hero-tech.jpg';
  import { location, navigate } from '@/lib/router';
  import { applySeo } from '@/lib/seo';
  import { language, t } from '@/i18n/config';

  const heroEmptyStateStyle = [
    '--st-component-emptyState-background: hsl(var(--primary-foreground) / 0.1)',
    '--st-component-emptyState-border: hsl(var(--primary-foreground) / 0.25)',
    '--st-component-emptyState-titleText: hsl(var(--primary-foreground))',
    '--st-component-emptyState-messageText: hsl(var(--primary-foreground) / 0.85)',
    '-webkit-backdrop-filter: blur(8px)',
    'backdrop-filter: blur(8px)',
  ].join('; ');

  const hasModifier = (event: MouseEvent) =>
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

  function handleInternalLinkClick(event: MouseEvent, href: string) {
    if (event.defaultPrevented || event.button !== 0 || hasModifier(event)) return;

    event.preventDefault();
    navigate(href);
  }

  $: pathname = $location.pathname;
  $: if (pathname) {
    console.error('404 Error: User attempted to access non-existent route:', pathname);
  }

  $: locale = $language === 'en' ? 'en' : 'fr';
  $: title = t('notFound.title', locale === 'en' ? 'Page not found' : 'Page introuvable');
  $: message = t(
    'notFound.message',
    locale === 'en'
      ? "The page you're looking for does not exist. Return to the homepage or switch language."
      : "La page que vous recherchez n'existe pas. Retournez à l'accueil ou changez de langue."
  );
  $: homeLabel = t('notFound.home', locale === 'en' ? 'Back to home' : "Retour à l'accueil");
  $: homePath = locale === 'en' ? '/en/' : '/';
  $: description =
    locale === 'en'
      ? 'The requested page does not exist. Visit the home page or use the language switcher.'
      : "Cette page n'existe pas. Retournez à l'accueil ou utilisez le sélecteur de langue.";

  $: {
    applySeo({
      path: '/404',
      locale,
      title: `SENT-tech | ${title}`,
      description,
      noIndex: true,
      type: 'website',
    });
  }
</script>

<div class="min-h-screen">
  <Navigation />
  <main>
    <section class="relative min-h-[72vh] overflow-hidden pt-28 pb-16 flex items-center">
      <div
        class="absolute inset-0 z-0"
        style={`background-image: url(${heroImage}); background-size: cover; background-position: center;`}
      >
        <div class="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <EmptyState
          class="w-full max-w-2xl mx-auto"
          style={heroEmptyStateStyle}
          title={title}
          message={message}
        >
          {#snippet action()}
            <Button
              type="button"
              variant="primary"
              onclick={(event) => handleInternalLinkClick(event, homePath)}
            >
              {homeLabel}
            </Button>
          {/snippet}
        </EmptyState>
      </div>
    </section>
  </main>
  <Footer />
</div>
