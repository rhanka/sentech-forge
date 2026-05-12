import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', name: 'homepage-fr' },
  { path: '/en/', name: 'homepage-en' },
  { path: '/missing-page', name: 'missing-page-fr' },
  { path: '/blog/ai-assisted-software-engineering', name: 'blog-post-fr' },
  { path: '/blog/inexistant', name: 'blog-not-found-fr' },
] as const;

test.describe('visual pages', () => {
  for (const pageCase of pages) {
    test(pageCase.name, async ({ page }) => {
      await page.goto(pageCase.path);
      await page.waitForLoadState('networkidle');
      await page.locator('footer').waitFor({ state: 'visible' });
      await expect(page.getByText(/Chargement|Loading/)).toHaveCount(0);
      await expect(page).toHaveScreenshot(`${pageCase.name}.png`, {
        fullPage: true,
      });
    });
  }
});

test('homepage does not use flicker-prone hero motion', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('section').first().locator('.animate-fade-in')).toHaveCount(0);
  await expect(page.locator('section').first().locator('.animate-bounce')).toHaveCount(0);
});

test('global missing page uses the site shell', async ({ page }) => {
  await page.goto('/missing-page');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByText('Page introuvable')).toBeVisible();
  await expect(page.getByRole('button', { name: /Retour/ })).toBeVisible();
});

test('blog not found offers a centered return action', async ({ page }) => {
  await page.goto('/blog/inexistant');
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Article introuvable')).toBeVisible();
  await expect(page.getByRole('button', { name: /Retour/ })).toBeVisible();

  const box = await page.locator('.st-empty-state').boundingBox();
  const viewport = page.viewportSize();
  if (!box || !viewport) {
    throw new Error('Missing empty-state geometry');
  }

  expect(Math.abs((box.x + box.width / 2) - viewport.width / 2)).toBeLessThan(8);
});
