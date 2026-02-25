import { useState, useMemo, useEffect } from "react";
import { PageHeader } from "./PageHeader";
import { FilterPanel } from "./FilterPanel";
import { AssessmentsTable } from "./AssessmentsTable";
import { Pagination } from "./Pagination";
import { Assessment, FilterState, SortConfig } from "../types";
import { generateMockAssessments } from "../utils/mockData";

export function AssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    protocols: [],
    status: [],
    dateRange: { start: null, end: null },
    poseQA: [],
    biomechQA: [],
  });
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "date",
    "athleteFirstName",
    "athleteLastName",
    "protocolName",
    "status",
    "dimensions",
  ]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const allAssessments = useMemo(() => generateMockAssessments(123), []);

  useEffect(() => {
    const savedColumns = localStorage.getItem("assessments-visible-columns");
    if (savedColumns) {
      setVisibleColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "assessments-visible-columns",
      JSON.stringify(visibleColumns)
    );
  }, [visibleColumns]);

  const filteredAssessments = useMemo(() => {
    let filtered = [...allAssessments];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (assessment) =>
          assessment.athleteFirstName.toLowerCase().includes(query) ||
          assessment.athleteLastName.toLowerCase().includes(query)
      );
    }

    if (filters.protocols.length > 0) {
      filtered = filtered.filter((assessment) =>
        filters.protocols.includes(assessment.protocolName)
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter((assessment) =>
        filters.status.includes(assessment.status)
      );
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter((assessment) => {
        const assessmentDate = new Date(assessment.date);
        return (
          assessmentDate >= filters.dateRange.start! &&
          assessmentDate <= filters.dateRange.end!
        );
      });
    }

    if (filters.poseQA.length > 0) {
      filtered = filtered.filter((assessment) =>
        filters.poseQA.includes(assessment.poseQA)
      );
    }

    if (filters.biomechQA.length > 0) {
      filtered = filtered.filter((assessment) =>
        filters.biomechQA.includes(assessment.biomechQA)
      );
    }

    return filtered;
  }, [allAssessments, searchQuery, filters]);

  const sortedAssessments = useMemo(() => {
    const sorted = [...filteredAssessments];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Assessment];
      const bValue = b[sortConfig.key as keyof Assessment];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredAssessments, sortConfig]);

  const paginatedAssessments = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedAssessments.slice(startIndex, endIndex);
  }, [sortedAssessments, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedAssessments.length / rowsPerPage);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}
      />

      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {filterPanelOpen && (
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setFilterPanelOpen(false)}
          />
        )}

        <AssessmentsTable
          assessments={paginatedAssessments}
          visibleColumns={visibleColumns}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        <div className="mt-6 flex items-center justify-between text-body-sm text-muted-foreground">
          <div>
            Showing {(currentPage - 1) * rowsPerPage + 1}–
            {Math.min(currentPage * rowsPerPage, sortedAssessments.length)} of{" "}
            {sortedAssessments.length} assessments
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </main>
    </div>
  );
}