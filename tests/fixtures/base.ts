import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Extend base test with page-object fixtures so specs just do:
 *   import { test, expect } from '../fixtures/base';
 *   test('...', async ({ loginPage }) => { ... });
 */
type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
