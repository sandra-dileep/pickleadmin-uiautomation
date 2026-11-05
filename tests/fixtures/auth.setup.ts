import { test as setup, expect } from '@playwright/test';
import { LoginPageActions } from '../pages/pageActions/LoginPageActions';
import { AppShellPageObjects } from '../pages/pageObjects/AppShellPageObjects';
import { env } from '../utils/env';

const authFile = 'playwright/.auth/user.json';

/**
 * Runs once before the other projects (see playwright.config.ts `dependencies`).
 * Logs in via the UI and saves storage state (cookies/localStorage) so
 * every other test starts already authenticated — no repeated UI login.
 */
setup('authenticate', async ({ page }) => {
  const loginActions = new LoginPageActions(page);
  await loginActions.goto(env.baseURL);
  await loginActions.loginAs(env.username, env.password);

  // Dashboard sidebar always has a "Log out" button once authenticated.
  await expect(new AppShellPageObjects(page).logoutButton).toBeVisible();

  await page.context().storageState({ path: authFile });
});
