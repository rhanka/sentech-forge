<script lang="ts">
  import { Card } from '@sentropic/design-system-svelte';
  import { language, t } from '@/i18n/config';

  $: $language;
</script>

<footer class="bg-primary text-primary-foreground py-8">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <Card
      class="!rounded-none !p-0 !border-none !shadow-none"
      style="
        --st-component-card-background: transparent;
        --st-component-card-border: transparent;
        --st-component-card-shadow: none;
        --st-component-card-radius: 0;
        --st-semantic-text-primary: hsl(var(--primary-foreground));
      "
    >
      <div>
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
    </Card>
  </div>
</footer>
