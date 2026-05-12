import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', name: 'homepage-fr' },
  { path: '/en/', name: 'homepage-en' },
  { path: '/blog/ai-assisted-software-engineering', name: 'blog-post-fr' },
  { path: '/blog/inexistant', name: 'blog-not-found-fr' },
] as const;

test.describe('visual pages', () => {
  for (const pageCase of pages) {
    test(pageCase.name, async ({ page }) => {
      await page.goto(pageCase.path);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${pageCase.name}.png`, {
        fullPage: true,
      });
    });
  }
});
