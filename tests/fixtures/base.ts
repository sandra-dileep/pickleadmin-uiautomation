import { test as base } from '@playwright/test';
import { LoginPageObjects } from '../pages/pageObjects/LoginPageObjects';
import { AppShellPageObjects } from '../pages/pageObjects/AppShellPageObjects';
import { OverviewPageObjects } from '../pages/pageObjects/OverviewPageObjects';
import { DailyReportPageObjects } from '../pages/pageObjects/DailyReportPageObjects';
import { LoginPageActions } from '../pages/pageActions/LoginPageActions';
import { AppShellPageActions } from '../pages/pageActions/AppShellPageActions';
import { OverviewPageActions } from '../pages/pageActions/OverviewPageActions';
import { DailyReportPageActions } from '../pages/pageActions/DailyReportPageActions';

/**
 * Extend base test with page-object (locators) and page-action fixtures so
 * specs just do:
 *   import { test, expect } from '../../fixtures/base';
 *   test('...', async ({ overviewPage, overviewActions }) => { ... });
 *
 * `*Page`    → locators only (tests/pages/pageObjects) — use in assertions.
 * `*Actions` → interactions (tests/pages/pageActions) — goto/click/fill.
 */
type Fixtures = {
  loginPage: LoginPageObjects;
  loginActions: LoginPageActions;
  shellPage: AppShellPageObjects;
  shellActions: AppShellPageActions;
  overviewPage: OverviewPageObjects;
  overviewActions: OverviewPageActions;
  dailyReportPage: DailyReportPageObjects;
  dailyReportActions: DailyReportPageActions;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPageObjects(page));
  },
  loginActions: async ({ page }, use) => {
    await use(new LoginPageActions(page));
  },
  shellPage: async ({ page }, use) => {
    await use(new AppShellPageObjects(page));
  },
  shellActions: async ({ page }, use) => {
    await use(new AppShellPageActions(page));
  },
  overviewPage: async ({ page }, use) => {
    await use(new OverviewPageObjects(page));
  },
  overviewActions: async ({ page }, use) => {
    await use(new OverviewPageActions(page));
  },
  dailyReportPage: async ({ page }, use) => {
    await use(new DailyReportPageObjects(page));
  },
  dailyReportActions: async ({ page }, use) => {
    await use(new DailyReportPageActions(page));
  },
});

export { expect } from '@playwright/test';
