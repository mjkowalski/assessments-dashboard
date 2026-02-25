import { Assessment } from "../types";

const firstNames = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
];

const protocols = [
  "Run Analysis",
  "Jump Assessment",
  "Strength Test",
  "Mobility Check",
  "Balance Evaluation",
];

const dimensionOptions = [
  "Velocity",
  "Angle",
  "Force",
  "Power",
  "Range of Motion",
  "Stability",
  "Acceleration",
  "Deceleration",
];

const qaStatuses: Array<"Passed" | "Failed" | "Mixed"> = [
  "Passed",
  "Failed",
  "Mixed",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomDate(daysBack: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
}

export function generateMockAssessments(count: number): Assessment[] {
  const assessments: Assessment[] = [];

  for (let i = 0; i < count; i++) {
    const dimensionCount = Math.floor(Math.random() * 4);
    assessments.push({
      date: getRandomDate(90),
      athleteFirstName: getRandomItem(firstNames),
      athleteLastName: getRandomItem(lastNames),
      protocolName: getRandomItem(protocols),
      status: Math.random() > 0.8 ? "Analyzing" : "Analyzed",
      dimensions:
        dimensionCount > 0
          ? getRandomItems(dimensionOptions, dimensionCount)
          : [],
      assessmentId: `#AS${(1000 + i).toString()}`,
      poseQA: getRandomItem(qaStatuses),
      biomechQA: getRandomItem(qaStatuses),
    });
  }

  return assessments.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}