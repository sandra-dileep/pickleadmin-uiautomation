import { expect, type Page } from '@playwright/test';
import {
  DailyReportPageObjects,
  type ReportTab,
  type TrendRange,
} from '../pageObjects/DailyReportPageObjects';

/**
 * Interactions with Dashboard → Daily Report (/admin/daily-report).
 * Locators live in {@link DailyReportPageObjects}.
 */
export class DailyReportPageActions {
  readonly page: Page;
  private readonly report: DailyReportPageObjects;

  constructor(page: Page) {
    this.page = page;
    this.report = new DailyReportPageObjects(page);
  }

  async goto() {
    await this.page.goto('/admin/daily-report');
    await expect(this.report.heading).toBeVisible();
  }

  async selectTab(tab: ReportTab) {
    await this.report.tab(tab).click();
  }

  async selectTrendRange(range: TrendRange) {
    await this.report.trendRangeButton(range).click();
  }

  async toggleIncludeInternalUsers() {
    await this.report.includeInternalUsersCheckbox.click();
  }

  async goToYesterday() {
    await this.report.yesterdayButton.click();
  }

  /** Text of the first "Reporting YYYY-MM-DD ..." line — the selected date. */
  async getReportingDateText(): Promise<string> {
    return this.report.reportingDateText.innerText();
  }
}
