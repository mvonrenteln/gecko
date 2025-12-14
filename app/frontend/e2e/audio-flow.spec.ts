import { test, expect } from '@playwright/test';

test('audio flow renders and can be toggled', async ({ page }) => {
  await page.goto('/audio');
  await expect(page.getByRole('heading', { name: /Audio laden/ })).toBeVisible();
  const playButton = page.getByRole('button', { name: 'Play' });
  await playButton.click();
  await expect(page.getByTestId('audio-element')).toBeVisible();
});
