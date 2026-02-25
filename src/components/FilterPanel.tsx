import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterState } from "../types";
import { MultiSelect } from "./MultiSelect";
import { DateRangePicker } from "./DateRangePicker";

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose: () => void;
}

const protocolOptions = [
  "Run Analysis",
  "Jump Assessment",
  "Strength Test",
  "Mobility Check",
  "Balance Evaluation",
];

const statusOptions = ["Analyzing", "Analyzed"];

const qaOptions = ["Passed", "Failed", "Mixed"];

export function FilterPanel({
  filters,
  onFiltersChange,
  onClose,
}: FilterPanelProps) {
  const handleClearAll = () => {
    onFiltersChange({
      protocols: [],
      status: [],
      dateRange: { start: null, end: null },
      poseQA: [],
      biomechQA: [],
    });
  };

  const hasActiveFilters =
    filters.protocols.length > 0 ||
    filters.status.length > 0 ||
    filters.poseQA.length > 0 ||
    filters.biomechQA.length > 0 ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null;

  return (
    <div className="bg-secondary rounded-lg p-6 mb-6 animate-in slide-in-from-top duration-normal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-h3 text-secondary-foreground">Filters</h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="bg-transparent text-secondary-foreground hover:bg-secondary-hover"
        >
          <X size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MultiSelect
          label="Protocol"
          options={protocolOptions}
          selected={filters.protocols}
          onChange={(protocols) =>
            onFiltersChange({ ...filters, protocols })
          }
        />

        <MultiSelect
          label="Status"
          options={statusOptions}
          selected={filters.status}
          onChange={(status) => onFiltersChange({ ...filters, status })}
        />

        <DateRangePicker
          dateRange={filters.dateRange}
          onChange={(dateRange) => onFiltersChange({ ...filters, dateRange })}
        />

        <MultiSelect
          label="Pose QA"
          options={qaOptions}
          selected={filters.poseQA}
          onChange={(poseQA) => onFiltersChange({ ...filters, poseQA })}
        />

        <MultiSelect
          label="Biomech QA"
          options={qaOptions}
          selected={filters.biomechQA}
          onChange={(biomechQA) =>
            onFiltersChange({ ...filters, biomechQA })
          }
        />
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={handleClearAll}
          variant="outline"
          disabled={!hasActiveFilters}
          className="bg-background text-foreground border-input hover:bg-secondary-hover hover:text-secondary-foreground disabled:opacity-50"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}