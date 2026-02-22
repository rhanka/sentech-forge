<script lang="ts">
  import { location } from '@/lib/router';
  import Index from '@/pages/Index.svelte';
  import NotFound from '@/pages/NotFound.svelte';
  import BlogPost from '@/pages/BlogPost.svelte';

  let pathname = '/';
  let slug: string | null = null;

  $: pathname = $location.pathname;
  $: {
    const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
    slug = blogMatch ? decodeURIComponent(blogMatch[1]) : null;
  }
</script>

{#if pathname === '/'}
  <Index />
{:else if slug}
  <BlogPost {slug} />
{:else}
  <NotFound />
{/if}
