import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../utils/env';

const authFile = 'playwright/.auth/user.json';

/**
 * Runs once before the other projects (see playwright.config.ts `dependencies`).
 * Logs in via the UI and saves storage state (cookies/localStorage) so
 * every other test starts already authenticated — no repeated UI login.
 */
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(env.baseURL);
  await loginPage.login(env.username, env.password);

  // Dashboard sidebar always has a "Log out" button once authenticated.
  await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
