import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Assessment, SortConfig } from "../types";
import { format } from "date-fns";
import { QAStatus } from "./QAStatus";

interface AssessmentsTableProps {
  assessments: Assessment[];
  visibleColumns: string[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

const columnConfig = {
  date: { label: "Date", sortable: true },
  athleteFirstName: { label: "Athlete First Name", sortable: true },
  athleteLastName: { label: "Athlete Last Name", sortable: true },
  protocolName: { label: "Protocol Name", sortable: true },
  status: { label: "Status", sortable: false },
  dimensions: { label: "Dimensions", sortable: false },
  assessmentId: { label: "Assessment ID", sortable: false },
  poseQA: { label: "Pose QA", sortable: false },
  biomechQA: { label: "Biomech QA", sortable: false },
};

const mutedTextStyle: React.CSSProperties = {
  fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  fontStyle: "normal",
  fontWeight: 400,
  color: "rgb(113, 113, 122)",
  fontSize: "14px",
  lineHeight: "20px",
};

const tagStyle: React.CSSProperties = {
  fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  fontStyle: "normal",
  fontWeight: 600,
  color: "rgb(9, 9, 11)",
  fontSize: "12px",
  lineHeight: "16px",
  display: "inline-block",
  border: "1px solid rgb(228, 228, 231)",
  borderRadius: "4px",
  padding: "2px 8px",
};

export function AssessmentsTable({
  assessments,
  visibleColumns,
  sortConfig,
  onSort,
}: AssessmentsTableProps) {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allSelected =
    assessments.length > 0 &&
    assessments.every((a) => selectedIds.has(a.assessmentId));
  const someSelected = assessments.some((a) => selectedIds.has(a.assessmentId));

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedIds(new Set(assessments.map((a) => a.assessmentId)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (
    id: string,
    checked: boolean | "indeterminate"
  ) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked === true) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const renderSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={16} className="ml-1 inline transition-transform duration-fast" />
    ) : (
      <ArrowDown size={16} className="ml-1 inline transition-transform duration-fast" />
    );
  };

  const renderCell = (assessment: Assessment, columnKey: string) => {
    switch (columnKey) {
      case "date":
        return (
          <span style={mutedTextStyle}>
            {format(new Date(assessment.date), "MMM d, yyyy")}
          </span>
        );
      case "athleteFirstName":
        return <span style={mutedTextStyle}>{assessment.athleteFirstName}</span>;
      case "athleteLastName":
        return <span style={mutedTextStyle}>{assessment.athleteLastName}</span>;
      case "status":
        return (
          <Badge
            variant={assessment.status === "Analyzed" ? "default" : "secondary"}
            className={
              assessment.status === "Analyzed"
                ? "bg-success text-success-foreground"
                : "bg-warning text-warning-foreground"
            }
          >
            {assessment.status === "Analyzing" && (
              <span className="inline-block w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
            )}
            {assessment.status}
          </Badge>
        );
      case "protocolName":
        return <span style={tagStyle}>{assessment.protocolName}</span>;
      case "dimensions":
        return assessment.dimensions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {assessment.dimensions.map((dim) => (
              <span key={dim} style={tagStyle}>
                {dim}
              </span>
            ))}
          </div>
        ) : (
          "—"
        );
      case "assessmentId":
        return (
          <span className="font-mono text-body-sm text-muted-foreground">
            {assessment.assessmentId}
          </span>
        );
      case "poseQA":
        return <QAStatus status={assessment.poseQA} />;
      case "biomechQA":
        return <QAStatus status={assessment.biomechQA} />;
      default:
        return assessment[columnKey as keyof Assessment];
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            {/* Select-all checkbox */}
            <TableHead className="w-10 px-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={handleSelectAll}
                aria-label="Select all rows"
              />
            </TableHead>

            {visibleColumns.map((columnKey) => {
              const config =
                columnConfig[columnKey as keyof typeof columnConfig];
              return (
                <TableHead
                  key={columnKey}
                  className={[
                    "text-tertiary-foreground",
                    columnKey === "status" ? "w-px whitespace-nowrap" : "",
                    config.sortable ? "cursor-pointer select-none" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => config.sortable && onSort(columnKey)}
                >
                  <div className="flex items-center">
                    {config.label}
                    {config.sortable && renderSortIcon(columnKey)}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {assessments.map((assessment) => (
            <TableRow
              key={assessment.assessmentId}
              className="border-b border-border bg-background transition-colors duration-fast cursor-pointer hover:bg-[hsl(240,5.9%,90%)]"
              onClick={() => navigate("/assessments/example")}
            >
              {/* Row checkbox */}
              <TableCell
                className="w-10 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedIds.has(assessment.assessmentId)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(assessment.assessmentId, checked)
                  }
                  aria-label={`Select row ${assessment.assessmentId}`}
                />
              </TableCell>

              {visibleColumns.map((columnKey) => (
                <TableCell
                  key={columnKey}
                  className={[
                    "text-foreground",
                    columnKey === "status" ? "w-px whitespace-nowrap" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {renderCell(assessment, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
