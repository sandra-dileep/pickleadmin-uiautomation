import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';
import type { OverviewCta, OverviewShortcut } from '../../pages/pageObjects/OverviewPageObjects';

test.describe('Overview', () => {
  // Scoped to this describe block only — OV-22 below needs a clean session.
  test.use({ storageState: AUTH_FILE });

  test.beforeEach(async ({ overviewActions }) => {
    await overviewActions.goto();
  });

  // OV-01
  test('loads with all sections, exact heading text', async ({ overviewPage }) => {
    await expect(overviewPage.heading).toHaveText('Dashboard');
    for (const title of [
      'Overview',
      'Templates',
      'Content team activity',
      'Reviewer activity',
      'Content structure',
      'Translations & copy',
      'Shortcuts',
    ]) {
      await expect(overviewPage.sectionHeading(title)).toBeVisible();
    }
  });

  // OV-02
  test('Users card: label, caption and CTA text', async ({ overviewPage }) => {
    await expect(overviewPage.usersCard).toContainText('Users');
    await expect(overviewPage.usersCard).toContainText(/\d/);
    await expect(overviewPage.usersCard).toContainText('Registered accounts');
    await expect(overviewPage.ctaLinks.viewUsers).toBeVisible();
  });

  // OV-03
  test('Jobs in progress card: label, caption and CTA text', async ({ overviewPage }) => {
    await expect(overviewPage.jobsInProgressCard).toContainText('Jobs in progress');
    await expect(overviewPage.jobsInProgressCard).toContainText(/\d+ image · \d+ video \(queued or running\)/);
    await expect(overviewPage.ctaLinks.openImageJobs).toBeVisible();
  });

  // OV-04
  test('Failed generations card: label, caption and CTA text', async ({ overviewPage }) => {
    await expect(overviewPage.failedGenerationsCard).toContainText('Failed generations');
    await expect(overviewPage.failedGenerationsCard).toContainText(/\d+ image · \d+ video/);
    await expect(overviewPage.ctaLinks.reviewFailures).toBeVisible();
  });

  // OV-05
  test('Successful generations card: label, caption and CTA text', async ({ overviewPage }) => {
    await expect(overviewPage.successfulGenerationsCard).toContainText('Successful generations');
    await expect(overviewPage.successfulGenerationsCard).toContainText(
      /\d+ image · \d+ video \(COMPLETE, all time\)/
    );
    await expect(overviewPage.ctaLinks.viewOperations).toBeVisible();
  });

  // OV-06
  test('Billing plans card: label, caption and CTA text', async ({ overviewPage }) => {
    await expect(overviewPage.billingPlansCard).toContainText('Billing plans');
    await expect(overviewPage.billingPlansCard).toContainText(/\d+ \/ \d+/);
    await expect(overviewPage.billingPlansCard).toContainText('Active plans vs total defined');
    await expect(overviewPage.ctaLinks.managePlans).toBeVisible();
  });

  // OV-07
  test('Welcome AI credits / Credit packs / Generation costs / Referral rewards cards', async ({
    overviewPage,
  }) => {
    await expect(overviewPage.welcomeAiCreditsCard).toContainText('Welcome AI credits');
    await expect(overviewPage.welcomeAiCreditsCard).toContainText('Free explorer grants; one-time per phone');
    await expect(overviewPage.ctaLinks.configureWelcomeAiCredits).toBeVisible();

    await expect(overviewPage.creditPacksCard).toContainText('Credit packs');
    await expect(overviewPage.creditPacksCard).toContainText('IAP credit pack catalog');
    await expect(overviewPage.ctaLinks.manageCreditPacks).toBeVisible();

    await expect(overviewPage.generationCostsCard).toContainText('Generation costs');
    await expect(overviewPage.generationCostsCard).toContainText('Per-type credit debit amounts');
    await expect(overviewPage.ctaLinks.configureGenerationCosts).toBeVisible();

    await expect(overviewPage.referralRewardsCard).toContainText('Referral rewards');
    await expect(overviewPage.referralRewardsCard).toContainText('Credits granted on referral signup');
    await expect(overviewPage.ctaLinks.configureReferralRewards).toBeVisible();
  });

  // OV-08
  test('TEMPLATES cards: label, counts breakdown and CTA text', async ({ overviewPage }) => {
    await expect(overviewPage.imageTemplatesCard).toContainText('Image templates');
    await expect(overviewPage.imageTemplatesCard).toContainText('Total defined in admin');
    await expect(overviewPage.imageTemplatesCard).toContainText('Live (active)');
    await expect(overviewPage.imageTemplatesCard).toContainText('Inactive');
    await expect(overviewPage.ctaLinks.manageImageTemplates).toBeVisible();

    await expect(overviewPage.videoTemplatesCard).toContainText('Video templates');
    await expect(overviewPage.videoTemplatesCard).toContainText('Total defined in admin');
    await expect(overviewPage.videoTemplatesCard).toContainText('Live (active)');
    await expect(overviewPage.videoTemplatesCard).toContainText('Inactive');
    await expect(overviewPage.ctaLinks.manageVideoTemplates).toBeVisible();
  });

  // OV-09
  test('Content team activity: exact table headers and filter buttons', async ({ overviewPage }) => {
    await expect(overviewPage.contentTeamActivityHeaders).toHaveText([
      'User',
      'Uploaded',
      'Approved',
      '→ Catalog',
      '→ Prod',
    ]);
    await expect(overviewPage.contentTeamActivityFilters).toHaveText([
      'Today',
      'This week',
      'This month',
      'All time',
    ]);
  });

  // OV-10
  test('Content team activity — filter by range', async ({ overviewPage, overviewActions }) => {
    for (const range of ['Today', 'This week', 'This month', 'All time'] as const) {
      await overviewActions.filterContentTeamActivity(range);
      await expect(overviewPage.contentTeamActivityFilter(range)).toBeVisible();
    }
  });

  // OV-11
  test('Reviewer activity: exact table headers, filters, and independence from content team filter', async ({
    overviewPage,
    overviewActions,
  }) => {
    await expect(overviewPage.reviewerActivityHeaders).toHaveText([
      'User',
      'Approved',
      'Rejected',
      '→ Catalog',
      '→ Prod',
    ]);

    await overviewActions.filterContentTeamActivity('This week');

    for (const range of ['Today', 'This week', 'This month', 'All time'] as const) {
      await overviewActions.filterReviewerActivity(range);
      await expect(overviewPage.reviewerActivityFilter(range)).toBeVisible();
    }

    // Changing the reviewer filter must not reset the content team filter.
    await expect(overviewPage.contentTeamActivityFilter('This week')).toBeVisible();
  });

  // OV-12
  test('Content structure cards: exact labels and data', async ({ overviewPage }) => {
    for (const [card, label] of [
      [overviewPage.categoriesCard, 'Categories'],
      [overviewPage.subcategoriesCard, 'Subcategories'],
      [overviewPage.tagsCard, 'Tags'],
    ] as const) {
      await expect(card).toContainText(label);
      await expect(card).toContainText(/\d/);
    }
  });

  // OV-13
  test('Translations & copy: card data and breakdown row labels', async ({ overviewPage }) => {
    await expect(overviewPage.translationKeysCard).toContainText('Translation keys');
    await expect(overviewPage.translationKeysCard).toContainText(/\d/);
    await expect(overviewPage.translationKeysCard).toContainText(
      'One row per slug · locales en, ml, hi, ta · empty or whitespace counts as missing'
    );

    for (const label of [
      'Fully localized (4/4)',
      'Missing English',
      'EN ok, other locales incomplete',
      'Gaps when EN is set',
    ]) {
      await expect(overviewPage.translationsSection).toContainText(label);
    }
    await expect(overviewPage.ctaLinks.manageTranslations).toBeVisible();
  });

  // OV-14
  test('Shortcuts: exact link set and order', async ({ overviewPage }) => {
    await expect(overviewPage.shortcutLinks).toHaveText([
      'Change log',
      'Page schemas',
      'Image job queue',
      'Video workflow queue',
    ]);
  });

  // OV-15
  test('"View users" navigates to the Users page', async ({ page, overviewPage, overviewActions }) => {
    await overviewActions.clickCta('viewUsers');
    await expect(page).toHaveURL(/\/admin\/users$/);
    await expect(overviewPage.pageH1).toHaveText('Users');
  });

  // OV-16
  test('operations CTAs (Jobs in progress / Failed generations / Successful generations) ' +
    'each navigate to the image generation jobs queue', async ({ page, overviewPage, overviewActions }) => {
    // Known current behaviour: all three stat cards route to the same queue
    // page rather than a pre-filtered view (no distinguishing query/filter
    // is applied on navigation) — see testcases.md for the product note.
    for (const cta of ['openImageJobs', 'reviewFailures', 'viewOperations'] as const) {
      await overviewActions.goto();
      await overviewActions.clickCta(cta);
      await expect(page).toHaveURL(/\/admin\/operations\/image$/);
      await expect(overviewPage.pageH1).toHaveText('Image generation jobs');
    }
  });

  // OV-17
  test('"Manage plans" navigates to the Billing plans page', async ({ page, overviewPage, overviewActions }) => {
    await overviewActions.clickCta('managePlans');
    await expect(page).toHaveURL(/\/admin\/plans$/);
    await expect(overviewPage.pageH1).toHaveText('Billing plans');
  });

  // OV-18
  test('"Configure" / "Manage packs" CTAs navigate to their own pages', async ({
    page,
    overviewPage,
    overviewActions,
  }) => {
    const cases: [OverviewCta, RegExp, string][] = [
      ['configureWelcomeAiCredits', /\/admin\/welcome-ai$/, 'Welcome AI credits'],
      ['manageCreditPacks', /\/admin\/credit-packs$/, 'Credit Packs'],
      ['configureGenerationCosts', /\/admin\/generation-costs$/, 'Generation Costs'],
      ['configureReferralRewards', /\/admin\/referral-rewards$/, 'Referral Rewards'],
    ];
    for (const [cta, urlPattern, h1Text] of cases) {
      await overviewActions.goto();
      await overviewActions.clickCta(cta);
      await expect(page).toHaveURL(urlPattern);
      await expect(overviewPage.pageH1).toHaveText(h1Text);
    }
  });

  // OV-19
  test('"Manage templates" CTAs navigate to their own template pages', async ({
    page,
    overviewPage,
    overviewActions,
  }) => {
    await overviewActions.clickCta('manageImageTemplates');
    await expect(page).toHaveURL(/\/admin\/image-templates$/);
    await expect(overviewPage.pageH1).toHaveText('Image templates');

    await overviewActions.goto();
    await overviewActions.clickCta('manageVideoTemplates');
    await expect(page).toHaveURL(/\/admin\/video-templates$/);
    await expect(overviewPage.pageH1).toHaveText('Video templates');
  });

  // OV-20
  test('"Manage translations" navigates to the Translations page', async ({
    page,
    overviewPage,
    overviewActions,
  }) => {
    await overviewActions.clickCta('manageTranslations');
    await expect(page).toHaveURL(/\/admin\/translations$/);
    await expect(overviewPage.pageH1).toHaveText('Translations');
  });

  // OV-21
  test('Shortcut links navigate to their own pages', async ({ page, overviewPage, overviewActions }) => {
    const cases: [OverviewShortcut, RegExp, string][] = [
      ['Change log', /\/admin\/changelog$/, 'Change log'],
      ['Page schemas', /\/admin\/page-schemas$/, 'Page schemas'],
      ['Image job queue', /\/admin\/operations\/image$/, 'Image generation jobs'],
      ['Video workflow queue', /\/admin\/operations\/video$/, 'Video workflows'],
    ];
    for (const [label, urlPattern, h1Text] of cases) {
      await overviewActions.goto();
      await overviewActions.clickShortcut(label);
      await expect(page).toHaveURL(urlPattern);
      await expect(overviewPage.pageH1).toHaveText(h1Text);
    }
  });
});

// OV-22 — deliberately outside the authenticated describe block above.
test('unauthenticated access shows login, not dashboard', async ({ shellActions, loginPage, overviewPage }) => {
  await shellActions.gotoDashboard();
  await expect(loginPage.welcomeHeading).toBeVisible();
  await expect(overviewPage.heading).not.toBeVisible();
});
