"use client";

import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { curriculum } from '@/data/content';
import { useAppStore } from '@/lib/store';
import { getChapterConceptQuestions } from '@/lib/questionBanks';
import { staggerContainer, staggerItem } from './viewAnimations';
import type { NavItem } from '@/lib/navigationTypes';

export function SubjectDetail({ id, onBack, onPush, isTab = false }: { id: string, onBack: () => void, onPush: (v: any) => void, isTab?: boolean }) {
  const subject = curriculum.find(s => s.id === id);
  const completedLessons = useAppStore(state => state.completedLessons);

  if (!subject) return <div>과목을 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-full flex flex-col pb-[96px]">
      {/* Header */}
      {!isTab ? (
        <motion.header variants={staggerItem} className="fixed left-1/2 top-[18px] z-40 flex w-full max-w-md -translate-x-1/2 items-center gap-[10px] px-[18px] pointer-events-none">
          <button
            onClick={onBack}
            aria-label="뒤로가기"
            className="pointer-events-auto flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/30 text-[24px] font-black text-[#92400e] shadow-[0_16px_44px_rgba(15,23,42,.16),inset_0_1px_1px_rgba(255,255,255,.75)] backdrop-blur-[10px] backdrop-saturate-200 active:scale-95 dark:border-white/10 dark:bg-[#08111f]/30 dark:text-[#60a5fa] dark:shadow-[0_16px_44px_rgba(0,0,0,.38),inset_0_1px_1px_rgba(255,255,255,.1)]"
          >
            <span className="block leading-none -translate-x-[1px] -translate-y-[1px]">‹</span>
          </button>
          <div className="pointer-events-auto flex h-[46px] min-w-0 flex-1 items-center rounded-full border border-white/60 bg-white/30 px-[18px] shadow-[0_16px_44px_rgba(15,23,42,.16),inset_0_1px_1px_rgba(255,255,255,.75)] backdrop-blur-[10px] backdrop-saturate-200 dark:border-white/10 dark:bg-[#08111f]/30 dark:shadow-[0_16px_44px_rgba(0,0,0,.38),inset_0_1px_1px_rgba(255,255,255,.1)]">
            <span className="min-w-0 truncate text-[14px] font-black tracking-tight text-[var(--ink)] dark:text-[#e5f3ff]">
              {subject.title}
            </span>
          </div>
        </motion.header>
      ) : (
        <motion.header variants={staggerItem} className="flex items-center justify-between mb-0 mt-3 px-[20px]">
          <h3 className="text-[13px] font-black tracking-widest uppercase text-[var(--ink)]">{subject.title.split('(')[0].trim()}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[var(--muted)]">학습 현황</span>
            <div className="w-8 h-1 px-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        </motion.header>
      )}

      {/* Subject Hero */}
      <motion.section variants={staggerItem} className={"mx-[20px] " + (!isTab ? "mt-[82px]" : "mt-4") + " relative rounded-[28px] p-[20px] pb-[18px] overflow-hidden text-white bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] dark:from-[#1e3a8a] dark:to-[#172554] shadow-[0_12px_40px_rgba(37,99,235,.25)] dark:shadow-[0_12px_40px_rgba(0,0,0,.3)] dark:border dark:border-[#3b82f6]/20 mb-6"}>
        <div className="relative z-10">
          <p className="text-[10px] font-black tracking-widest uppercase opacity-80 mb-1.5">{subject.chapters.length} Modules</p>
          <h2 className="text-[18px] font-bold tracking-tight mt-0 mb-1.5 leading-snug">{subject.title} 마스터하기</h2>
          <p className="text-[12px] opacity-90 leading-snug m-0">{subject.description}</p>
        </div>
      </motion.section>

      {/* Chapters (Path) */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mx-[20px] rounded-[30px] border border-white/60 bg-white/30 p-2.5 pb-4 shadow-[0_18px_50px_rgba(15,23,42,.14),inset_0_1px_1px_rgba(255,255,255,.75)] backdrop-blur-[10px] backdrop-saturate-200 sm:p-3 sm:pb-5 dark:border-white/10 dark:bg-[#08111f]/30 dark:shadow-[0_18px_50px_rgba(0,0,0,.34),inset_0_1px_1px_rgba(255,255,255,.1)]">
        {subject.chapters.map((chapter, idx) => {
          const lessonIds = chapter.lessons.map(l => l.id);
          const chapterProgress = lessonIds.length === 0 ? 0 : 
            Math.round((lessonIds.filter(id => completedLessons.includes(id)).length / lessonIds.length) * 100);
          const chapterQuizzes = getChapterConceptQuestions(subject.id, chapter);

          return (
            <div key={chapter.id} className="mb-2.5 rounded-[24px] border border-white/40 bg-white/25 shadow-[0_10px_30px_rgba(15,23,42,.08),inset_0_1px_1px_rgba(255,255,255,.55)] last:mb-0 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(0,0,0,.24),inset_0_1px_1px_rgba(255,255,255,.06)]">
              <div className="grid items-center gap-3 px-2.5 py-3" style={{ gridTemplateColumns: '38px 1fr auto' }}>
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/60 bg-white/30 text-[11px] font-black text-[#475569] shadow-[inset_0_1px_1px_rgba(255,255,255,.72)] backdrop-blur-[10px] dark:border-white/10 dark:bg-[#08111f]/30 dark:text-[#94a3b8] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.1)]">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0">
                  <h4 className="m-0 text-[13px] font-bold tracking-tight text-[var(--ink)] truncate">{chapter.title}</h4>
                  <p className="m-0 mt-1 text-[11px] text-[var(--muted)] truncate">해당 챕터의 수업과 퀴즈</p>
                </div>
                <div className="rounded-full border border-white/55 bg-white/30 px-2.5 py-1 text-[11px] font-black text-[var(--blue)] shadow-[inset_0_1px_1px_rgba(255,255,255,.65)] backdrop-blur-[10px] dark:border-white/10 dark:bg-[#08111f]/30 dark:text-[var(--cyan)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.1)]">
                  {chapterProgress}%
                </div>
              </div>
              
              <div className="space-y-1.5 pb-3 pl-[50px] pr-2.5">
                {chapter.lessons.map((lesson, lIdx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <div 
                      key={lesson.id} 
                      onClick={() => onPush({ type: 'lesson', id: lesson.id, subjectId: subject.id, chapterId: chapter.id })}
                      className={"flex cursor-pointer items-center justify-between rounded-[14px] border p-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,.42)] transition-transform active:scale-[0.98] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.05)] " + (isCompleted ? 'border-white/25 bg-white/15 dark:border-white/5 dark:bg-white/5' : 'border-white/40 bg-white/25 dark:border-white/10 dark:bg-white/5')}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isCompleted ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></div>}
                        <h4 className={"text-[12px] truncate " + (isCompleted ? 'text-slate-500/75 dark:text-slate-400/65 font-medium' : 'text-slate-700 dark:text-slate-300 font-bold')}>{lesson.title}</h4>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 shrink-0 ml-2" />
                    </div>
                  );
                })}
                {chapterQuizzes.length > 0 && (
                  <div 
                    onClick={() => onPush({ type: 'quiz', id: chapter.id, chapterId: chapter.id, subjectId: subject.id })}
                    className="mt-1 flex cursor-pointer items-center justify-between rounded-[14px] border border-blue-200/40 bg-blue-500/10 p-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,.36)] transition-transform active:scale-[0.98] dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.06)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Trophy size={14} className="text-blue-500 dark:text-[var(--cyan)] shrink-0" />
                      <h4 className="text-[12px] text-blue-700 dark:text-[var(--cyan)] font-bold truncate">개념 확인 문제 ({chapterQuizzes.length}문제)</h4>
                    </div>
                    <ChevronRight size={14} className="text-blue-300 dark:text-blue-500/50 shrink-0 ml-2" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  );
}

// --- Lesson View ---
