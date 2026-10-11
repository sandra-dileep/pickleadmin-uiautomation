import { test, expect } from '../fixtures/base';

/**
 * This spec runs in the "chromium" project, which already starts with a
 * logged-in storage state (see tests/fixtures/auth.setup.ts). It's here to
 * prove the framework wiring works end to end.
 *
 * Replace the assertion below with a real "am I logged in" check for the app
 * (e.g. a dashboard heading, account menu, etc.).
 */
test('landing page loads after authenticated session is restored', async ({ page }) => {
  await page.goto('/');
  await expect(page).not.toHaveURL(/login/i);
});

/**
 * Example of a standalone (non-authenticated) flow using the LoginPage
 * fixture directly, useful for negative-path tests like bad credentials.
 */
test('shows an error on invalid credentials', async ({ loginPage, page }) => {
  await loginPage.goto('/');
  await loginPage.login('invalid-user@example.com', 'wrong-password');
  await loginPage.expectLoginError();
});
