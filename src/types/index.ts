export interface Assessment {
  date: string;
  athleteFirstName: string;
  athleteLastName: string;
  protocolName: string;
  status: "Analyzing" | "Analyzed";
  dimensions: string[];
  assessmentId: string;
  poseQA: "Passed" | "Failed" | "Mixed";
  biomechQA: "Passed" | "Failed" | "Mixed";
}

export interface FilterState {
  protocols: string[];
  status: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  poseQA: string[];
  biomechQA: string[];
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}