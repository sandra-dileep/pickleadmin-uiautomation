# Navigation / App Shell — Test Cases

Shared sidebar + topbar chrome present on every authenticated admin page
(verified from the Overview page, `/admin/dashboard`). Overview and Daily
Report specs rely on this chrome to move between pages; this folder owns
the exhaustive element/text checks for it so they aren't duplicated in
every page's own spec.

| # | Title | Steps | Expected Result |
|---|-------|-------|------------------|
| NAV-01 | Brand + console label present | 1. Log in, land on Overview. | Heading "Snapped Admin" visible. "Console" label visible above it. |
| NAV-02 | Theme toggle button present | 1. Open Overview. | A button with accessible name "Theme: System" is visible (icon-only, no visible text). |
| NAV-03 | All six nav groups present with exact labels | 1. Open Overview. | Sidebar nav contains exactly these group buttons, in order: Dashboard, Content, Tools, Billing, Management, Settings. |
| NAV-04 | Dashboard nav group expanded by default, others collapsed | 1. Open Overview. | "Dashboard" group button has `aria-expanded="true"`. Content/Tools/Billing/Management/Settings each have `aria-expanded="false"`. |
| NAV-05 | Dashboard group's nav links have exact labels | 1. Open Overview. 2. Dashboard group is already expanded. | Nav contains exactly these links, in order: Overview, Daily Report, Insights, Generation analytics, Change log. |
| NAV-06 | Collapsing/expanding a nav group toggles aria-expanded | 1. Open Overview. 2. Click "Content" group. 3. Click it again. | After first click, `aria-expanded="true"`. After second click, `aria-expanded="false"`. |
| NAV-07 | Overview / Daily Report links navigate correctly | 1. From Overview, click "Daily Report". 2. Click "Overview". | Each click lands on the matching page (heading "Daily report" / "Dashboard" respectively). |
| NAV-08 | Language selector has exact 4 options | 1. Open Overview. | A combobox with accessible name "App language" exists, with options EN, ML, TA, HI in that order. |
| NAV-09 | Log out button present | 1. Open Overview. | A button labelled "Log out" is visible. (Not clicked by this suite — would end the authenticated session other specs depend on.) |

## Out of scope
Clicking into Content / Tools / Billing / Management / Settings nav groups' own sub-links, and the language selector's actual translation-switching behavior — those pages/features are outside current automation scope. Actually logging out is also not exercised, to avoid invalidating the shared storage state other specs reuse.
