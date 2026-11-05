import type { Locator, Page } from '@playwright/test';

export type TrendRange = '7 days' | '30 days' | '90 days';
export type ReportTab = 'Pickle it' | 'Pickle Daily';

/**
 * Locators for Dashboard → Daily Report (/admin/daily-report).
 */
export class DailyReportPageObjects {
  readonly page: Page;
  readonly heading: Locator;
  /** Full subtitle, e.g. "One IST calendar day. Reporting 2026-01-01 (vs. 2025-12-31)." */
  readonly subtitle: Locator;
  /** First "Reporting YYYY-MM-DD" text on the page — used to read the selected date. */
  readonly reportingDateText: Locator;

  // Top controls
  readonly pickleItTab: Locator;
  readonly pickleDailyTab: Locator;
  readonly dateLabel: Locator;
  readonly yesterdayButton: Locator;
  readonly includeInternalUsersCheckbox: Locator;

  // Stat tiles
  readonly newSignupsCard: Locator;
  readonly activeUsersCard: Locator;
  readonly packPurchasesCard: Locator;
  readonly imageGenerationsCard: Locator;
  readonly videoGenerationsCard: Locator;
  readonly creditsDebitedCard: Locator;
  readonly creditsGrantedCard: Locator;
  readonly outstandingWalletBalanceCard: Locator;
  readonly firstTimeGeneratorsCard: Locator;
  readonly totalUsersCard: Locator;

  // Sections
  readonly trendsSection: Locator;
  readonly trendRangeButtons: Locator;
  readonly revenueSection: Locator;
  readonly generationsSection: Locator;
  readonly creditLedgerSection: Locator;
  readonly engagementSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Daily report' });
    this.subtitle = page.getByText(
      /^One IST calendar day\. Reporting \d{4}-\d{2}-\d{2} \(vs\. \d{4}-\d{2}-\d{2}\)\.$/
    );
    this.reportingDateText = page.getByText(/Reporting \d{4}-\d{2}-\d{2}/).first();

    this.pickleItTab = this.tab('Pickle it');
    this.pickleDailyTab = this.tab('Pickle Daily');
    this.dateLabel = page.getByText('Date (IST)', { exact: true });
    this.yesterdayButton = page.getByRole('button', { name: 'Yesterday' });
    this.includeInternalUsersCheckbox = page.getByRole('checkbox', {
      name: 'Include internal users',
    });

    this.newSignupsCard = this.statCard('New signups');
    this.activeUsersCard = this.statCard('Active users');
    this.packPurchasesCard = this.statCard('Pack purchases');
    this.imageGenerationsCard = this.statCard('Image generations');
    this.videoGenerationsCard = this.statCard('Video generations');
    this.creditsDebitedCard = this.statCard('Credits debited');
    this.creditsGrantedCard = this.statCard('Credits granted');
    this.outstandingWalletBalanceCard = this.statCard('Outstanding wallet balance');
    this.firstTimeGeneratorsCard = this.statCard('First-time generators');
    this.totalUsersCard = this.statCard('Total users');

    this.trendsSection = this.section('Trends');
    this.trendRangeButtons = this.trendsSection.getByRole('button');
    this.revenueSection = this.section('Revenue');
    this.generationsSection = this.section('Generations');
    this.creditLedgerSection = this.section('Credit ledger');
    this.engagementSection = this.section('Engagement');
  }

  tab(tab: ReportTab): Locator {
    return this.page.getByRole('button', { name: tab });
  }

  trendRangeButton(range: TrendRange): Locator {
    return this.trendsSection.getByRole('button', { name: range });
  }

  trendChartTitle(title: string): Locator {
    return this.trendsSection.getByText(title, { exact: true });
  }

  /** Stat tile = its label <p> wrapped one level up in the bordered card div. */
  private statCard(label: string): Locator {
    return this.page.getByText(label, { exact: true }).first().locator('xpath=ancestor::div[1]');
  }

  /** A labelled section (e.g. "Trends", "Revenue") below the top stat-tile grid. */
  private section(title: string): Locator {
    return this.page
      .getByRole('heading', { name: title, exact: true })
      .locator('xpath=ancestor::section[1]');
  }
}
