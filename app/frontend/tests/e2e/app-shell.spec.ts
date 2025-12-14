import { expect, test } from '@playwright/test';

const HOME = '/';
const DETAIL = '/transcripts/alpha';

test.describe('Gecko Next App-Shell', () => {
  test('lädt Startseite per ISR und listet Transkripte', async ({ page }) => {
    await page.goto(HOME);
    await expect(page.getByText('SSR/ISR aktiv')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Öffnen' })).toBeVisible();
  });

  test('Audio-Flow: lädt und toggelt Audioplayer', async ({ page }) => {
    await page.goto(DETAIL);
    const audio = page.getByTestId('audio-element');
    await expect(audio).toBeVisible();
    await page.getByTestId('toggle-audio').click();
    await expect(page.getByText('geladen')).toBeVisible();
  });

  test('Transcript bearbeiten und exportieren', async ({ page }) => {
    await page.goto(DETAIL);
    const textarea = page.getByTestId('transcript-textarea');
    await textarea.fill('Neuer Test-Text für das E2E-Szenario');
    await page.getByTestId('save-transcript').click();
    await expect(textarea).toHaveValue('Neuer Test-Text für das E2E-Szenario');
    const [download] = await Promise.all([
      page.waitForEvent('response', (resp) => resp.url().includes('/export') && resp.status() === 200),
      page.getByTestId('export-transcript').click()
    ]);
    expect(await download.text()).toContain('Neuer Test-Text');
  });
});
