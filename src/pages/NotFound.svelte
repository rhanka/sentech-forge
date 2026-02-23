<script lang="ts">
  import Link from '@/components/Link.svelte';
  import { location } from '@/lib/router';
  import { applySeo } from '@/lib/seo';
  import { language } from '@/i18n/config';

  $: pathname = $location.pathname;
  $: if (pathname) {
    console.error('404 Error: User attempted to access non-existent route:', pathname);
  }

  $: {
    const locale = $language === 'en' ? 'en' : 'fr';
    const title = locale === 'en' ? 'SENT-tech | Page not found' : 'SENT-tech | Page introuvable';
    const description =
      locale === 'en'
        ? 'The requested page does not exist. Visit the home page or use the language switcher.'
        : "Cette page n'existe pas. Retournez à l'accueil ou utilisez le sélecteur de langue.";

    applySeo({
      path: '/404',
      locale,
      title,
      description,
      noIndex: true,
      type: 'website',
    });
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
  <div class="text-center">
    <h1 class="mb-4 text-4xl font-bold">404</h1>
    <p class="mb-4 text-xl text-gray-600">Oops! Page not found</p>
    <Link href="/" className="text-blue-500 underline hover:text-blue-700">Return to Home</Link>
  </div>
</div>
