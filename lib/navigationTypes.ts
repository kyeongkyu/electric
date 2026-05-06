export type BaseView = 'home' | 'subjects' | 'formula' | 'profile';

export type NavItem =
  | { type: 'subject'; id: string }
  | { type: 'lesson'; id: string; subjectId: string; chapterId: string }
  | { type: 'quiz'; id: string; subjectId: string; chapterId: string };
