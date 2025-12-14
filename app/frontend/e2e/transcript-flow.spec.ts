import { test, expect } from '@playwright/test';

test('transcript editing flow', async ({ page }) => {
  await page.goto('/transcripts/demo-transcript');
  await expect(page.getByRole('heading', { name: /Transkript/ })).toBeVisible();
  const textArea = page.getByRole('textbox').first();
  await textArea.fill('Bearbeitetes Segment');
  await expect(textArea).toHaveValue('Bearbeitetes Segment');
});
