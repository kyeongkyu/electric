import type { Chapter, Lesson, Quiz } from '@/data/content';
import {
  chapterConceptQuestions as electricalEssentialsChapterConceptQuestions,
  lessonConceptQuestions as electricalEssentialsLessonConceptQuestions,
} from '@/data/electricalEssentialsQuestions';
import {
  frameworkChapterConceptQuestions,
  frameworkLessonConceptQuestions,
} from '@/data/frameworkConceptQuestions';

const COURSE_QUESTION_BANKS: Record<string, {
  lessonQuestions: Record<string, Quiz[]>;
  chapterQuestions: Record<string, Quiz[]>;
}> = {
  'electrical-essentials': {
    lessonQuestions: electricalEssentialsLessonConceptQuestions,
    chapterQuestions: electricalEssentialsChapterConceptQuestions,
  },
  'elec-theory-framework': {
    lessonQuestions: frameworkLessonConceptQuestions,
    chapterQuestions: frameworkChapterConceptQuestions,
  },
  'circuit-theory-framework': {
    lessonQuestions: frameworkLessonConceptQuestions,
    chapterQuestions: frameworkChapterConceptQuestions,
  },
};

export function getLessonConceptQuestions(subjectId: string, lesson: Lesson): Quiz[] {
  const bank = COURSE_QUESTION_BANKS[subjectId];
  if (!bank) return lesson.conceptQuestions || [];
  return lesson.conceptQuestions || bank.lessonQuestions[lesson.id] || [];
}

export function getChapterConceptQuestions(subjectId: string, chapter?: Chapter): Quiz[] {
  if (!chapter) return [];
  const bank = COURSE_QUESTION_BANKS[subjectId];
  if (!bank) return chapter.quizzes || [];
  return chapter.quizzes.length > 0 ? chapter.quizzes : bank.chapterQuestions[chapter.id] || [];
}
