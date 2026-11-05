import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';

test.describe('Daily Report', () => {
  // Scoped to this describe block only — DR-15 below needs a clean session.
  test.use({ storageState: AUTH_FILE });

  test.beforeEach(async ({ dailyReportActions }) => {
    await dailyReportActions.goto();
  });

  // DR-01
  test('loads, exact heading and subtitle format', async ({ dailyReportPage }) => {
    await expect(dailyReportPage.heading).toHaveText('Daily report');
    await expect(dailyReportPage.subtitle).toBeVisible();

    for (const section of [
      dailyReportPage.trendsSection,
      dailyReportPage.revenueSection,
      dailyReportPage.generationsSection,
      dailyReportPage.creditLedgerSection,
      dailyReportPage.engagementSection,
    ]) {
      await expect(section).toBeVisible();
    }
  });

  // DR-02
  test('report tabs: exact labels, both present', async ({ dailyReportPage }) => {
    await expect(dailyReportPage.pickleItTab).toBeVisible();
    await expect(dailyReportPage.pickleDailyTab).toBeVisible();
  });

  // DR-03
  test('switch report tab (Pickle it / Pickle Daily)', async ({ dailyReportPage, dailyReportActions }) => {
    await dailyReportActions.selectTab('Pickle Daily');
    await expect(dailyReportPage.pickleDailyTab).toBeVisible();

    await dailyReportActions.selectTab('Pickle it');
    await expect(dailyReportPage.pickleItTab).toBeVisible();
  });

  // DR-04
  test('"Date (IST)" label and "Yesterday" preset are present', async ({ dailyReportPage }) => {
    await expect(dailyReportPage.dateLabel).toBeVisible();
    await expect(dailyReportPage.yesterdayButton).toBeVisible();
  });

  // DR-05
  test('"Yesterday" date preset is selected and stable', async ({ dailyReportActions }) => {
    const subtitleBefore = await dailyReportActions.getReportingDateText();

    await dailyReportActions.goToYesterday();

    const subtitleAfter = await dailyReportActions.getReportingDateText();
    expect(subtitleAfter).toBe(subtitleBefore);
  });

  // DR-06
  test('"Include internal users" checkbox: exact label, toggles correctly', async ({
    dailyReportPage,
    dailyReportActions,
  }) => {
    await expect(dailyReportPage.includeInternalUsersCheckbox).toBeVisible();
    await expect(dailyReportPage.includeInternalUsersCheckbox).not.toBeChecked();

    await dailyReportActions.toggleIncludeInternalUsers();
    await expect(dailyReportPage.includeInternalUsersCheckbox).toBeChecked();

    await dailyReportActions.toggleIncludeInternalUsers();
    await expect(dailyReportPage.includeInternalUsersCheckbox).not.toBeChecked();
  });

  // DR-07
  test('top-line stat tiles: exact labels and captions', async ({ dailyReportPage }) => {
    const cases: [typeof dailyReportPage.newSignupsCard, string, string | RegExp][] = [
      [dailyReportPage.newSignupsCard, 'New signups', 'no change'],
      [dailyReportPage.activeUsersCard, 'Active users', /vs prior day/],
      [dailyReportPage.packPurchasesCard, 'Pack purchases', /credits sold/],
      [dailyReportPage.imageGenerationsCard, 'Image generations', /failed/],
      [dailyReportPage.videoGenerationsCard, 'Video generations', /failed/],
      [dailyReportPage.creditsDebitedCard, 'Credits debited', /vs prior day/],
      [dailyReportPage.creditsGrantedCard, 'Credits granted', /vs prior day/],
      [dailyReportPage.outstandingWalletBalanceCard, 'Outstanding wallet balance', 'all users, unexpired'],
      [dailyReportPage.firstTimeGeneratorsCard, 'First-time generators', 'no change'],
      [dailyReportPage.totalUsersCard, 'Total users', /have ever paid/],
    ];
    for (const [card, label, caption] of cases) {
      await expect(card).toContainText(label);
      await expect(card).toContainText(/[\d—]/);
      await expect(card).toContainText(caption);
    }
  });

  // DR-08
  test('Trends: exact range buttons and chart titles', async ({ dailyReportPage }) => {
    await expect(dailyReportPage.trendRangeButtons).toHaveText(['7 days', '30 days', '90 days']);
    for (const chartTitle of [
      'Signups & active users',
      'Generations by type',
      'Credits sold & debited',
      'Generation failures',
    ]) {
      await expect(dailyReportPage.trendChartTitle(chartTitle)).toBeVisible();
    }
  });

  // DR-09
  test('Trends — switch range (7 / 30 / 90 days)', async ({ dailyReportPage, dailyReportActions }) => {
    for (const range of ['7 days', '30 days', '90 days'] as const) {
      await dailyReportActions.selectTrendRange(range);
      await expect(dailyReportPage.trendRangeButton(range)).toBeVisible();
    }
  });

  // DR-10
  test('Revenue: exact breakdown labels and sub-metrics', async ({ dailyReportPage }) => {
    const section = dailyReportPage.revenueSection;
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
  test('Generations: exact sub-section labels', async ({ dailyReportPage }) => {
    const section = dailyReportPage.generationsSection;
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
  test('Credit ledger: exact labels', async ({ dailyReportPage }) => {
    const section = dailyReportPage.creditLedgerSection;
    for (const label of ['Debited', 'Refunded', 'Granted', 'Expired', 'Grants by reason']) {
      await expect(section).toContainText(label);
    }
  });

  // DR-13
  test('Engagement: exact labels', async ({ dailyReportPage }) => {
    const section = dailyReportPage.engagementSection;
    for (const label of ['Login sessions', 'New devices', 'Library uploads', 'App feedback']) {
      await expect(section).toContainText(label);
    }
  });

  // DR-14
  test('Engagement: feedback thumbs and store downloads labels', async ({ dailyReportPage }) => {
    const section = dailyReportPage.engagementSection;
    await expect(section).toContainText('liked');
    await expect(section).toContainText('disliked');
    await expect(section).toContainText('post-purchase feedback');
    await expect(section).toContainText('Store downloads (prior-day report)');
    await expect(section).toContainText('iOS');
    await expect(section).toContainText('Android');
  });
});

// DR-15 — same-file but outside the authenticated describe block above.
test('unauthenticated access shows login, not report', async ({ page, loginPage, dailyReportPage }) => {
  await page.goto('/admin/daily-report');
  await expect(loginPage.welcomeHeading).toBeVisible();
  await expect(dailyReportPage.heading).not.toBeVisible();
});
