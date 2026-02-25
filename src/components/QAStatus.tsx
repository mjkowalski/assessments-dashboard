import { Check, X, Minus } from "lucide-react";

interface QAStatusProps {
  status: "Passed" | "Failed" | "Mixed";
}

export function QAStatus({ status }: QAStatusProps) {
  const config = {
    Passed: {
      icon: Check,
      color: "text-success",
      bg: "bg-success/10",
    },
    Failed: {
      icon: X,
      color: "text-error",
      bg: "bg-error/10",
    },
    Mixed: {
      icon: Minus,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  };

  const { icon: Icon, color, bg } = config[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${bg}`}>
      <Icon size={16} className={color} />
      <span className={`text-body-sm ${color}`}>{status}</span>
    </div>
  );
}