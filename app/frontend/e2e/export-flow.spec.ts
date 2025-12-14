import { test, expect } from '@playwright/test';

test('export flow renders payload', async ({ page }) => {
  await page.goto('/export');
  await expect(page.getByRole('heading', { name: 'Export' })).toBeVisible();
  await page.getByRole('button', { name: 'Export als JSON' }).click();
  await expect(page.getByText(/transcript/)).toBeVisible();
});
