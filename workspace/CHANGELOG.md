<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
<!-- NEXT_ENTRY_HERE -->

## 2026-02-25 (detail page v3)
- Dashboard image: full-width responsive with 64px padding each side (removed fixed maxWidth)
- QA table pills: new QAPill component (Passed=black/#f5f5f5, Failed=white/#f04343, N/A=dash), 12px/600/system-ui
- captureQA mock data updated to Passed/Failed values (1 Failed on Hitting 2 Pose QA)
- Details tab: Assessment Metadata section moved to top, above Protocol

## 2026-02-25 (detail page v2)
- Header: athlete name + protocol on separate lines, 24px/700 system-ui, ExternalLink icon in #E01D47
- Assessment ID: 14px/400/rgb(113,113,122); QA counts updated to 9 Passed / 1 Failed
- Active tab indicator: text + underline color #E01D47
- Captures list: renamed movements (Baseball - Hitting, Squat - Bodyweight, Jump - Single Leg); selected row bg #F8CAD4FF, left bar #E01D47
- Captures main: capture title (18px/600) + QA status badges line above videos; HittingKeyMetrics component (Force Generation, Body Position, Energy Leaks cards, bg-background)
- Dashboard tab: shows hosted dashboard image, scrollable
- Details tab: removed shaded containers; section headers 18px/600/rgb(9,9,11); sections separated by <hr>

## 2026-02-25 (detail page v1)
- Built full AssessmentDetailPage from spec: header (identity + status/actions), 4 tabs (Summary, Captures, Dashboard, Details)
- Captures tab: 250px scrollable left panel + flex-fill right panel (videos, dimensions, key metrics)
- Details tab: Protocol, QA, Capture QA table, Device Details, Assessment Metadata sections
- Layout: h-screen flex-col with fixed top block + flex-1 min-h-0 overflow-hidden main area
- Key file: src/components/AssessmentDetailPage.tsx

## 2026-02-25 (routing)
- Added BrowserRouter in index.tsx; routes: / → /assessments/, /assessments/:id → AssessmentDetailPage
- Created AssessmentDetailPage scaffold with back-breadcrumb header, same design tokens as AssessmentsPage
- All table rows now navigate to /assessments/example (single example for mockup)
- Checkbox cells use stopPropagation to prevent row-click conflict
- Key files: src/App.tsx, src/index.tsx, src/components/AssessmentDetailPage.tsx, src/components/AssessmentsTable.tsx

## 2026-02-25
- Redesigned PageHeader toolbar: search box + dashed quick-filter pills (left), date range field + View button (right)
- Removed Filters button; renamed Columns → View with SlidersHorizontal + ChevronsUpDown icons
- Updated AssessmentsPage to drop onFilterToggle/filterActive props from PageHeader
- Key files: src/components/PageHeader.tsx, src/components/AssessmentsPage.tsx
</changelog>
