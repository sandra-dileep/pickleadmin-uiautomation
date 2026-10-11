import { expect, type Locator, type Page } from '@playwright/test';

/** Time-range filter shared by the activity tables on the Overview page. */
export type ActivityRange = 'Today' | 'This week' | 'This month' | 'All time';

/**
 * Page Object for Dashboard → Overview (/admin/dashboard).
 */
export class OverviewPage {
  readonly page: Page;
  readonly heading: Locator;

  // OVERVIEW stat cards
  readonly usersCard: Locator;
  readonly jobsInProgressCard: Locator;
  readonly failedGenerationsCard: Locator;
  readonly successfulGenerationsCard: Locator;
  readonly billingPlansCard: Locator;

  // TEMPLATES
  readonly imageTemplatesCard: Locator;
  readonly videoTemplatesCard: Locator;

  // Activity tables (each has its own Today/This week/This month/All time filter)
  readonly contentTeamActivitySection: Locator;
  readonly reviewerActivitySection: Locator;

  // CONTENT STRUCTURE
  readonly categoriesCard: Locator;
  readonly subcategoriesCard: Locator;
  readonly tagsCard: Locator;

  // TRANSLATIONS & COPY
  readonly translationKeysCard: Locator;

  // SHORTCUTS
  readonly shortcutsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard' });

    this.usersCard = this.statCard('Users');
    this.jobsInProgressCard = this.statCard('Jobs in progress');
    this.failedGenerationsCard = this.statCard('Failed generations');
    this.successfulGenerationsCard = this.statCard('Successful generations');
    this.billingPlansCard = this.statCard('Billing plans');

    this.imageTemplatesCard = this.statCard('Image templates');
    this.videoTemplatesCard = this.statCard('Video templates');

    this.contentTeamActivitySection = this.section('Content team activity');
    this.reviewerActivitySection = this.section('Reviewer activity');

    this.categoriesCard = this.statCard('Categories');
    this.subcategoriesCard = this.statCard('Subcategories');
    this.tagsCard = this.statCard('Tags');

    this.translationKeysCard = this.statCard('Translation keys');

    this.shortcutsSection = this.section('Shortcuts');
  }

  async goto() {
    await this.page.goto('/admin/dashboard');
    await expect(this.heading).toBeVisible();
  }

  /**
   * A stat tile is identified by its own label text (e.g. "Users", "Jobs in
   * progress"). Labels are plain <span>s, not headings — the card is their
   * closest bordered container two levels up (label -> icon/label row -> card).
   */
  private statCard(title: string): Locator {
    // .first(): a few small tiles (Categories/Subcategories/Tags) repeat
    // their label as a caption under the number too.
    return this.page.getByText(title, { exact: true }).first().locator('xpath=ancestor::div[2]');
  }

  /** A labelled section (e.g. "Content team activity") containing its own filters/table. */
  private section(title: string): Locator {
    return this.page
      .getByRole('heading', { name: title, exact: true })
      .locator('xpath=ancestor::section[1]');
  }

  /** Switch the time range on the Content team activity table. */
  async filterContentTeamActivity(range: ActivityRange) {
    await this.contentTeamActivitySection.getByRole('button', { name: range }).click();
  }

  /** Switch the time range on the Reviewer activity table. */
  async filterReviewerActivity(range: ActivityRange) {
    await this.reviewerActivitySection.getByRole('button', { name: range }).click();
  }

  async clickShortcut(label: string) {
    await this.shortcutsSection.getByRole('link', { name: label }).click();
  }
}
