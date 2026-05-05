import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  completedLessons: string[];
  quizScores: Record<string, number>; // quizId -> score (0 or 1 basically, or the index of the answer chosen if we want to store that, but let's just store if they passed: 1 (passed), 0 (failed))
  lastAccessed: Record<string, { type: 'lesson' | 'quiz', id: string, chapterId: string, subjectId: string }>;
  markLessonComplete: (lessonId: string) => void;
  saveQuizResult: (quizId: string, passed: boolean) => void;
  getLessonProgress: (chapterId: string, allLessonIdsInChapter: string[]) => number;
  resetProgress: () => void;
  setLastAccessed: (subjectId: string, item: { type: 'lesson' | 'quiz', id: string, chapterId: string, subjectId: string }) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},
      lastAccessed: {},
      markLessonComplete: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),
      saveQuizResult: (quizId, passed) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [quizId]: passed ? 1 : 0,
          },
        })),
      getLessonProgress: (chapterId, allLessonIdsInChapter) => {
        const { completedLessons } = get();
        if (allLessonIdsInChapter.length === 0) return 0;
        const completedCount = allLessonIdsInChapter.filter(id => completedLessons.includes(id)).length;
        return (completedCount / allLessonIdsInChapter.length) * 100;
      },
      resetProgress: () => set({ completedLessons: [], quizScores: {}, lastAccessed: {} }),
      setLastAccessed: (subjectId, item) => 
        set((state) => ({
          lastAccessed: {
            ...state.lastAccessed,
            [subjectId]: item
          }
        })),
    }),
    {
      name: 'electric-school-storage',
    }
  )
);
