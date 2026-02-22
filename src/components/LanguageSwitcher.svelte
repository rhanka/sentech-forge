<script lang="ts">
  import { Globe } from 'lucide-svelte';
  import { language, toggleLanguage } from '@/i18n/config';

  export let isScrolled = false;

  $: currentLanguage = $language;
</script>

<button
  type="button"
  on:click={toggleLanguage}
  class={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-3 hover:text-accent hover:bg-transparent ${
    isScrolled ? 'text-foreground' : 'text-primary-foreground'
  }`}
>
  <Globe class="h-4 w-4" />
  <span class="font-medium">{currentLanguage === 'fr' ? 'EN' : 'FR'}</span>
</button>
