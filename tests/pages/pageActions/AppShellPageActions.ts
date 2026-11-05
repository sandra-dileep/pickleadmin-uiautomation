import type { Locator, Page } from '@playwright/test';
import { AppShellPageObjects } from '../pageObjects/AppShellPageObjects';

/**
 * Interactions with the shared sidebar/topbar chrome.
 * Locators live in {@link AppShellPageObjects}.
 */
export class AppShellPageActions {
  readonly page: Page;
  private readonly shell: AppShellPageObjects;

  constructor(page: Page) {
    this.page = page;
    this.shell = new AppShellPageObjects(page);
  }

  async gotoDashboard() {
    await this.page.goto('/admin/dashboard');
  }

  /** Clicks a nav-group toggle (expands if collapsed, collapses if expanded). */
  async toggleNavGroup(group: Locator) {
    await group.click();
  }

  async openOverview() {
    await this.shell.overviewLink.click();
  }

  async openDailyReport() {
    await this.shell.dailyReportLink.click();
  }

  async logout() {
    await this.shell.logoutButton.click();
  }
}
