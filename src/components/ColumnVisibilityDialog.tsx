import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ColumnVisibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
}

const allColumns = [
  { key: "date", label: "Date" },
  { key: "athleteFirstName", label: "Athlete First Name" },
  { key: "athleteLastName", label: "Athlete Last Name" },
  { key: "protocolName", label: "Protocol Name" },
  { key: "status", label: "Status" },
  { key: "dimensions", label: "Dimensions" },
  { key: "assessmentId", label: "Assessment ID" },
  { key: "poseQA", label: "Pose QA" },
  { key: "biomechQA", label: "Biomech QA" },
];

const defaultColumns = [
  "date",
  "athleteFirstName",
  "athleteLastName",
  "protocolName",
  "status",
  "dimensions",
];

export function ColumnVisibilityDialog({
  open,
  onOpenChange,
  visibleColumns,
  onVisibleColumnsChange,
}: ColumnVisibilityDialogProps) {
  const handleToggle = (columnKey: string) => {
    if (visibleColumns.includes(columnKey)) {
      onVisibleColumnsChange(
        visibleColumns.filter((key) => key !== columnKey)
      );
    } else {
      onVisibleColumnsChange([...visibleColumns, columnKey]);
    }
  };

  const handleReset = () => {
    onVisibleColumnsChange(defaultColumns);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h3 text-foreground">
            Column Visibility
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {allColumns.map((column) => (
            <div key={column.key} className="flex items-center gap-3">
              <Checkbox
                id={`column-${column.key}`}
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={() => handleToggle(column.key)}
              />
              <Label
                htmlFor={`column-${column.key}`}
                className="text-body text-foreground cursor-pointer flex-1"
              >
                {column.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-background text-foreground border-input hover:bg-secondary hover:text-secondary-foreground"
          >
            Reset to Default
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}