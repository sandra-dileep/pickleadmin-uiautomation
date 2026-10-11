# Daily Report — Test Cases

Page: Dashboard → Daily Report (`/admin/daily-report`)

Shared sidebar/topbar chrome is covered once in [`../navigation/testcases.md`](../navigation/testcases.md)
rather than repeated here.

| # | Title | Steps | Expected Result |
|---|-------|-------|------------------|
| DR-01 | Daily report loads, exact heading and subtitle format | 1. Log in. 2. Navigate to Daily Report. | "Daily report" heading has exact text "Daily report". Subtitle matches "One IST calendar day. Reporting `<date>` (vs. `<date>`)." Trends, Revenue, Generations, Credit ledger, Engagement sections all render. |
| DR-02 | Report tabs: exact labels | 1. Open Daily Report. | Buttons "Pickle it" and "Pickle Daily" are both visible. |
| DR-03 | Switch report tab | 1. Click "Pickle Daily". 2. Click "Pickle it". | Each click succeeds with no error. |
| DR-04 | Date controls: exact label and preset | 1. Open Daily Report. | "Date (IST)" label and a "Yesterday" preset button are visible. |
| DR-05 | "Yesterday" date preset is selected and stable | 1. Note the "Reporting `<date>`" subtitle. 2. Click "Yesterday" (the only date preset shown). | Subtitle's reporting date is unchanged (report already defaults to the latest full IST day); no error on click. |
| DR-06 | "Include internal users" checkbox | 1. Open Daily Report. 2. Note checkbox state (unchecked by default). 3. Click it twice. | Checkbox is visible, unchecked by default, flips to checked on first click and back to unchecked on second. |
| DR-07 | Top-line stat tiles: exact labels and captions | 1. Open Daily Report. | Each of New signups ("no change"), Active users ("… vs prior day"), Pack purchases ("… credits sold"), Image/Video generations ("… failed"), Credits debited/granted ("… vs prior day"), Outstanding wallet balance ("all users, unexpired"), First-time generators ("no change"), Total users ("… have ever paid") shows its exact label, a value, and its caption pattern. |
| DR-08 | Trends: exact range buttons and chart titles | 1. Open Daily Report, scroll to Trends. | Range buttons read exactly: 7 days, 30 days, 90 days. Chart titles "Signups & active users", "Generations by type", "Credits sold & debited", "Generation failures" are all visible. |
| DR-09 | Trends — switch range (7 / 30 / 90 days) | 1. Click each of 7 days / 30 days / 90 days. | Each click succeeds; charts re-render without error. |
| DR-10 | Revenue: exact breakdown labels | 1. Open Daily Report, scroll to Revenue. | Shows caption "Granted credit-pack purchases only (excludes pending / failed / disputed)", breakdown labels "By pack (purchases)", "By store", "By currency (gross)", and metric labels First-time buyers, Repeat buyers, Bought same-day signup, Subscription starts, Cancellations, Consumable purchases, Static template unlocks, Failed / disputed purchases. |
| DR-11 | Generations: exact sub-section labels | 1. Open Daily Report, scroll to Generations. | Image generations, Video generations, Overlay generations, Top image templates, Top video templates labels all visible. |
| DR-12 | Credit ledger: exact labels | 1. Open Daily Report, scroll to Credit ledger. | Debited, Refunded, Granted, Expired, Grants by reason labels all visible. |
| DR-13 | Engagement: exact labels | 1. Open Daily Report, scroll to Engagement. | Login sessions, New devices, Library uploads, App feedback labels all visible. |
| DR-14 | Engagement: feedback thumbs and store downloads labels | 1. Open Daily Report, scroll to Engagement. | Shows "liked" / "disliked" thumbs feedback, "post-purchase feedback" label, "Store downloads (prior-day report)" with "iOS" and "Android" rows. |
| DR-15 | Unauthenticated access shows login, not report | 1. Clear session. 2. Navigate directly to `/admin/daily-report`. | Login form ("Welcome back") is shown; Daily report content is not rendered. |

## Out of scope
Exact numeric/financial correctness (depends on live data — only presence, format and static labels/captions are asserted), chart pixel/shape verification, and date-picker calendar navigation beyond the "Yesterday" shortcut.

## Note on data-dependent states
DR-10/DR-11/DR-12 currently show empty-state values ("No purchases", "No activity", "No grants") in this environment. Assertions check the always-present *labels*, not those fallback value strings, so they keep passing once real data appears.
