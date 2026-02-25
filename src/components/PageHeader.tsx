import { Search, Calendar, SlidersHorizontal, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnVisibilityDialog } from "./ColumnVisibilityDialog";
import { useState } from "react";

const QUICK_FILTERS = [
  "Protocol",
  "Status",
  "QA",
  "Dimensions",
  "Assessment ID",
  "Athlete ID",
];

interface PageHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
}

export function PageHeader({
  searchQuery,
  onSearchChange,
  visibleColumns,
  onVisibleColumnsChange,
}: PageHeaderProps) {
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-[10px] border-b border-border">
      {/* Title row */}
      <div className="max-w-[1440px] mx-auto px-6 flex items-center" style={{ paddingTop: "36px", paddingBottom: "36px" }}>
        <h1
          style={{
            fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
            fontStyle: "normal",
            fontWeight: 700,
            color: "rgb(9, 9, 11)",
            fontSize: "30px",
            lineHeight: "36px",
          }}
        >
          Assessments
        </h1>
      </div>

      {/* Toolbar row */}
      <div className="max-w-[1440px] mx-auto px-6 pb-3 flex items-start justify-between gap-4">
        {/* Left: search + quick filter pills */}
        <div className="flex flex-col gap-2">
          {/* Search input */}
          <div className="relative w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={15}
            />
            <Input
              type="text"
              placeholder="Filter name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 bg-background text-foreground border-input focus:border-primary focus:ring-primary text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {QUICK_FILTERS.map((label) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-dashed border-neutral-300 hover:bg-muted transition-colors whitespace-nowrap"
              style={{
                fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
                fontStyle: "normal",
                fontWeight: 600,
                color: "rgb(24, 24, 27)",
                fontSize: "12px",
                lineHeight: "16px",
              }}
              >
                <PlusCircle size={13} strokeWidth={1.75} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: date range picker + View button */}
        <div className="flex flex-col items-end gap-2">
          {/* Date range input */}
          <div className="relative w-56">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={15}
            />
            <Input
              type="text"
              placeholder="Pick a date range"
              readOnly
              className="pl-9 h-9 bg-background text-foreground border-input text-sm placeholder:text-muted-foreground cursor-pointer"
            />
          </div>

          {/* View button */}
          <Button
            onClick={() => setColumnDialogOpen(true)}
            variant="outline"
            size="sm"
            className="h-9 px-3 bg-background text-foreground border-input hover:bg-secondary hover:text-secondary-foreground"
          >
            <SlidersHorizontal size={14} />
            <span className="mx-1.5">View</span>
            <ChevronsUpDown size={13} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <ColumnVisibilityDialog
        open={columnDialogOpen}
        onOpenChange={setColumnDialogOpen}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={onVisibleColumnsChange}
      />
    </header>
  );
}
