import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object for the shared chrome (sidebar + topbar) present on every
 * authenticated admin page — brand, nav groups, nav links, language
 * selector, theme toggle, log out.
 */
export class AppShellPage {
  readonly page: Page;

  /** The sidebar <nav aria-label="Admin navigation">. Scope nav-link lookups
   * to this — labels like "Change log" are reused as page-content shortcuts. */
  readonly nav: Locator;

  readonly brandHeading: Locator;
  readonly consoleLabel: Locator;
  readonly themeButton: Locator;
  readonly logoutButton: Locator;
  readonly languageSelect: Locator;

  readonly dashboardNavGroup: Locator;
  readonly contentNavGroup: Locator;
  readonly toolsNavGroup: Locator;
  readonly billingNavGroup: Locator;
  readonly managementNavGroup: Locator;
  readonly settingsNavGroup: Locator;

  readonly overviewLink: Locator;
  readonly dailyReportLink: Locator;
  readonly insightsLink: Locator;
  readonly generationAnalyticsLink: Locator;
  readonly changeLogLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nav = page.getByRole('navigation', { name: 'Admin navigation' });

    this.brandHeading = page.getByRole('heading', { name: 'Snapped Admin' });
    this.consoleLabel = page.getByText('Console', { exact: true });
    this.themeButton = page.getByRole('button', { name: /^Theme:/ });
    this.logoutButton = page.getByRole('button', { name: 'Log out' });
    this.languageSelect = page.getByRole('combobox', { name: 'App language' });

    this.dashboardNavGroup = this.nav.getByRole('button', { name: 'Dashboard', exact: true });
    this.contentNavGroup = this.nav.getByRole('button', { name: 'Content', exact: true });
    this.toolsNavGroup = this.nav.getByRole('button', { name: 'Tools', exact: true });
    this.billingNavGroup = this.nav.getByRole('button', { name: 'Billing', exact: true });
    this.managementNavGroup = this.nav.getByRole('button', { name: 'Management', exact: true });
    this.settingsNavGroup = this.nav.getByRole('button', { name: 'Settings', exact: true });

    this.overviewLink = this.nav.getByRole('link', { name: 'Overview', exact: true });
    this.dailyReportLink = this.nav.getByRole('link', { name: 'Daily Report', exact: true });
    this.insightsLink = this.nav.getByRole('link', { name: 'Insights', exact: true });
    this.generationAnalyticsLink = this.nav.getByRole('link', { name: 'Generation analytics', exact: true });
    this.changeLogLink = this.nav.getByRole('link', { name: 'Change log', exact: true });
  }

  async expandNavGroup(group: Locator) {
    await group.click();
  }
}
