
export interface SkillStatus {
  skill: string;
  isMastered: boolean;
  repeatCount: number;
}

export interface LessonLog {
  id: string;
  date: string; // ISO string
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
}
