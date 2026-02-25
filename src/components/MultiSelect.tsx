import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-body-sm text-secondary-foreground uppercase">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-between bg-background text-foreground border-input hover:bg-secondary-hover hover:text-secondary-foreground"
          >
            <span className="truncate">
              {selected.length > 0
                ? `${selected.length} selected`
                : `Select ${label}`}
            </span>
            <ChevronDown size={16} className="ml-2 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 bg-background border-border" align="start">
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option} className="flex items-center gap-3">
                <Checkbox
                  id={`${label}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={() => handleToggle(option)}
                />
                <Label
                  htmlFor={`${label}-${option}`}
                  className="text-body text-foreground cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}