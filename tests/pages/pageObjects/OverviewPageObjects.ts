import type { Locator, Page } from '@playwright/test';

/** Time-range filter shared by the activity tables on the Overview page. */
export type ActivityRange = 'Today' | 'This week' | 'This month' | 'All time';

/** Keys of {@link OverviewPageObjects.ctaLinks}. */
export type OverviewCta =
  | 'viewUsers'
  | 'openImageJobs'
  | 'reviewFailures'
  | 'viewOperations'
  | 'managePlans'
  | 'configureWelcomeAiCredits'
  | 'manageCreditPacks'
  | 'configureGenerationCosts'
  | 'configureReferralRewards'
  | 'manageImageTemplates'
  | 'manageVideoTemplates'
  | 'manageTranslations';

/** Shortcut link labels in the SHORTCUTS section. */
export type OverviewShortcut = 'Change log' | 'Page schemas' | 'Image job queue' | 'Video workflow queue';

/**
 * Locators for Dashboard → Overview (/admin/dashboard).
 */
export class OverviewPageObjects {
  readonly page: Page;
  readonly heading: Locator;
  /** The <h1> of whatever page is currently shown — used after CTA navigation. */
  readonly pageH1: Locator;

  // OVERVIEW stat cards
  readonly usersCard: Locator;
  readonly jobsInProgressCard: Locator;
  readonly failedGenerationsCard: Locator;
  readonly successfulGenerationsCard: Locator;
  readonly billingPlansCard: Locator;
  readonly welcomeAiCreditsCard: Locator;
  readonly creditPacksCard: Locator;
  readonly generationCostsCard: Locator;
  readonly referralRewardsCard: Locator;

  // TEMPLATES
  readonly imageTemplatesCard: Locator;
  readonly videoTemplatesCard: Locator;

  // Activity tables (each has its own Today/This week/This month/All time filter)
  readonly contentTeamActivitySection: Locator;
  readonly contentTeamActivityHeaders: Locator;
  readonly contentTeamActivityFilters: Locator;
  readonly reviewerActivitySection: Locator;
  readonly reviewerActivityHeaders: Locator;
  readonly reviewerActivityFilters: Locator;

  // CONTENT STRUCTURE
  readonly categoriesCard: Locator;
  readonly subcategoriesCard: Locator;
  readonly tagsCard: Locator;

  // TRANSLATIONS & COPY (translationKeysCard is the tile; translationsSection
  // also covers the breakdown rows below it — Fully localized, Missing
  // English, per-locale gaps, and the "Manage translations" link)
  readonly translationKeysCard: Locator;
  readonly translationsSection: Locator;

  // SHORTCUTS
  readonly shortcutsSection: Locator;
  readonly shortcutLinks: Locator;

  /** Every card/section CTA link, scoped to its own card. */
  readonly ctaLinks: Record<OverviewCta, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.pageH1 = page.locator('h1');

    this.usersCard = this.statCard('Users');
    this.jobsInProgressCard = this.statCard('Jobs in progress');
    this.failedGenerationsCard = this.statCard('Failed generations');
    this.successfulGenerationsCard = this.statCard('Successful generations');
    this.billingPlansCard = this.statCard('Billing plans');
    this.welcomeAiCreditsCard = this.statCard('Welcome AI credits');
    this.creditPacksCard = this.statCard('Credit packs');
    this.generationCostsCard = this.statCard('Generation costs');
    this.referralRewardsCard = this.statCard('Referral rewards');

    this.imageTemplatesCard = this.statCard('Image templates');
    this.videoTemplatesCard = this.statCard('Video templates');

    this.contentTeamActivitySection = this.section('Content team activity');
    this.contentTeamActivityHeaders = this.contentTeamActivitySection.locator('th');
    this.contentTeamActivityFilters = this.contentTeamActivitySection.getByRole('button');
    this.reviewerActivitySection = this.section('Reviewer activity');
    this.reviewerActivityHeaders = this.reviewerActivitySection.locator('th');
    this.reviewerActivityFilters = this.reviewerActivitySection.getByRole('button');

    this.categoriesCard = this.statCard('Categories');
    this.subcategoriesCard = this.statCard('Subcategories');
    this.tagsCard = this.statCard('Tags');

    this.translationKeysCard = this.statCard('Translation keys');
    this.translationsSection = this.section('Translations & copy');

    this.shortcutsSection = this.section('Shortcuts');
    this.shortcutLinks = this.shortcutsSection.getByRole('link');

    this.ctaLinks = {
      viewUsers: this.usersCard.getByRole('link', { name: 'View users' }),
      openImageJobs: this.jobsInProgressCard.getByRole('link', { name: 'Open image jobs' }),
      reviewFailures: this.failedGenerationsCard.getByRole('link', { name: 'Review failures' }),
      viewOperations: this.successfulGenerationsCard.getByRole('link', { name: 'View operations' }),
      managePlans: this.billingPlansCard.getByRole('link', { name: 'Manage plans' }),
      configureWelcomeAiCredits: this.welcomeAiCreditsCard.getByRole('link', { name: 'Configure' }),
      manageCreditPacks: this.creditPacksCard.getByRole('link', { name: 'Manage packs' }),
      configureGenerationCosts: this.generationCostsCard.getByRole('link', { name: 'Configure' }),
      configureReferralRewards: this.referralRewardsCard.getByRole('link', { name: 'Configure' }),
      manageImageTemplates: this.imageTemplatesCard.getByRole('link', { name: 'Manage templates' }),
      manageVideoTemplates: this.videoTemplatesCard.getByRole('link', { name: 'Manage templates' }),
      manageTranslations: this.translationsSection.getByRole('link', { name: 'Manage translations' }),
    };
  }

  /** A top-level section heading (e.g. "Templates", "Shortcuts"). */
  sectionHeading(title: string): Locator {
    return this.page.getByRole('heading', { name: title, exact: true });
  }

  contentTeamActivityFilter(range: ActivityRange): Locator {
    return this.contentTeamActivitySection.getByRole('button', { name: range });
  }

  reviewerActivityFilter(range: ActivityRange): Locator {
    return this.reviewerActivitySection.getByRole('button', { name: range });
  }

  shortcutLink(label: OverviewShortcut): Locator {
    return this.shortcutsSection.getByRole('link', { name: label });
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
    return this.sectionHeading(title).locator('xpath=ancestor::section[1]');
  }
}
