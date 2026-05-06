"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { curriculum, type Quiz } from '@/data/content';
import { ChevronRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { LessonVisuals } from '@/components/Visualizations';
import { useAppStore } from '@/lib/store';
import { getLessonConceptQuestions } from '@/lib/questionBanks';
import type { NavItem } from '@/lib/navigationTypes';

export function LessonView({ id, subjectId, chapterId, onBack, onReplace }: { id: string, subjectId: string, chapterId: string, onBack: () => void, onReplace?: (view: any) => void }) {
  const markLessonComplete = useAppStore(state => state.markLessonComplete);
  const setLastAccessed = useAppStore(state => state.setLastAccessed);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const touchYRef = useRef<number | null>(null);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  useEffect(() => {
    setLastAccessed(subjectId, { type: 'lesson', id, chapterId, subjectId });
  }, [id, chapterId, subjectId, setLastAccessed]);

  useEffect(() => {
    const root = rootRef.current;
    const scrollParent = root?.closest('.overflow-y-auto') as HTMLElement | null;
    if (!scrollParent) return;

    const canScroll = () => scrollParent.scrollHeight > scrollParent.clientHeight + 8;
    const shouldAlwaysShow = () => !canScroll() || scrollParent.scrollTop < 12;

    const handleWheel = (event: WheelEvent) => {
      if (shouldAlwaysShow()) {
        setIsBottomNavVisible(true);
        return;
      }

      if (event.deltaY > 6) {
        setIsBottomNavVisible(false);
      } else if (event.deltaY < -6) {
        setIsBottomNavVisible(true);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (shouldAlwaysShow()) {
        setIsBottomNavVisible(true);
        touchYRef.current = event.touches[0]?.clientY ?? null;
        return;
      }

      const currentY = event.touches[0]?.clientY;
      const previousY = touchYRef.current;

      if (currentY == null || previousY == null) {
        touchYRef.current = currentY ?? null;
        return;
      }

      const deltaY = currentY - previousY;
      if (deltaY < -6) {
        setIsBottomNavVisible(false);
      } else if (deltaY > 6) {
        setIsBottomNavVisible(true);
      }

      touchYRef.current = currentY;
    };

    scrollParent.addEventListener('wheel', handleWheel, { passive: true });
    scrollParent.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollParent.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      scrollParent.removeEventListener('wheel', handleWheel);
      scrollParent.removeEventListener('touchstart', handleTouchStart);
      scrollParent.removeEventListener('touchmove', handleTouchMove);
    };
  }, [id]);
  
  const subject = curriculum.find(s => s.id === subjectId);
  const chapter = subject?.chapters.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === id);

  if (!lesson) return <div>Lesson not found</div>;
  const conceptQuestions = getLessonConceptQuestions(subjectId, lesson);

  const allLessons: {chapterId: string, id: string}[] = [];
  subject?.chapters.forEach(c => {
    c.lessons.forEach(l => {
        allLessons.push({ chapterId: c.id, id: l.id });
    });
  });
  const currentIndex = allLessons.findIndex(l => l.id === id);
  const prevContext = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextContext = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevContext && onReplace) {
      setIsBottomNavVisible(true);
      onReplace({ type: 'lesson', subjectId, chapterId: prevContext.chapterId, id: prevContext.id });
    }
  };

  const handleNext = () => {
    markLessonComplete(lesson.id);
    setIsBottomNavVisible(true);
    if (nextContext && onReplace) {
      onReplace({ type: 'lesson', subjectId, chapterId: nextContext.chapterId, id: nextContext.id });
    } else {
      onBack();
    }
  };

  return (
    <div ref={rootRef} className="min-h-full bg-[#fef5e7] dark:bg-[#030712] flex flex-col pointer-events-auto w-full pb-[96px]">
      <div className="fixed left-1/2 top-[18px] z-40 flex w-full max-w-md -translate-x-1/2 items-center gap-[10px] px-[18px] pointer-events-none">
        <button
          onClick={onBack}
          aria-label="뒤로가기"
          className="pointer-events-auto flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/30 text-[24px] font-black text-[#92400e] shadow-[0_16px_44px_rgba(15,23,42,.16),inset_0_1px_1px_rgba(255,255,255,.75)] backdrop-blur-[10px] backdrop-saturate-200 active:scale-95 dark:border-white/10 dark:bg-[#08111f]/30 dark:text-[#60a5fa] dark:shadow-[0_16px_44px_rgba(0,0,0,.38),inset_0_1px_1px_rgba(255,255,255,.1)]"
        >
          <span className="block leading-none -translate-x-[1px] -translate-y-[1px]">‹</span>
        </button>
        <div className="pointer-events-auto flex h-[46px] min-w-0 flex-1 items-center rounded-full border border-white/60 bg-white/30 px-[18px] shadow-[0_16px_44px_rgba(15,23,42,.16),inset_0_1px_1px_rgba(255,255,255,.75)] backdrop-blur-[10px] backdrop-saturate-200 dark:border-white/10 dark:bg-[#08111f]/30 dark:shadow-[0_16px_44px_rgba(0,0,0,.38),inset_0_1px_1px_rgba(255,255,255,.1)]">
          <h1 className="m-0 min-w-0 truncate text-[14px] font-black tracking-tight text-[var(--ink)] dark:text-[#e5f3ff]">
            {lesson.title}
          </h1>
        </div>
      </div>

      <article className="flex-1 px-[20px] pb-[152px] pt-[82px] text-[var(--ink)] dark:text-[#e5f3ff] leading-[1.85] tracking-[-0.015em]">
       <section className="border-b border-[#eadfce] dark:border-[#1e3a5f] pb-[18px] mb-[18px]">
         <div className="text-[11px] font-black text-[#b45309] dark:text-[#60a5fa] tracking-widest uppercase">Electrical Essentials</div>
         <h2 className="text-[30px] leading-[1.08] tracking-tight mt-[8px] mb-[10px] font-bold">{lesson.title}</h2>
         <p className="text-[13px] leading-[1.6] text-[#7c6f64] dark:text-[#7d91a8] m-0">핵심 개념과 공식을 완벽하게 이해해보세요.</p>
       </section>

       <nav className="flex gap-[8px] overflow-auto mx-[-20px] mb-[24px] px-[20px] hide-scrollbar">
         {['개념', '공식', '직관', '예제'].map(t => (
           <span key={t} className="whitespace-nowrap px-[13px] py-[10px] rounded-full border border-[#eadfce] dark:border-[#1e3a5f] bg-[#fffdf8] dark:bg-[#08111f] text-[11px] font-black text-[#7c2d12] dark:text-[#60a5fa]">{t}</span>
         ))}
       </nav>

      <LessonVisuals lessonId={lesson.id} />
      <MarkdownRenderer content={lesson.content} />
      <LessonConceptQuestions lessonId={lesson.id} questions={conceptQuestions} />
     </article>

      <motion.div
        animate={{ y: isBottomNavVisible ? 0 : 104, opacity: isBottomNavVisible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }}
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-[18px] pb-[calc(18px+env(safe-area-inset-bottom))] pt-[10px] z-40 bg-gradient-to-t from-[#fffcf5] dark:from-[#030712] via-[#fffcf5]/70 dark:via-[#030712]/70 to-transparent flex gap-[10px] pointer-events-none"
      >
        <button onClick={handlePrev} disabled={!prevContext} className="pointer-events-auto flex-1 h-[52px] rounded-full border border-white/60 bg-white/30 font-black text-[14px] text-[#92400e] shadow-[0_12px_32px_rgba(15,23,42,.12),inset_0_1px_1px_rgba(255,255,255,.75)] backdrop-blur-[10px] backdrop-saturate-200 disabled:opacity-45 disabled:active:scale-100 active:scale-[0.98] transition-transform dark:border-white/10 dark:bg-[#08111f]/30 dark:text-[#60a5fa] dark:shadow-[0_12px_32px_rgba(0,0,0,.28),inset_0_1px_1px_rgba(255,255,255,.1)]">
          이전 챕터
        </button>
        <button onClick={handleNext} className="pointer-events-auto flex-1 h-[52px] rounded-full border border-[#1f2937]/10 bg-[#1f2937]/90 font-black text-[14px] text-white shadow-[0_12px_32px_rgba(31,41,55,.18),inset_0_1px_1px_rgba(255,255,255,.16)] backdrop-blur-[10px] backdrop-saturate-200 active:scale-[0.98] transition-transform dark:border-white/20 dark:bg-[#22d3ee]/82 dark:text-[#030712] dark:shadow-[0_12px_32px_rgba(34,211,238,.22),inset_0_1px_1px_rgba(255,255,255,.24)]">
          {nextContext ? '다음 챕터' : '학습 완료'}
        </button>
      </motion.div>
   </div>
 );
}

function LessonConceptQuestions({ lessonId, questions }: { lessonId: string; questions: Quiz[] }) {
 const saveQuizResult = useAppStore(state => state.saveQuizResult);
 const [isOpen, setIsOpen] = useState(false);
 const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
 const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

 if (!questions.length) return null;

 const handleSelect = (quizId: string, index: number) => {
   if (revealedAnswers[quizId]) return;
   setSelectedAnswers(prev => ({ ...prev, [quizId]: index }));
 };

 const handleReveal = (quiz: Quiz) => {
   const selected = selectedAnswers[quiz.id];
   if (selected === undefined) return;
   setRevealedAnswers(prev => ({ ...prev, [quiz.id]: true }));
   saveQuizResult(`${lessonId}:${quiz.id}`, selected === quiz.correctAnswerIndex);
 };

 return (
   <section className="mt-10 border-t border-[#eadfce] dark:border-[#1e3a5f] pt-6">
     <button
       onClick={() => setIsOpen(open => !open)}
       className="w-full rounded-[20px] border border-[#eadfce] dark:border-[#1e3a5f] bg-[#fffdf8] dark:bg-[#08111f] px-5 py-4 text-left shadow-[var(--shadow)] active:scale-[0.99] transition-transform"
     >
       <div className="flex items-center justify-between gap-3">
         <div>
           <p className="m-0 text-[11px] font-black tracking-widest uppercase text-[#b45309] dark:text-[#60a5fa]">Lesson Check</p>
           <h3 className="m-0 mt-1 text-[17px] font-black text-[var(--ink)] dark:text-[#e5f3ff]">개념 문제 풀기</h3>
         </div>
         <span className="shrink-0 rounded-full bg-[#eff6ff] dark:bg-[#1e3a8a]/50 px-3 py-1.5 text-[12px] font-black text-[var(--blue)] dark:text-[var(--cyan)]">
           {questions.length}문제
         </span>
       </div>
     </button>

     <AnimatePresence initial={false}>
       {isOpen && (
         <motion.div
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: 'auto' }}
           exit={{ opacity: 0, height: 0 }}
           className="overflow-hidden"
         >
           <div className="mt-4 space-y-4">
             {questions.map((quiz, questionIndex) => {
               const selected = selectedAnswers[quiz.id];
               const isRevealed = Boolean(revealedAnswers[quiz.id]);
               const isCorrect = selected === quiz.correctAnswerIndex;

               return (
                 <div key={quiz.id} className="rounded-[24px] border border-[#eadfce] dark:border-[#1e3a5f] bg-[#fffdf8] dark:bg-[#08111f] p-5 shadow-[var(--shadow)]">
                   <p className="m-0 mb-4 text-[15px] font-black leading-[1.6] text-[var(--ink)] dark:text-[#e5f3ff]">
                     <span className="mr-2 text-[#b45309] dark:text-[#60a5fa]">Q{questionIndex + 1}.</span>
                     {quiz.question}
                   </p>
                   <div className="space-y-2">
                     {quiz.options.map((option, optionIndex) => {
                       let stateClass = 'border-[#eadfce] dark:border-[#1e3a5f] bg-[#fffcf5] dark:bg-[#030712] text-[var(--ink)] dark:text-[#e5f3ff]';
                       if (isRevealed && optionIndex === quiz.correctAnswerIndex) {
                         stateClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/25 text-emerald-900 dark:text-emerald-300 font-bold';
                       } else if (isRevealed && optionIndex === selected) {
                         stateClass = 'border-orange-500 bg-orange-50 dark:bg-orange-900/25 text-orange-900 dark:text-orange-300';
                       } else if (!isRevealed && selected === optionIndex) {
                         stateClass = 'border-[#2563eb] dark:border-[#22d3ee] bg-[#eff6ff] dark:bg-[#1e3a8a]/40 text-[#1d4ed8] dark:text-[#67e8f9] font-bold';
                       }

                       return (
                         <button
                           key={option}
                           disabled={isRevealed}
                           onClick={() => handleSelect(quiz.id, optionIndex)}
                           className={`w-full rounded-[16px] border px-4 py-3 text-left text-[14px] leading-[1.5] active:scale-[0.99] transition-transform ${stateClass}`}
                         >
                           {option}
                         </button>
                       );
                     })}
                   </div>

                   {!isRevealed ? (
                     <button
                       disabled={selected === undefined}
                       onClick={() => handleReveal(quiz)}
                       className="mt-4 w-full rounded-[18px] border-0 bg-[#1f2937] dark:bg-[#22d3ee] px-4 py-3 text-[14px] font-black text-white dark:text-[#030712] disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 active:scale-[0.99] transition-transform"
                     >
                       정답 확인
                     </button>
                   ) : (
                     <div className={`mt-4 rounded-[18px] border p-4 ${isCorrect ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20' : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'}`}>
                       <p className={`m-0 mb-1 text-[13px] font-black ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-orange-700 dark:text-orange-300'}`}>
                         {isCorrect ? '정답입니다' : '다시 짚어볼 부분이 있어요'}
                       </p>
                       <p className="m-0 text-[13px] leading-[1.6] text-[var(--ink)] dark:text-[#e5f3ff]">{quiz.explanation}</p>
                     </div>
                   )}
                 </div>
               );
             })}
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   </section>
 );
}

// --- Quiz View ---
