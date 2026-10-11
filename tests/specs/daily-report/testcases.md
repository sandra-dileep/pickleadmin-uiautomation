# Daily Report — Test Cases

Page: Dashboard → Daily Report (`/admin/daily-report`)

| # | Title | Steps | Expected Result |
|---|-------|-------|------------------|
| DR-01 | Daily report loads with all sections | 1. Log in. 2. Navigate to Daily Report. | "Daily report" heading visible, with a "Reporting <date> (vs. <date>)" subtitle. Trends, Revenue, Generations, Credit ledger, Engagement sections all render. |
| DR-02 | Top-line stat tiles show data | 1. Open Daily Report. | New signups, Active users, Pack purchases, Image generations, Video generations, Credits debited, Credits granted, Outstanding wallet balance, First-time generators, Total users tiles are each visible with a numeric value. |
| DR-03 | Switch report tab (Pickle it / Pickle Daily) | 1. Open Daily Report. 2. Click "Pickle Daily". 3. Click "Pickle it". | Each click succeeds with no error; the clicked tab becomes the active one. |
| DR-04 | "Yesterday" date preset is selected and stable | 1. Open Daily Report. 2. Note the "Reporting <date>" subtitle. 3. Click "Yesterday" (the only date preset shown). | Subtitle's reporting date is unchanged (report already defaults to the latest full IST day); no error on click. |
| DR-05 | Toggle "Include internal users" | 1. Open Daily Report. 2. Note checkbox state (unchecked by default). 3. Click it. | Checkbox state flips to checked; tiles re-render without error. Toggling again returns it to unchecked. |
| DR-06 | Trends — switch range (7 / 30 / 90 days) | 1. Open Daily Report, scroll to Trends. 2. Click each of 7 days / 30 days / 90 days. | Each click succeeds; the selected range's charts (Signups & active users, Generations by type, Credits sold & debited, Generation failures) render without error. |
| DR-07 | Revenue section renders | 1. Open Daily Report, scroll to Revenue. | "By pack", "By store", "By currency (gross)" breakdowns are visible (each shows data or an explicit "No purchases" state). |
| DR-08 | Generations section renders | 1. Open Daily Report, scroll to Generations. | Image generations, Video generations, Overlay generations stats are visible. |
| DR-09 | Credit ledger section renders | 1. Open Daily Report, scroll to Credit ledger. | Debited, Refunded, Granted, Expired figures are visible. |
| DR-10 | Engagement section renders | 1. Open Daily Report, scroll to Engagement. | Login sessions, New devices, Library uploads, App feedback figures are visible. |
| DR-11 | Unauthenticated access shows login, not report | 1. Clear session. 2. Navigate directly to `/admin/daily-report`. | Login form ("Welcome back") is shown; Daily report content is not rendered. |

## Out of scope
Exact numeric/financial correctness (depends on live data), chart pixel/shape verification, and date-picker calendar navigation beyond the "Yesterday" shortcut.
