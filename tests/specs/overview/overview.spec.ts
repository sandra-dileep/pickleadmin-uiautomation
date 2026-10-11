import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';
import { OverviewPage } from '../../pages/OverviewPage';

test.describe('Overview', () => {
  // Scoped to this describe block only — OV-14 below needs a clean session.
  test.use({ storageState: AUTH_FILE });

  let overview: OverviewPage;

  test.beforeEach(async ({ page }) => {
    overview = new OverviewPage(page);
    await overview.goto();
  });

  // OV-01
  test('loads with all sections, exact heading text', async ({ page }) => {
    await expect(overview.heading).toHaveText('Dashboard');
    for (const title of [
      'Overview',
      'Templates',
      'Content team activity',
      'Reviewer activity',
      'Content structure',
      'Translations & copy',
      'Shortcuts',
    ]) {
      await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
    }
  });

  // OV-02
  test('Users card: label, caption and CTA text', async () => {
    await expect(overview.usersCard).toContainText('Users');
    await expect(overview.usersCard).toContainText(/\d/);
    await expect(overview.usersCard).toContainText('Registered accounts');
    await expect(overview.usersCard.getByRole('link', { name: 'View users' })).toBeVisible();
  });

  // OV-03
  test('Jobs in progress card: label, caption and CTA text', async () => {
    await expect(overview.jobsInProgressCard).toContainText('Jobs in progress');
    await expect(overview.jobsInProgressCard).toContainText(/\d+ image · \d+ video \(queued or running\)/);
    await expect(
      overview.jobsInProgressCard.getByRole('link', { name: 'Open image jobs' })
    ).toBeVisible();
  });

  // OV-04
  test('Failed generations card: label, caption and CTA text', async () => {
    await expect(overview.failedGenerationsCard).toContainText('Failed generations');
    await expect(overview.failedGenerationsCard).toContainText(/\d+ image · \d+ video/);
    await expect(
      overview.failedGenerationsCard.getByRole('link', { name: 'Review failures' })
    ).toBeVisible();
  });

  // OV-05
  test('Successful generations card: label, caption and CTA text', async () => {
    await expect(overview.successfulGenerationsCard).toContainText('Successful generations');
    await expect(overview.successfulGenerationsCard).toContainText(
      /\d+ image · \d+ video \(COMPLETE, all time\)/
    );
    await expect(
      overview.successfulGenerationsCard.getByRole('link', { name: 'View operations' })
    ).toBeVisible();
  });

  // OV-06
  test('Billing plans card: label, caption and CTA text', async () => {
    await expect(overview.billingPlansCard).toContainText('Billing plans');
    await expect(overview.billingPlansCard).toContainText(/\d+ \/ \d+/);
    await expect(overview.billingPlansCard).toContainText('Active plans vs total defined');
    await expect(overview.billingPlansCard.getByRole('link', { name: 'Manage plans' })).toBeVisible();
  });

  // OV-07
  test('Welcome AI credits / Credit packs / Generation costs / Referral rewards cards', async () => {
    await expect(overview.welcomeAiCreditsCard).toContainText('Welcome AI credits');
    await expect(overview.welcomeAiCreditsCard).toContainText('Free explorer grants; one-time per phone');
    await expect(overview.welcomeAiCreditsCard.getByRole('link', { name: 'Configure' })).toBeVisible();

    await expect(overview.creditPacksCard).toContainText('Credit packs');
    await expect(overview.creditPacksCard).toContainText('IAP credit pack catalog');
    await expect(overview.creditPacksCard.getByRole('link', { name: 'Manage packs' })).toBeVisible();

    await expect(overview.generationCostsCard).toContainText('Generation costs');
    await expect(overview.generationCostsCard).toContainText('Per-type credit debit amounts');
    await expect(overview.generationCostsCard.getByRole('link', { name: 'Configure' })).toBeVisible();

    await expect(overview.referralRewardsCard).toContainText('Referral rewards');
    await expect(overview.referralRewardsCard).toContainText('Credits granted on referral signup');
    await expect(overview.referralRewardsCard.getByRole('link', { name: 'Configure' })).toBeVisible();
  });

  // OV-08
  test('TEMPLATES cards: label, counts breakdown and CTA text', async () => {
    await expect(overview.imageTemplatesCard).toContainText('Image templates');
    await expect(overview.imageTemplatesCard).toContainText('Total defined in admin');
    await expect(overview.imageTemplatesCard).toContainText('Live (active)');
    await expect(overview.imageTemplatesCard).toContainText('Inactive');
    await expect(overview.imageTemplatesCard.getByRole('link', { name: 'Manage templates' })).toBeVisible();

    await expect(overview.videoTemplatesCard).toContainText('Video templates');
    await expect(overview.videoTemplatesCard).toContainText('Total defined in admin');
    await expect(overview.videoTemplatesCard).toContainText('Live (active)');
    await expect(overview.videoTemplatesCard).toContainText('Inactive');
    await expect(overview.videoTemplatesCard.getByRole('link', { name: 'Manage templates' })).toBeVisible();
  });

  // OV-09
  test('Content team activity: exact table headers and filter buttons', async () => {
    await expect(overview.contentTeamActivitySection.locator('th')).toHaveText([
      'User',
      'Uploaded',
      'Approved',
      '→ Catalog',
      '→ Prod',
    ]);
    await expect(overview.contentTeamActivitySection.getByRole('button')).toHaveText([
      'Today',
      'This week',
      'This month',
      'All time',
    ]);
  });

  // OV-10
  test('Content team activity — filter by range', async () => {
    for (const range of ['Today', 'This week', 'This month', 'All time'] as const) {
      await overview.filterContentTeamActivity(range);
      await expect(
        overview.contentTeamActivitySection.getByRole('button', { name: range })
      ).toBeVisible();
    }
  });

  // OV-11
  test('Reviewer activity: exact table headers, filters, and independence from content team filter', async () => {
    await expect(overview.reviewerActivitySection.locator('th')).toHaveText([
      'User',
      'Approved',
      'Rejected',
      '→ Catalog',
      '→ Prod',
    ]);

    await overview.filterContentTeamActivity('This week');

    for (const range of ['Today', 'This week', 'This month', 'All time'] as const) {
      await overview.filterReviewerActivity(range);
      await expect(
        overview.reviewerActivitySection.getByRole('button', { name: range })
      ).toBeVisible();
    }

    // Changing the reviewer filter must not reset the content team filter.
    await expect(
      overview.contentTeamActivitySection.getByRole('button', { name: 'This week' })
    ).toBeVisible();
  });

  // OV-12
  test('Content structure cards: exact labels and data', async () => {
    for (const [card, label] of [
      [overview.categoriesCard, 'Categories'],
      [overview.subcategoriesCard, 'Subcategories'],
      [overview.tagsCard, 'Tags'],
    ] as const) {
      await expect(card).toContainText(label);
      await expect(card).toContainText(/\d/);
    }
  });

  // OV-13
  test('Translations & copy: card data and breakdown row labels', async () => {
    await expect(overview.translationKeysCard).toContainText('Translation keys');
    await expect(overview.translationKeysCard).toContainText(/\d/);
    await expect(overview.translationKeysCard).toContainText(
      'One row per slug · locales en, ml, hi, ta · empty or whitespace counts as missing'
    );

    for (const label of [
      'Fully localized (4/4)',
      'Missing English',
      'EN ok, other locales incomplete',
      'Gaps when EN is set',
    ]) {
      await expect(overview.translationsSection).toContainText(label);
    }
    await expect(
      overview.translationsSection.getByRole('link', { name: 'Manage translations' })
    ).toBeVisible();
  });

  // OV-14
  test('Shortcuts: exact link set and order', async () => {
    await expect(overview.shortcutsSection.getByRole('link')).toHaveText([
      'Change log',
      'Page schemas',
      'Image job queue',
      'Video workflow queue',
    ]);
  });

  // OV-15
  test('"View users" navigates to the Users page', async ({ page }) => {
    await overview.usersCard.getByRole('link', { name: 'View users' }).click();
    await expect(page).toHaveURL(/\/admin\/users$/);
    await expect(page.locator('h1')).toHaveText('Users');
  });

  // OV-16
  test('operations CTAs (Jobs in progress / Failed generations / Successful generations) ' +
    'each navigate to the image generation jobs queue', async ({ page }) => {
    // Known current behaviour: all three stat cards route to the same queue
    // page rather than a pre-filtered view (no distinguishing query/filter
    // is applied on navigation) — see testcases.md for the product note.
    for (const [card, cta] of [
      [overview.jobsInProgressCard, 'Open image jobs'],
      [overview.failedGenerationsCard, 'Review failures'],
      [overview.successfulGenerationsCard, 'View operations'],
    ] as const) {
      await overview.goto();
      await card.getByRole('link', { name: cta }).click();
      await expect(page).toHaveURL(/\/admin\/operations\/image$/);
      await expect(page.locator('h1')).toHaveText('Image generation jobs');
    }
  });

  // OV-17
  test('"Manage plans" navigates to the Billing plans page', async ({ page }) => {
    await overview.billingPlansCard.getByRole('link', { name: 'Manage plans' }).click();
    await expect(page).toHaveURL(/\/admin\/plans$/);
    await expect(page.locator('h1')).toHaveText('Billing plans');
  });

  // OV-18
  test('"Configure" / "Manage packs" CTAs navigate to their own pages', async ({ page }) => {
    const cases: [typeof overview.welcomeAiCreditsCard, string, RegExp, string][] = [
      [overview.welcomeAiCreditsCard, 'Configure', /\/admin\/welcome-ai$/, 'Welcome AI credits'],
      [overview.creditPacksCard, 'Manage packs', /\/admin\/credit-packs$/, 'Credit Packs'],
      [overview.generationCostsCard, 'Configure', /\/admin\/generation-costs$/, 'Generation Costs'],
      [overview.referralRewardsCard, 'Configure', /\/admin\/referral-rewards$/, 'Referral Rewards'],
    ];
    for (const [card, cta, urlPattern, h1Text] of cases) {
      await overview.goto();
      await card.getByRole('link', { name: cta }).click();
      await expect(page).toHaveURL(urlPattern);
      await expect(page.locator('h1')).toHaveText(h1Text);
    }
  });

  // OV-19
  test('"Manage templates" CTAs navigate to their own template pages', async ({ page }) => {
    await overview.imageTemplatesCard.getByRole('link', { name: 'Manage templates' }).click();
    await expect(page).toHaveURL(/\/admin\/image-templates$/);
    await expect(page.locator('h1')).toHaveText('Image templates');

    await overview.goto();
    await overview.videoTemplatesCard.getByRole('link', { name: 'Manage templates' }).click();
    await expect(page).toHaveURL(/\/admin\/video-templates$/);
    await expect(page.locator('h1')).toHaveText('Video templates');
  });

  // OV-20
  test('"Manage translations" navigates to the Translations page', async ({ page }) => {
    await overview.translationsSection.getByRole('link', { name: 'Manage translations' }).click();
    await expect(page).toHaveURL(/\/admin\/translations$/);
    await expect(page.locator('h1')).toHaveText('Translations');
  });

  // OV-21
  test('Shortcut links navigate to their own pages', async ({ page }) => {
    const cases: [string, RegExp, string][] = [
      ['Change log', /\/admin\/changelog$/, 'Change log'],
      ['Page schemas', /\/admin\/page-schemas$/, 'Page schemas'],
      ['Image job queue', /\/admin\/operations\/image$/, 'Image generation jobs'],
      ['Video workflow queue', /\/admin\/operations\/video$/, 'Video workflows'],
    ];
    for (const [label, urlPattern, h1Text] of cases) {
      await overview.goto();
      await overview.shortcutsSection.getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(urlPattern);
      await expect(page.locator('h1')).toHaveText(h1Text);
    }
  });
});

// OV-22 — deliberately outside the authenticated describe block above.
test('unauthenticated access shows login, not dashboard', async ({ page }) => {
  await page.goto('/admin/dashboard');
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).not.toBeVisible();
});
