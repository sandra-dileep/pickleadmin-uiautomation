import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';
import { DailyReportPage } from '../../pages/DailyReportPage';

test.describe('Daily Report', () => {
  // Scoped to this describe block only — DR-16 below needs a clean session.
  test.use({ storageState: AUTH_FILE });

  let report: DailyReportPage;

  test.beforeEach(async ({ page }) => {
    report = new DailyReportPage(page);
    await report.goto();
  });

  // DR-01
  test('loads, exact heading and subtitle format', async ({ page }) => {
    await expect(report.heading).toHaveText('Daily report');
    await expect(
      page.getByText(/^One IST calendar day\. Reporting \d{4}-\d{2}-\d{2} \(vs\. \d{4}-\d{2}-\d{2}\)\.$/)
    ).toBeVisible();

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
  test('report tabs: exact labels, both present', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Pickle it' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pickle Daily' })).toBeVisible();
  });

  // DR-03
  test('switch report tab (Pickle it / Pickle Daily)', async ({ page }) => {
    await report.selectTab('Pickle Daily');
    await expect(page.getByRole('button', { name: 'Pickle Daily' })).toBeVisible();

    await report.selectTab('Pickle it');
    await expect(page.getByRole('button', { name: 'Pickle it' })).toBeVisible();
  });

  // DR-04
  test('"Date (IST)" label and "Yesterday" preset are present', async ({ page }) => {
    await expect(page.getByText('Date (IST)', { exact: true })).toBeVisible();
    await expect(report.yesterdayButton).toBeVisible();
  });

  // DR-05
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

  // DR-06
  test('"Include internal users" checkbox: exact label, toggles correctly', async () => {
    await expect(report.includeInternalUsersCheckbox).toBeVisible();
    await expect(report.includeInternalUsersCheckbox).not.toBeChecked();

    await report.toggleIncludeInternalUsers();
    await expect(report.includeInternalUsersCheckbox).toBeChecked();

    await report.toggleIncludeInternalUsers();
    await expect(report.includeInternalUsersCheckbox).not.toBeChecked();
  });

  // DR-07
  test('top-line stat tiles: exact labels and captions', async () => {
    const cases: [typeof report.newSignupsCard, string, string | RegExp][] = [
      [report.newSignupsCard, 'New signups', 'no change'],
      [report.activeUsersCard, 'Active users', /vs prior day/],
      [report.packPurchasesCard, 'Pack purchases', /credits sold/],
      [report.imageGenerationsCard, 'Image generations', /failed/],
      [report.videoGenerationsCard, 'Video generations', /failed/],
      [report.creditsDebitedCard, 'Credits debited', /vs prior day/],
      [report.creditsGrantedCard, 'Credits granted', /vs prior day/],
      [report.outstandingWalletBalanceCard, 'Outstanding wallet balance', 'all users, unexpired'],
      [report.firstTimeGeneratorsCard, 'First-time generators', 'no change'],
      [report.totalUsersCard, 'Total users', /have ever paid/],
    ];
    for (const [card, label, caption] of cases) {
      await expect(card).toContainText(label);
      await expect(card).toContainText(/[\d—]/);
      await expect(card).toContainText(caption);
    }
  });

  // DR-08
  test('Trends: exact range buttons and chart titles', async () => {
    await expect(report.trendsSection.getByRole('button')).toHaveText(['7 days', '30 days', '90 days']);
    for (const chartTitle of [
      'Signups & active users',
      'Generations by type',
      'Credits sold & debited',
      'Generation failures',
    ]) {
      await expect(report.trendsSection.getByText(chartTitle, { exact: true })).toBeVisible();
    }
  });

  // DR-09
  test('Trends — switch range (7 / 30 / 90 days)', async () => {
    for (const range of ['7 days', '30 days', '90 days'] as const) {
      await report.selectTrendRange(range);
      await expect(report.trendsSection.getByRole('button', { name: range })).toBeVisible();
    }
  });

  // DR-10
  test('Revenue: exact breakdown labels and sub-metrics', async () => {
    const section = report.revenueSection;
    await expect(section).toContainText(
      'Granted credit-pack purchases only (excludes pending / failed / disputed)'
    );
    for (const label of ['By pack (purchases)', 'By store', 'By currency (gross)']) {
      await expect(section).toContainText(label);
    }
    for (const label of [
      'First-time buyers',
      'Repeat buyers',
      'Bought same-day signup',
      'Subscription starts',
      'Cancellations',
      'Consumable purchases',
      'Static template unlocks',
      'Failed / disputed purchases',
    ]) {
      await expect(section).toContainText(label);
    }
  });

  // DR-11
  test('Generations: exact sub-section labels', async () => {
    const section = report.generationsSection;
    for (const label of [
      'Image generations',
      'Video generations',
      'Overlay generations',
      'Top image templates',
      'Top video templates',
    ]) {
      await expect(section).toContainText(label);
    }
  });

  // DR-12
  test('Credit ledger: exact labels', async () => {
    const section = report.creditLedgerSection;
    for (const label of ['Debited', 'Refunded', 'Granted', 'Expired', 'Grants by reason']) {
      await expect(section).toContainText(label);
    }
  });

  // DR-13
  test('Engagement: exact labels', async () => {
    const section = report.engagementSection;
    for (const label of ['Login sessions', 'New devices', 'Library uploads', 'App feedback']) {
      await expect(section).toContainText(label);
    }
  });

  // DR-14
  test('Engagement: feedback thumbs and store downloads labels', async () => {
    const section = report.engagementSection;
    await expect(section).toContainText('liked');
    await expect(section).toContainText('disliked');
    await expect(section).toContainText('post-purchase feedback');
    await expect(section).toContainText('Store downloads (prior-day report)');
    await expect(section).toContainText('iOS');
    await expect(section).toContainText('Android');
  });
});

// DR-15 — same-file but outside the authenticated describe block above.
test('unauthenticated access shows login, not report', async ({ page }) => {
  await page.goto('/admin/daily-report');
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Daily report' })).not.toBeVisible();
});
