<script lang="ts">
  import { language, t } from '@/i18n/config';

  $: $language;
</script>

<footer class="bg-primary text-primary-foreground py-8">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-center md:text-left">
        <p class="text-2xl font-bold mb-2">
          <span>SENT</span>
          <span class="text-accent">-tech</span>
        </p>
        <p class="text-sm text-primary-foreground/70">{t('footer.tagline')}</p>
      </div>

      <div class="text-center md:text-right">
        <p class="text-sm text-primary-foreground/70">{t('footer.rights')}</p>
        <p class="text-sm text-primary-foreground/70 mt-1">{t('footer.location')}</p>
      </div>
    </div>
  </div>
</footer>
