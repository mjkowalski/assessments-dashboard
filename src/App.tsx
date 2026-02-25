import { Routes, Route, Navigate } from "react-router-dom";
import { AssessmentsPage } from "./components/AssessmentsPage";
import { AssessmentDetailPage } from "./components/AssessmentDetailPage";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Navigate to="/assessments/" replace />} />
        <Route path="/assessments/" element={<AssessmentsPage />} />
        <Route path="/assessments/:id" element={<AssessmentDetailPage />} />
      </Routes>
    </div>
  );
}
