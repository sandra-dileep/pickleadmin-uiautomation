import { expect, type Page } from '@playwright/test';
import {
  OverviewPageObjects,
  type ActivityRange,
  type OverviewCta,
  type OverviewShortcut,
} from '../pageObjects/OverviewPageObjects';

/**
 * Interactions with Dashboard → Overview (/admin/dashboard).
 * Locators live in {@link OverviewPageObjects}.
 */
export class OverviewPageActions {
  readonly page: Page;
  private readonly overview: OverviewPageObjects;

  constructor(page: Page) {
    this.page = page;
    this.overview = new OverviewPageObjects(page);
  }

  async goto() {
    await this.page.goto('/admin/dashboard');
    await expect(this.overview.heading).toBeVisible();
  }

  /** Switch the time range on the Content team activity table. */
  async filterContentTeamActivity(range: ActivityRange) {
    await this.overview.contentTeamActivityFilter(range).click();
  }

  /** Switch the time range on the Reviewer activity table. */
  async filterReviewerActivity(range: ActivityRange) {
    await this.overview.reviewerActivityFilter(range).click();
  }

  async clickCta(cta: OverviewCta) {
    await this.overview.ctaLinks[cta].click();
  }

  async clickShortcut(label: OverviewShortcut) {
    await this.overview.shortcutLink(label).click();
  }
}
