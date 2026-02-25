import { useState } from "react";
import { AssessmentsPage } from "./components/AssessmentsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AssessmentsPage />
    </div>
  );
}