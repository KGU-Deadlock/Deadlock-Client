export type ActivityLevel = "none" | "low" | "medium" | "high";

export interface StreakData {
  date: Date;
  activityLevel: ActivityLevel;
}

export interface StudySummary {
  consecutiveDays: number;
  solvedProblems: number;
  solvedFields: number;
}

export interface MonthlyStudyRecord {
  year: number;
  month: number;
  totalStudyCount: number;
  dailyRecords: Map<number, ActivityLevel>;
}
