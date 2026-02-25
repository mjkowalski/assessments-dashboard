import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "summary" | "captures" | "dashboard" | "details";

interface Capture {
  id: number;
  movementName: string;
  number: number;
  timestamp: string;
  dimensions: { key: string; value: string }[];
  keyMetrics: { label: string; value: string }[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BRAND_RED = "#E01D47";

const SYSTEM_FONT =
  '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_DETAIL = {
  athleteName: "Joe Baseball",
  protocolName: "Hitting Assessment",
  date: "Jan 29, 2026",
  captureCount: 10,
  assessmentId: "a3f2c1d0-9e8b-4a7f-b6c5-1d2e3f4a5b6c",
  status: "Analyzed" as "Analyzed" | "Analyzing",
  qaPassedCount: 9,
  qaFailedCount: 1,
  captures: [
    {
      id: 1,
      movementName: "Baseball - Hitting",
      number: 1,
      timestamp: "03:08:22 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "handedness", value: "left" },
        { key: "bat_length", value: "0.79" },
        { key: "onscreen", value: "off" },
      ],
      keyMetrics: [],
    },
    {
      id: 2,
      movementName: "Baseball - Hitting",
      number: 2,
      timestamp: "03:11:35 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "handedness", value: "left" },
        { key: "bat_length", value: "0.79" },
        { key: "onscreen", value: "on" },
      ],
      keyMetrics: [],
    },
    {
      id: 3,
      movementName: "Baseball - Hitting",
      number: 3,
      timestamp: "03:14:12 PM",
      dimensions: [
        { key: "setting", value: "game" },
        { key: "handedness", value: "left" },
        { key: "bat_length", value: "0.79" },
        { key: "onscreen", value: "off" },
      ],
      keyMetrics: [],
    },
    {
      id: 4,
      movementName: "Baseball - Hitting",
      number: 4,
      timestamp: "03:16:50 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "handedness", value: "left" },
        { key: "bat_length", value: "0.81" },
        { key: "onscreen", value: "off" },
      ],
      keyMetrics: [],
    },
    {
      id: 5,
      movementName: "Baseball - Hitting",
      number: 5,
      timestamp: "03:18:33 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "handedness", value: "left" },
        { key: "bat_length", value: "0.79" },
        { key: "onscreen", value: "on" },
      ],
      keyMetrics: [],
    },
    {
      id: 6,
      movementName: "Squat - Bodyweight",
      number: 1,
      timestamp: "03:21:10 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "load", value: "bodyweight" },
        { key: "depth", value: "full" },
      ],
      keyMetrics: [
        { label: "Knee Angle", value: "112°" },
        { label: "Hip Depth", value: "Below Parallel" },
        { label: "Trunk Lean", value: "18°" },
        { label: "Symmetry", value: "94%" },
      ],
    },
    {
      id: 7,
      movementName: "Squat - Bodyweight",
      number: 2,
      timestamp: "03:23:44 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "load", value: "bodyweight" },
        { key: "depth", value: "full" },
      ],
      keyMetrics: [
        { label: "Knee Angle", value: "108°" },
        { label: "Hip Depth", value: "Parallel" },
        { label: "Trunk Lean", value: "21°" },
        { label: "Symmetry", value: "91%" },
      ],
    },
    {
      id: 8,
      movementName: "Squat - Bodyweight",
      number: 3,
      timestamp: "03:25:18 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "load", value: "bodyweight" },
        { key: "depth", value: "full" },
      ],
      keyMetrics: [
        { label: "Knee Angle", value: "115°" },
        { label: "Hip Depth", value: "Below Parallel" },
        { label: "Trunk Lean", value: "16°" },
        { label: "Symmetry", value: "96%" },
      ],
    },
    {
      id: 9,
      movementName: "Jump - Single Leg",
      number: 1,
      timestamp: "03:28:05 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "type", value: "vertical" },
        { key: "surface", value: "turf" },
      ],
      keyMetrics: [
        { label: "Jump Height", value: "28 in" },
        { label: "Contact Time", value: "0.18 s" },
        { label: "Peak Force", value: "1,240 N" },
        { label: "Asymmetry", value: "3%" },
      ],
    },
    {
      id: 10,
      movementName: "Jump - Single Leg",
      number: 2,
      timestamp: "03:30:22 PM",
      dimensions: [
        { key: "setting", value: "practice" },
        { key: "type", value: "vertical" },
        { key: "surface", value: "turf" },
      ],
      keyMetrics: [
        { label: "Jump Height", value: "30 in" },
        { label: "Contact Time", value: "0.17 s" },
        { label: "Peak Force", value: "1,310 N" },
        { label: "Asymmetry", value: "2%" },
      ],
    },
  ] as Capture[],
  protocol: {
    name: "Custom Protocol",
    movements: ["Hitting Sfma_hit", "Squat Sfma_squat", "Jump Sfma_jump"],
  },
  qa: {
    pose: { passed: 24, total: 25 },
    biomech: { passed: 24, total: 25 },
    bat: { passed: 23, total: 25 },
  },
  captureQA: [
    { capture: "Baseball - Hitting 1", poseQA: "Passed", biomechQA: "Passed", batQA: "Passed" },
    { capture: "Baseball - Hitting 2", poseQA: "Failed", biomechQA: "Passed", batQA: "Passed" },
    { capture: "Baseball - Hitting 3", poseQA: "Passed", biomechQA: "Passed", batQA: "Passed" },
    { capture: "Baseball - Hitting 4", poseQA: "Passed", biomechQA: "Passed", batQA: "Passed" },
    { capture: "Baseball - Hitting 5", poseQA: "Passed", biomechQA: "Passed", batQA: "Passed" },
    { capture: "Squat - Bodyweight 1", poseQA: "Passed", biomechQA: "Passed", batQA: "N/A" },
    { capture: "Squat - Bodyweight 2", poseQA: "Passed", biomechQA: "Passed", batQA: "N/A" },
    { capture: "Squat - Bodyweight 3", poseQA: "Passed", biomechQA: "Passed", batQA: "N/A" },
    { capture: "Jump - Single Leg 1",  poseQA: "Passed", biomechQA: "Passed", batQA: "N/A" },
    { capture: "Jump - Single Leg 2",  poseQA: "Passed", biomechQA: "Passed", batQA: "N/A" },
  ],
  devices: { primary: "iPhone 13", secondary: "iPhone 16" },
  startedAt: "Jan 29, 2026 · 3:08 PM",
  completedAt: "Jan 29, 2026 · 3:30 PM",
};

// ─── Capture QA Status Line ───────────────────────────────────────────────────

function CaptureQAStatusLine({ movementName }: { movementName: string }) {
  const isHitting = movementName.includes("Baseball");
  const qaItems = isHitting
    ? [
        { label: "Pose QA", status: "Passed" },
        { label: "Biomech QA", status: "Passed" },
        { label: "Bat QA", status: "Passed" },
      ]
    : [
        { label: "Pose QA", status: "Passed" },
        { label: "Biomech QA", status: "Passed" },
      ];

  return (
    <div className="flex items-center gap-5">
      {qaItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{item.label}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600">
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Hitting Key Metrics ──────────────────────────────────────────────────────

function HittingKeyMetrics() {
  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Force Generation + Body Position */}
      <div className="grid grid-cols-2 gap-3">
        {/* Force Generation */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="text-sm font-semibold text-foreground mb-4">Force Generation</div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Kinematic Sequence</span>
              <span className="text-sm font-bold text-foreground">Pelvis-Trunk-Arm</span>
            </div>
            <div className="flex gap-6">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Pelvis</div>
                <div className="text-xl font-bold text-foreground">511°/s</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Trunk</div>
                <div className="text-xl font-bold text-foreground">709°/s</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Arm</div>
                <div className="text-xl font-bold text-foreground">957°/s</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm text-muted-foreground">Pelvis to Trunk Speed Gain</span>
              <span className="text-sm font-bold text-foreground">1.39</span>
            </div>
          </div>
        </div>

        {/* Body Position */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="text-sm font-semibold text-foreground mb-4">Body Position</div>
          <div className="space-y-2.5">
            {[
              { label: "X-Factor Peak", value: "°" },
              { label: "X-Factor at Launch Position", value: "0°" },
              { label: "X-Factor at Ball Contact", value: "15°" },
              { label: "Lateral Flexion at Launch", value: "-11°" },
              { label: "Lateral Flexion at Ball Contact", value: "6°" },
              { label: "Sagittal Flexion at Launch", value: "-11°" },
              { label: "Sagittal Flexion at Ball Contact", value: "20°" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Energy Leaks */}
      <div className="rounded-lg border border-border bg-background p-4">
        <div className="text-sm font-semibold text-foreground mb-4">Energy Leaks</div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
            <span className="text-sm text-foreground">Sway</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-sm text-foreground">Knee Dominance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-sm text-foreground">Hip Hike</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
            <span className="text-sm text-foreground">Coming Out of Swing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
            <span className="text-sm text-foreground">Drifting Forward</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Summary ─────────────────────────────────────────────────────────────

function SummaryTab() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          Assessment Summary
        </h2>
        <div className="rounded-lg border border-dashed border-border bg-card p-16 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground text-center">
            AI-generated summary will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Captures ────────────────────────────────────────────────────────────

interface CapturesTabProps {
  captures: Capture[];
  selectedCaptureId: number;
  onSelectCapture: (id: number) => void;
  selectedCapture: Capture;
}

function CapturesTab({
  captures,
  selectedCaptureId,
  onSelectCapture,
  selectedCapture,
}: CapturesTabProps) {
  const isHitting = selectedCapture.movementName.includes("Baseball");

  return (
    <>
      {/* Left Panel — Capture List */}
      <div className="w-[250px] flex-shrink-0 border-r border-border overflow-y-auto bg-background">
        <div className="py-2">
          {captures.map((capture) => {
            const isSelected = selectedCaptureId === capture.id;
            return (
              <button
                key={capture.id}
                onClick={() => onSelectCapture(capture.id)}
                className="w-full text-left px-4 py-3 transition-colors border-l-2"
                style={{
                  backgroundColor: isSelected ? "#F8CAD4FF" : undefined,
                  borderLeftColor: isSelected ? BRAND_RED : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "hsl(220, 20%, 95%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
                  }
                }}
              >
                <div className="text-sm font-medium text-foreground">
                  {capture.movementName} {capture.number}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {capture.timestamp}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel — Capture Viewer */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 flex flex-col gap-6 max-w-[900px]">

          {/* Capture Title */}
          <div>
            <h2
              style={{
                fontFamily: SYSTEM_FONT,
                fontStyle: "normal",
                fontWeight: 600,
                color: "rgb(9, 9, 11)",
                fontSize: "18px",
                lineHeight: "28px",
                marginBottom: "8px",
              }}
            >
              {selectedCapture.movementName} {selectedCapture.number}
            </h2>
            <CaptureQAStatusLine movementName={selectedCapture.movementName} />
          </div>

          {/* Section 1 — Videos */}
          <section>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Primary
                </div>
                <div className="aspect-video bg-neutral-100 rounded-lg border border-border flex flex-col items-center justify-center gap-2">
                  <Video size={22} className="text-neutral-300" />
                  <span className="text-xs text-neutral-400">No video</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Secondary
                </div>
                <div className="aspect-video bg-neutral-100 rounded-lg border border-border flex flex-col items-center justify-center gap-2">
                  <Video size={22} className="text-neutral-300" />
                  <span className="text-xs text-neutral-400">No video</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 — Dimensions */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Dimensions</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCapture.dimensions.map((dim) => (
                <span
                  key={dim.key}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-muted text-xs"
                >
                  <span className="text-muted-foreground">{dim.key}:</span>
                  <span className="font-medium text-foreground">{dim.value}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Section 3 — Key Metrics */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Key Metrics</h3>
            {isHitting ? (
              <HittingKeyMetrics />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {selectedCapture.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-border bg-background px-4 py-3"
                  >
                    <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                    <div className="text-base font-semibold text-foreground">{metric.value}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </>
  );
}

// ─── QA Pill ─────────────────────────────────────────────────────────────────

function QAPill({ value }: { value: string }) {
  if (value === "N/A") {
    return <span className="text-muted-foreground text-sm">—</span>;
  }
  const isPassed = value === "Passed";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0 8px",
        height: "20px",
        borderRadius: "4px",
        fontFamily: SYSTEM_FONT,
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "12px",
        lineHeight: "16px",
        backgroundColor: isPassed ? "#f5f5f5" : "#f04343",
        color: isPassed ? "#000000" : "#ffffff",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}

// ─── Tab: Dashboard ───────────────────────────────────────────────────────────

function DashboardTab() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="py-6" style={{ paddingLeft: "64px", paddingRight: "64px" }}>
        <img
          src="https://c.animaapp.com/mm283npp9n5tj8/img/uploaded-asset-1772051416189-0.png"
          alt="Baseball Hitting Dashboard"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

// ─── Tab: Details ─────────────────────────────────────────────────────────────

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: SYSTEM_FONT,
  fontStyle: "normal",
  fontWeight: 600,
  color: "rgb(9, 9, 11)",
  fontSize: "18px",
  lineHeight: "28px",
  marginBottom: "16px",
};

function DetailsTab() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6">
      <div className="max-w-2xl flex flex-col">

        {/* Assessment Metadata */}
        <section className="py-6">
          <h3 style={sectionHeaderStyle}>Assessment Metadata</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Assessment ID: </span>
              <span className="font-mono text-xs text-foreground">
                {MOCK_DETAIL.assessmentId}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Started: </span>
              <span className="text-foreground">{MOCK_DETAIL.startedAt}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Completed: </span>
              <span className="text-foreground">{MOCK_DETAIL.completedAt}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Total Captures: </span>
              <span className="text-foreground">{MOCK_DETAIL.captureCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Processing Status: </span>
              <span
                className={`font-medium ${
                  MOCK_DETAIL.status === "Analyzed"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {MOCK_DETAIL.status}
              </span>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Protocol */}
        <section className="py-6">
          <h3 style={sectionHeaderStyle}>Protocol</h3>
          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">
              {MOCK_DETAIL.protocol.name}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Movements
            </div>
            <ol className="list-decimal list-inside space-y-1.5">
              {MOCK_DETAIL.protocol.movements.map((movement, i) => (
                <li key={i} className="text-sm text-foreground">
                  {movement}
                </li>
              ))}
            </ol>
            <button className="mt-2 text-xs text-primary hover:underline inline-flex items-center gap-1">
              <ExternalLink size={11} />
              Open in Protocol Builder
            </button>
          </div>
        </section>

        <hr className="border-border" />

        {/* Quality Assurance */}
        <section className="py-6">
          <h3 style={sectionHeaderStyle}>Quality Assurance</h3>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-foreground">
              Pose QA:{" "}
              <span className="font-medium">
                {MOCK_DETAIL.qa.pose.passed}/{MOCK_DETAIL.qa.pose.total}
              </span>
            </div>
            <div className="text-sm text-foreground">
              Biomech QA:{" "}
              <span className="font-medium">
                {MOCK_DETAIL.qa.biomech.passed}/{MOCK_DETAIL.qa.biomech.total}
              </span>
            </div>
            <div className="text-sm text-foreground">
              Bat QA:{" "}
              <span className="font-medium">
                {MOCK_DETAIL.qa.bat.passed}/{MOCK_DETAIL.qa.bat.total}
              </span>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-sm">
              <span className="text-muted-foreground">Passed: </span>
              <span className="font-medium text-green-600">{MOCK_DETAIL.qaPassedCount}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Failed: </span>
              <span className="font-medium text-red-500">{MOCK_DETAIL.qaFailedCount}</span>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Capture-Level QA Table */}
        <section className="py-6">
          <h3 style={sectionHeaderStyle}>Capture QA</h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Capture
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Pose QA
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Biomech QA
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                    Bat QA
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DETAIL.captureQA.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 ${
                      i % 2 === 0 ? "bg-background" : "bg-card"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-foreground">{row.capture}</td>
                    <td className="px-4 py-2.5"><QAPill value={row.poseQA} /></td>
                    <td className="px-4 py-2.5"><QAPill value={row.biomechQA} /></td>
                    <td className="px-4 py-2.5"><QAPill value={row.batQA} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-border" />

        {/* Device Details */}
        <section className="py-6">
          <h3 style={sectionHeaderStyle}>Device Details</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Primary Device: </span>
              <span className="text-foreground">{MOCK_DETAIL.devices.primary}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Secondary Device: </span>
              <span className="text-foreground">{MOCK_DETAIL.devices.secondary}</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AssessmentDetailPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [selectedCaptureId, setSelectedCaptureId] = useState(
    MOCK_DETAIL.captures[0].id
  );

  const selectedCapture = MOCK_DETAIL.captures.find(
    (c) => c.id === selectedCaptureId
  )!;

  const TABS: { id: Tab; label: string }[] = [
    { id: "summary", label: "Summary" },
    { id: "captures", label: "Captures" },
    { id: "dashboard", label: "Dashboard" },
    { id: "details", label: "Details" },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">

      {/* ── Fixed Top: Breadcrumb + Header + Tabs ── */}
      <div className="flex-shrink-0 bg-background border-b border-border">

        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 pt-4">
          <button
            onClick={() => navigate("/assessments/")}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            Assessments
          </button>
        </div>

        {/* Header — two-zone layout */}
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-start justify-between gap-8">

          {/* Left — Identity */}
          <div className="flex flex-col gap-1">
            {/* Line 1: Athlete Name (link + icon) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate("/athletes/joe-baseball")}
                className="hover:underline transition-colors"
                style={{
                  fontFamily: SYSTEM_FONT,
                  fontStyle: "normal",
                  fontWeight: 700,
                  color: "rgb(9, 9, 11)",
                  fontSize: "24px",
                  lineHeight: "32px",
                }}
              >
                {MOCK_DETAIL.athleteName}
              </button>
              <ExternalLink
                size={14}
                style={{ color: BRAND_RED, flexShrink: 0, marginTop: "2px" }}
              />
            </div>

            {/* Line 2: Protocol Name */}
            <div
              style={{
                fontFamily: SYSTEM_FONT,
                fontStyle: "normal",
                fontWeight: 700,
                color: "rgb(9, 9, 11)",
                fontSize: "24px",
                lineHeight: "32px",
              }}
            >
              {MOCK_DETAIL.protocolName}
            </div>

            {/* Line 3: Date · Captures */}
            <div className="text-sm text-muted-foreground font-medium mt-1">
              {MOCK_DETAIL.date} · {MOCK_DETAIL.captureCount} Captures
            </div>

            {/* Line 4: Assessment ID */}
            <div
              style={{
                fontFamily: SYSTEM_FONT,
                fontStyle: "normal",
                fontWeight: 400,
                color: "rgb(113, 113, 122)",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              Assessment ID: {MOCK_DETAIL.assessmentId}
            </div>
          </div>

          {/* Right — Status + QA + Share */}
          <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                MOCK_DETAIL.status === "Analyzed"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-orange-50 text-orange-700 border-orange-200"
              }`}
            >
              {MOCK_DETAIL.status}
            </span>
            <div className="text-sm">
              <span className="text-muted-foreground">QA: </span>
              <span className="text-green-600 font-medium">
                {MOCK_DETAIL.qaPassedCount} Passed
              </span>
              <span className="text-muted-foreground"> · </span>
              <span className="text-red-500 font-medium">
                {MOCK_DETAIL.qaFailedCount} Failed
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 h-8">
              <Share2 size={13} />
              Share
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1440px] mx-auto px-6 flex">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px"
                style={{
                  borderBottomColor: isActive ? BRAND_RED : "transparent",
                  color: isActive ? BRAND_RED : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "hsl(215, 25%, 15%)";
                    (e.currentTarget as HTMLButtonElement).style.borderBottomColor =
                      "hsl(220, 10%, 84%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "";
                    (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "transparent";
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {activeTab === "summary" && (
          <div className="h-full overflow-y-auto">
            <SummaryTab />
          </div>
        )}
        {activeTab === "captures" && (
          <div className="h-full flex">
            <CapturesTab
              captures={MOCK_DETAIL.captures}
              selectedCaptureId={selectedCaptureId}
              onSelectCapture={setSelectedCaptureId}
              selectedCapture={selectedCapture}
            />
          </div>
        )}
        {activeTab === "dashboard" && (
          <div className="h-full overflow-hidden">
            <DashboardTab />
          </div>
        )}
        {activeTab === "details" && (
          <div className="h-full overflow-y-auto">
            <DetailsTab />
          </div>
        )}
      </main>
    </div>
  );
}
