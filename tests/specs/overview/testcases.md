# Overview — Test Cases

Page: Dashboard → Overview (`/admin/dashboard`)

| # | Title | Steps | Expected Result |
|---|-------|-------|------------------|
| OV-01 | Overview loads with all sections | 1. Log in. 2. Navigate to Overview. | "Dashboard" heading visible. OVERVIEW, TEMPLATES, CONTENT TEAM ACTIVITY, REVIEWER ACTIVITY, CONTENT STRUCTURE, TRANSLATIONS & COPY, SHORTCUTS sections all render. |
| OV-02 | OVERVIEW stat cards show data | 1. Open Overview. | Users, Jobs in progress, Failed generations, Successful generations, Billing plans cards are each visible with a numeric value. |
| OV-03 | TEMPLATES cards show data | 1. Open Overview. | Image templates and Video templates cards visible with numeric totals and Live/Inactive breakdown. |
| OV-04 | Content team activity — filter by range | 1. Open Overview. 2. In "Content team activity", click each of Today / This week / This month / All time. | Table re-renders for the selected range each time (no error, filter button reflects active state). |
| OV-05 | Reviewer activity — filter by range | 1. Open Overview. 2. In "Reviewer activity", click each of Today / This week / This month / All time. | Table re-renders for the selected range each time. Filtering reviewer activity does not affect the content team activity table's selected range. |
| OV-06 | Content structure cards show data | 1. Open Overview. | Categories, Subcategories, Tags cards visible with numeric values. |
| OV-07 | Translations & copy card shows data | 1. Open Overview. | Translation keys card visible with a numeric value. |
| OV-08 | Shortcuts links are present | 1. Open Overview, scroll to Shortcuts. | Change log, Page schemas, Image job queue, Video workflow queue links are visible and clickable. |
| OV-09 | Unauthenticated access shows login, not dashboard | 1. Clear session. 2. Navigate directly to `/admin/dashboard`. | Login form ("Welcome back") is shown; dashboard content is not rendered. |

## Out of scope
Deep-linking into shortcut destinations, exact numeric values (data changes continuously), and content of other admin sections (Content, Tools, Billing, Management, Settings) — covered separately if/when those pages are in scope.
