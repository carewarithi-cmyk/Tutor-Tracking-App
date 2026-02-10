
export interface SkillStatus {
  skill: string;
  isMastered: boolean;
  repeatCount: number;
  info?: string;
}

export interface LessonLog {
  id: string;
  date: string; // ISO string
  title?: string;
  notes: string;
}

export interface Student {
  id: string; // unique ID
  name: string;
  currentLevel: number; // 1-5
  levelProgress: {
    [level: number]: SkillStatus[];
  };
  lessonLogs: LessonLog[];
  tutoringDays: string[];
  quickNote?: string;
  lastLessonFocus?: string;
  nextLessonFocus?: string;
  currentBook?: string;
}

export interface QuickLink {
    id: string;
    title: string;
    url: string;
}

export interface GlobalSettings {
    todayPlan: string;
    tomorrowPlan: string;
    quickLinks: QuickLink[];
}