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
  pages/        Page Object classes — one per screen (LoginPage, OverviewPage, DailyReportPage)
  fixtures/
    base.ts       extended `test`/`expect` wiring page objects as fixtures
    auth.setup.ts logs in once via UI, saves storage state for reuse
  specs/
    overview/
      testcases.md       manual test-case list for the Overview page
      overview.spec.ts   its automation
    daily-report/
      testcases.md       manual test-case list for the Daily Report page
      daily-report.spec.ts  its automation
  utils/
    env.ts   required .env values
    auth.ts  AUTH_FILE constant (path to saved storage state)
playwright.config.ts
```

Each page/feature gets its own folder under `tests/specs/`: a `testcases.md`
documenting what's covered (and explicitly what's out of scope), plus the
`.spec.ts` that automates it. Add new folders the same way as coverage grows.

Auth flow: the `setup` project runs `auth.setup.ts` first, logs in through
the real UI once, and saves cookies to `playwright/.auth/user.json`. Specs
that need an authenticated session opt in explicitly with
`test.use({ storageState: AUTH_FILE })` (see `overview.spec.ts` /
`daily-report.spec.ts`) — this app's session cookie is set on a different
subdomain (`api.*`) than the UI (`admin.*`), and doing this via
`playwright.config.ts`'s per-project `use.storageState` did not reliably
restore it, so each spec declares it directly instead. A test that needs a
*clean* (logged-out) session — e.g. the "unauthenticated access" cases — goes
outside that `test.describe` block in the same file.

## Commands

```bash
npm test             # run all tests headless
npm run test:headed  # run with browser visible
npm run test:ui      # Playwright UI mode (interactive)
npm run test:debug   # step-through debugger
npm run report       # open last HTML report
```

## Coverage

Currently automated: **Overview** and **Daily Report** pages only (see their
`testcases.md` files for exact scope). To add another page: create
`tests/pages/<Page>.ts`, a `tests/specs/<feature>/` folder with its own
`testcases.md` + `.spec.ts`, following the same pattern.

## CI

`.github/workflows/playwright.yml` runs tests on push/PR to `main`.
Add `BASE_URL`, `LOGIN_USERNAME`, `LOGIN_PASSWORD` as GitHub repo secrets.

## Credentials

Real credentials live only in `.env` (gitignored). Never commit them.
