import { expect, type Locator, type Page } from '@playwright/test';

export type TrendRange = '7 days' | '30 days' | '90 days';
export type ReportTab = 'Pickle it' | 'Pickle Daily';

/**
 * Page Object for Dashboard → Daily Report (/admin/daily-report).
 */
export class DailyReportPage {
  readonly page: Page;
  readonly heading: Locator;

  // Top controls
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
  readonly revenueSection: Locator;
  readonly generationsSection: Locator;
  readonly creditLedgerSection: Locator;
  readonly engagementSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Daily report' });

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
    this.revenueSection = this.section('Revenue');
    this.generationsSection = this.section('Generations');
    this.creditLedgerSection = this.section('Credit ledger');
    this.engagementSection = this.section('Engagement');
  }

  async goto() {
    await this.page.goto('/admin/daily-report');
    await expect(this.heading).toBeVisible();
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

  async selectTab(tab: ReportTab) {
    await this.page.getByRole('button', { name: tab }).click();
  }

  async selectTrendRange(range: TrendRange) {
    await this.trendsSection.getByRole('button', { name: range }).click();
  }

  async toggleIncludeInternalUsers() {
    await this.includeInternalUsersCheckbox.click();
  }

  async goToYesterday() {
    await this.yesterdayButton.click();
  }
}
