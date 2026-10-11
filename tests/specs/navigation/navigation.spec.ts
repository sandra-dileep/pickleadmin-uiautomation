import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';
import { AppShellPage } from '../../pages/AppShellPage';

test.use({ storageState: AUTH_FILE });

test.describe('Navigation / App shell', () => {
  let shell: AppShellPage;

  test.beforeEach(async ({ page }) => {
    shell = new AppShellPage(page);
    await page.goto('/admin/dashboard');
  });

  // NAV-01
  test('brand + console label present', async () => {
    await expect(shell.brandHeading).toBeVisible();
    await expect(shell.brandHeading).toHaveText('Snapped Admin');
    await expect(shell.consoleLabel).toBeVisible();
  });

  // NAV-02
  test('theme toggle button present', async () => {
    await expect(shell.themeButton).toBeVisible();
    await expect(shell.themeButton).toHaveAccessibleName('Theme: System');
  });

  // NAV-03
  test('all six nav groups present with exact labels, in order', async () => {
    await expect(shell.nav.getByRole('button')).toHaveText([
      'Dashboard',
      'Content',
      'Tools',
      'Billing',
      'Management',
      'Settings',
    ]);
  });

  // NAV-04
  test('Dashboard nav group expanded by default, others collapsed', async () => {
    await expect(shell.dashboardNavGroup).toHaveAttribute('aria-expanded', 'true');
    for (const group of [
      shell.contentNavGroup,
      shell.toolsNavGroup,
      shell.billingNavGroup,
      shell.managementNavGroup,
      shell.settingsNavGroup,
    ]) {
      await expect(group).toHaveAttribute('aria-expanded', 'false');
    }
  });

  // NAV-05
  test("Dashboard group's nav links have exact labels, in order", async () => {
    await expect(shell.nav.getByRole('link')).toHaveText([
      'Overview',
      'Daily Report',
      'Insights',
      'Generation analytics',
      'Change log',
    ]);
  });

  // NAV-06
  test('collapsing/expanding a nav group toggles aria-expanded', async () => {
    await expect(shell.contentNavGroup).toHaveAttribute('aria-expanded', 'false');

    await shell.expandNavGroup(shell.contentNavGroup);
    await expect(shell.contentNavGroup).toHaveAttribute('aria-expanded', 'true');

    await shell.expandNavGroup(shell.contentNavGroup);
    await expect(shell.contentNavGroup).toHaveAttribute('aria-expanded', 'false');
  });

  // NAV-07
  test('Overview / Daily Report links navigate correctly', async ({ page }) => {
    await shell.dailyReportLink.click();
    await expect(page.getByRole('heading', { name: 'Daily report' })).toBeVisible();

    await shell.overviewLink.click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  // NAV-08
  test('language selector has exact 4 options, in order', async () => {
    await expect(shell.languageSelect).toBeVisible();
    await expect(shell.languageSelect).toHaveAccessibleName('App language');
    await expect(shell.languageSelect.locator('option')).toHaveText(['EN', 'ML', 'TA', 'HI']);
  });

  // NAV-09
  test('log out button present', async () => {
    await expect(shell.logoutButton).toBeVisible();
  });
});
