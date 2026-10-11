import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';
import { DailyReportPage } from '../../pages/DailyReportPage';

test.describe('Daily Report', () => {
  // Scoped to this describe block only — DR-11 below needs a clean session.
  test.use({ storageState: AUTH_FILE });

  let report: DailyReportPage;

  test.beforeEach(async ({ page }) => {
    report = new DailyReportPage(page);
    await report.goto();
  });

  // DR-01
  test('loads with all sections', async ({ page }) => {
    await expect(report.heading).toBeVisible();
    await expect(page.getByText(/Reporting \d{4}-\d{2}-\d{2} \(vs\. \d{4}-\d{2}-\d{2}\)/)).toBeVisible();

    for (const section of [
      report.trendsSection,
      report.revenueSection,
      report.generationsSection,
      report.creditLedgerSection,
      report.engagementSection,
    ]) {
      await expect(section).toBeVisible();
    }
  });

  // DR-02
  test('top-line stat tiles show data', async () => {
    for (const card of [
      report.newSignupsCard,
      report.activeUsersCard,
      report.packPurchasesCard,
      report.imageGenerationsCard,
      report.videoGenerationsCard,
      report.creditsDebitedCard,
      report.creditsGrantedCard,
      report.outstandingWalletBalanceCard,
      report.firstTimeGeneratorsCard,
      report.totalUsersCard,
    ]) {
      await expect(card).toBeVisible();
      await expect(card).toContainText(/[\d—]/);
    }
  });

  // DR-03
  test('switch report tab (Pickle it / Pickle Daily)', async ({ page }) => {
    await report.selectTab('Pickle Daily');
    await expect(page.getByRole('button', { name: 'Pickle Daily' })).toBeVisible();

    await report.selectTab('Pickle it');
    await expect(page.getByRole('button', { name: 'Pickle it' })).toBeVisible();
  });

  // DR-04
  test('"Yesterday" date preset is selected and stable', async ({ page }) => {
    const subtitleBefore = await page
      .getByText(/Reporting \d{4}-\d{2}-\d{2}/)
      .first()
      .innerText();

    await report.goToYesterday();

    const subtitleAfter = await page
      .getByText(/Reporting \d{4}-\d{2}-\d{2}/)
      .first()
      .innerText();
    expect(subtitleAfter).toBe(subtitleBefore);
  });

  // DR-05
  test('toggle "Include internal users"', async () => {
    await expect(report.includeInternalUsersCheckbox).not.toBeChecked();

    await report.toggleIncludeInternalUsers();
    await expect(report.includeInternalUsersCheckbox).toBeChecked();

    await report.toggleIncludeInternalUsers();
    await expect(report.includeInternalUsersCheckbox).not.toBeChecked();
  });

  // DR-06
  test('Trends — switch range (7 / 30 / 90 days)', async () => {
    for (const range of ['7 days', '30 days', '90 days'] as const) {
      await report.selectTrendRange(range);
      await expect(report.trendsSection.getByRole('button', { name: range })).toBeVisible();
    }
    for (const chartTitle of [
      'Signups & active users',
      'Generations by type',
      'Credits sold & debited',
      'Generation failures',
    ]) {
      await expect(report.trendsSection.getByText(chartTitle)).toBeVisible();
    }
  });

  // DR-07
  test('Revenue section renders', async () => {
    for (const label of ['By pack', 'By store', 'By currency']) {
      await expect(report.revenueSection.getByText(label, { exact: false })).toBeVisible();
    }
  });

  // DR-08
  test('Generations section renders', async () => {
    for (const label of ['Image generations', 'Video generations', 'Overlay generations']) {
      await expect(report.generationsSection.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });

  // DR-09
  test('Credit ledger section renders', async () => {
    for (const label of ['Debited', 'Refunded', 'Granted', 'Expired']) {
      await expect(report.creditLedgerSection.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });

  // DR-10
  test('Engagement section renders', async () => {
    for (const label of ['Login sessions', 'New devices', 'Library uploads', 'App feedback']) {
      await expect(report.engagementSection.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });
});

// DR-11 — deliberately outside the authenticated describe block above.
test('unauthenticated access shows login, not report', async ({ page }) => {
  await page.goto('/admin/daily-report');
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Daily report' })).not.toBeVisible();
});
