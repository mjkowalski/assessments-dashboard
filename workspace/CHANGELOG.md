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

## 2026-02-25
- Redesigned PageHeader toolbar: search box + dashed quick-filter pills (left), date range field + View button (right)
- Removed Filters button; renamed Columns → View with SlidersHorizontal + ChevronsUpDown icons
- Updated AssessmentsPage to drop onFilterToggle/filterActive props from PageHeader
- Key files: src/components/PageHeader.tsx, src/components/AssessmentsPage.tsx
</changelog>
