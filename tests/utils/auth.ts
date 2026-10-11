/**
 * Path to the saved storage state from tests/fixtures/auth.setup.ts.
 * Protected specs opt in with:
 *   test.use({ storageState: AUTH_FILE });
 * (declared per-file rather than in playwright.config.ts's project `use` —
 * project-level storageState merging did not reliably restore this app's
 * cross-subdomain session cookie; this explicit per-file form does.)
 */
export const AUTH_FILE = 'playwright/.auth/user.json';
