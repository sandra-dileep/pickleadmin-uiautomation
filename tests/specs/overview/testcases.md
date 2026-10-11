# Overview — Test Cases

Page: Dashboard → Overview (`/admin/dashboard`)

Shared sidebar/topbar chrome (nav groups, nav links, lang selector, theme
toggle, log out) is covered once in [`../navigation/testcases.md`](../navigation/testcases.md)
rather than repeated here.

| # | Title | Steps | Expected Result |
|---|-------|-------|------------------|
| OV-01 | Overview loads, exact section headings | 1. Log in. 2. Navigate to Overview. | "Dashboard" heading has exact text "Dashboard". "Overview", "Templates", "Content team activity", "Reviewer activity", "Content structure", "Translations & copy", "Shortcuts" headings all visible. |
| OV-02 | Users card | 1. Open Overview. | Card shows label "Users", a numeric value, caption "Registered accounts", and a "View users" link. |
| OV-03 | Jobs in progress card | 1. Open Overview. | Card shows label "Jobs in progress", caption matching "`<n> image · <n> video (queued or running)`", and an "Open image jobs" link. |
| OV-04 | Failed generations card | 1. Open Overview. | Card shows label "Failed generations", caption matching "`<n> image · <n> video`", and a "Review failures" link. |
| OV-05 | Successful generations card | 1. Open Overview. | Card shows label "Successful generations", caption matching "`<n> image · <n> video (COMPLETE, all time)`", and a "View operations" link. |
| OV-06 | Billing plans card | 1. Open Overview. | Card shows label "Billing plans", a value matching "`<n> / <n>`", caption "Active plans vs total defined", and a "Manage plans" link. |
| OV-07 | Welcome AI credits / Credit packs / Generation costs / Referral rewards cards | 1. Open Overview. | Each card shows its exact label and caption: "Welcome AI credits" / "Free explorer grants; one-time per phone"; "Credit packs" / "IAP credit pack catalog"; "Generation costs" / "Per-type credit debit amounts"; "Referral rewards" / "Credits granted on referral signup". Each has its CTA link ("Configure" ×3, "Manage packs" ×1). |
| OV-08 | TEMPLATES cards | 1. Open Overview. | Image templates and Video templates cards each show their label, "Total defined in admin", a "Live (active)" count, an "Inactive" count, and a "Manage templates" link. |
| OV-09 | Content team activity — exact table headers and filters | 1. Open Overview. | Table header row reads exactly: User, Uploaded, Approved, → Catalog, → Prod. Filter buttons read exactly: Today, This week, This month, All time. |
| OV-10 | Content team activity — filter by range | 1. Open Overview. 2. Click each of Today / This week / This month / All time in turn. | Table re-renders for the selected range each time with no error. |
| OV-11 | Reviewer activity — exact table headers, filters, independence | 1. Open Overview. 2. Table header row. 3. Set content team filter to "This week". 4. Click through reviewer activity's own filters. | Reviewer table header reads exactly: User, Approved, Rejected, → Catalog, → Prod. Filtering reviewer activity does not reset content team activity's selected range. |
| OV-12 | Content structure cards | 1. Open Overview. | Categories, Subcategories, Tags cards each show their exact label and a numeric value. |
| OV-13 | Translations & copy — card and breakdown labels | 1. Open Overview. | Translation keys card shows a numeric value and the exact caption "One row per slug · locales en, ml, hi, ta · empty or whitespace counts as missing". Section also shows "Fully localized (4/4)", "Missing English", "EN ok, other locales incomplete", "Gaps when EN is set", and a "Manage translations" link. |
| OV-14 | Shortcuts — exact link set and order | 1. Open Overview, scroll to Shortcuts. | Links appear in exactly this order: Change log, Page schemas, Image job queue, Video workflow queue. |
| OV-15 | Unauthenticated access shows login, not dashboard | 1. Clear session. 2. Navigate directly to `/admin/dashboard`. | Login form ("Welcome back") is shown; dashboard content is not rendered. |

## Out of scope
Deep-linking into shortcut/CTA destinations, exact numeric values (data changes continuously — only presence/format is asserted), and content of other admin sections (Content, Tools, Billing, Management, Settings) — covered separately if/when those pages are in scope.
