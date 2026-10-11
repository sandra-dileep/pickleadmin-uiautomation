import { test, expect } from '../../fixtures/base';
import { AUTH_FILE } from '../../utils/auth';
import { OverviewPage } from '../../pages/OverviewPage';

test.describe('Overview', () => {
  // Scoped to this describe block only — OV-09 below needs a clean session.
  test.use({ storageState: AUTH_FILE });

  let overview: OverviewPage;

  test.beforeEach(async ({ page }) => {
    overview = new OverviewPage(page);
    await overview.goto();
  });

  // OV-01
  test('loads with all sections', async ({ page }) => {
    await expect(overview.heading).toBeVisible();
    for (const title of [
      'Content team activity',
      'Reviewer activity',
      'Content structure',
      'Translations & copy',
      'Shortcuts',
    ]) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
  });

  // OV-02
  test('OVERVIEW stat cards show data', async () => {
    for (const card of [
      overview.usersCard,
      overview.jobsInProgressCard,
      overview.failedGenerationsCard,
      overview.successfulGenerationsCard,
      overview.billingPlansCard,
    ]) {
      await expect(card).toBeVisible();
      await expect(card).toContainText(/\d/);
    }
  });

  // OV-03
  test('TEMPLATES cards show data', async () => {
    await expect(overview.imageTemplatesCard).toContainText(/\d/);
    await expect(overview.imageTemplatesCard).toContainText('Live (active)');
    await expect(overview.imageTemplatesCard).toContainText('Inactive');

    await expect(overview.videoTemplatesCard).toContainText(/\d/);
    await expect(overview.videoTemplatesCard).toContainText('Live (active)');
    await expect(overview.videoTemplatesCard).toContainText('Inactive');
  });

  // OV-04
  test('Content team activity — filter by range', async () => {
    for (const range of ['Today', 'This week', 'This month', 'All time'] as const) {
      await overview.filterContentTeamActivity(range);
      await expect(
        overview.contentTeamActivitySection.getByRole('button', { name: range })
      ).toBeVisible();
    }
  });

  // OV-05
  test('Reviewer activity — filter by range, independent of content team filter', async () => {
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

  // OV-06
  test('Content structure cards show data', async () => {
    for (const card of [overview.categoriesCard, overview.subcategoriesCard, overview.tagsCard]) {
      await expect(card).toContainText(/\d/);
    }
  });

  // OV-07
  test('Translations & copy card shows data', async () => {
    await expect(overview.translationKeysCard).toContainText(/\d/);
  });

  // OV-08
  test('Shortcuts links are present', async () => {
    for (const label of ['Change log', 'Page schemas', 'Image job queue', 'Video workflow queue']) {
      await expect(overview.shortcutsSection.getByRole('link', { name: label })).toBeVisible();
    }
  });
});

// OV-09 — deliberately outside the authenticated describe block above.
test('unauthenticated access shows login, not dashboard', async ({ page }) => {
  await page.goto('/admin/dashboard');
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).not.toBeVisible();
});
