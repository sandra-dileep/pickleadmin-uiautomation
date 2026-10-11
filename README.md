# PickleAdmin UI Automation

Playwright + TypeScript framework, Page Object Model + fixtures.

## Setup

```bash
npm install
npx playwright install chromium
cp .env.example .env   # fill in BASE_URL, LOGIN_USERNAME, LOGIN_PASSWORD
```

## Structure

```
tests/
  pages/        Page Object classes (LoginPage, …) — one per screen
  fixtures/
    base.ts       extended `test`/`expect` wiring page objects as fixtures
    auth.setup.ts logs in once via UI, saves storage state for reuse
  specs/        actual test files (*.spec.ts)
  utils/        env.ts and other shared helpers
playwright.config.ts
```

Auth flow: the `setup` project runs `auth.setup.ts` first, logs in through
the real UI once, and saves cookies/localStorage to `playwright/.auth/user.json`.
Every spec in the `chromium` project then starts already authenticated —
no repeated login per test, no `beforeEach` boilerplate.

## Commands

```bash
npm test             # run all tests headless
npm run test:headed  # run with browser visible
npm run test:ui      # Playwright UI mode (interactive)
npm run test:debug   # step-through debugger
npm run report       # open last HTML report
```

## Next steps (site-specific)

1. Update selectors in `tests/pages/LoginPage.ts` to match the real DOM
   (field labels/roles used are placeholders).
2. Update the "logged in" assertion in `tests/fixtures/auth.setup.ts`
   (currently just checks the URL no longer contains `login`).
3. Add more Page Objects under `tests/pages/` as you automate more screens.
4. Add specs under `tests/specs/`.

## CI

`.github/workflows/playwright.yml` runs tests on push/PR to `main`.
Add `BASE_URL`, `LOGIN_USERNAME`, `LOGIN_PASSWORD` as GitHub repo secrets.

## Credentials

Real credentials live only in `.env` (gitignored). Never commit them.
