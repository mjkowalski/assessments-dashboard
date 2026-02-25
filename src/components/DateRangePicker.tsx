import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface DateRangePickerProps {
  dateRange: { start: Date | null; end: Date | null };
  onChange: (dateRange: { start: Date | null; end: Date | null }) => void;
}

export function DateRangePicker({ dateRange, onChange }: DateRangePickerProps) {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange({ ...dateRange, start: date });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange({ ...dateRange, end: date });
  };

  const displayText =
    dateRange.start && dateRange.end
      ? `${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d, yyyy")}`
      : "Select date range";

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-body-sm text-secondary-foreground uppercase">
        Date Range
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-between bg-background text-foreground border-input hover:bg-secondary-hover hover:text-secondary-foreground"
          >
            <span className="truncate">{displayText}</span>
            <Calendar size={16} className="ml-2 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 bg-background border-border" align="start">
          <div className="space-y-4">
            <div>
              <Label htmlFor="start-date" className="text-body text-foreground">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={
                  dateRange.start
                    ? format(dateRange.start, "yyyy-MM-dd")
                    : ""
                }
                onChange={handleStartChange}
                className="mt-2 bg-background text-foreground border-input"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-body text-foreground">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={
                  dateRange.end ? format(dateRange.end, "yyyy-MM-dd") : ""
                }
                onChange={handleEndChange}
                className="mt-2 bg-background text-foreground border-input"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}