import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';

test.use({ storageState: AUTH_FILE });

test.describe('Navigation / App shell', () => {
  test.beforeEach(async ({ shellActions }) => {
    await shellActions.gotoDashboard();
  });

  // NAV-01
  test('brand + console label present', async ({ shellPage }) => {
    await expect(shellPage.brandHeading).toBeVisible();
    await expect(shellPage.brandHeading).toHaveText('Snapped Admin');
    await expect(shellPage.consoleLabel).toBeVisible();
  });

  // NAV-02
  test('theme toggle button present', async ({ shellPage }) => {
    await expect(shellPage.themeButton).toBeVisible();
    await expect(shellPage.themeButton).toHaveAccessibleName('Theme: System');
  });

  // NAV-03
  test('all six nav groups present with exact labels, in order', async ({ shellPage }) => {
    await expect(shellPage.navGroupButtons).toHaveText([
      'Dashboard',
      'Content',
      'Tools',
      'Billing',
      'Management',
      'Settings',
    ]);
  });

  // NAV-04
  test('Dashboard nav group expanded by default, others collapsed', async ({ shellPage }) => {
    await expect(shellPage.dashboardNavGroup).toHaveAttribute('aria-expanded', 'true');
    for (const group of [
      shellPage.contentNavGroup,
      shellPage.toolsNavGroup,
      shellPage.billingNavGroup,
      shellPage.managementNavGroup,
      shellPage.settingsNavGroup,
    ]) {
      await expect(group).toHaveAttribute('aria-expanded', 'false');
    }
  });

  // NAV-05
  test("Dashboard group's nav links have exact labels, in order", async ({ shellPage }) => {
    await expect(shellPage.navLinks).toHaveText([
      'Overview',
      'Daily Report',
      'Insights',
      'Generation analytics',
      'Change log',
    ]);
  });

  // NAV-06
  test('collapsing/expanding a nav group toggles aria-expanded', async ({ shellPage, shellActions }) => {
    await expect(shellPage.contentNavGroup).toHaveAttribute('aria-expanded', 'false');

    await shellActions.toggleNavGroup(shellPage.contentNavGroup);
    await expect(shellPage.contentNavGroup).toHaveAttribute('aria-expanded', 'true');

    await shellActions.toggleNavGroup(shellPage.contentNavGroup);
    await expect(shellPage.contentNavGroup).toHaveAttribute('aria-expanded', 'false');
  });

  // NAV-07
  test('Overview / Daily Report links navigate correctly', async ({
    shellActions,
    overviewPage,
    dailyReportPage,
  }) => {
    await shellActions.openDailyReport();
    await expect(dailyReportPage.heading).toBeVisible();

    await shellActions.openOverview();
    await expect(overviewPage.heading).toBeVisible();
  });

  // NAV-08
  test('language selector has exact 4 options, in order', async ({ shellPage }) => {
    await expect(shellPage.languageSelect).toBeVisible();
    await expect(shellPage.languageSelect).toHaveAccessibleName('App language');
    await expect(shellPage.languageOptions).toHaveText(['EN', 'ML', 'TA', 'HI']);
  });

  // NAV-09
  test('log out button present', async ({ shellPage }) => {
    await expect(shellPage.logoutButton).toBeVisible();
  });
});
