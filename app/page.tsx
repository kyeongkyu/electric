"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav } from '@/components/Navigation';
import { curriculum, type Chapter, type Lesson, type Quiz } from '@/data/content';
import {
  chapterConceptQuestions as electricalEssentialsChapterConceptQuestions,
  lessonConceptQuestions as electricalEssentialsLessonConceptQuestions,
} from '@/data/electricalEssentialsQuestions';
import {
  frameworkChapterConceptQuestions,
  frameworkLessonConceptQuestions,
} from '@/data/frameworkConceptQuestions';
import { useAppStore } from '@/lib/store';
import { ChevronRight, PlayCircle, CheckCircle2, Zap, Trophy, BrainCircuit, X, User, Sigma } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { LessonVisuals } from '@/components/Visualizations';

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

function getLessonConceptQuestions(subjectId: string, lesson: Lesson): Quiz[] {
  const bank = COURSE_QUESTION_BANKS[subjectId];
  if (!bank) return lesson.conceptQuestions || [];
  return lesson.conceptQuestions || bank.lessonQuestions[lesson.id] || [];
}

function getChapterConceptQuestions(subjectId: string, chapter?: Chapter): Quiz[] {
  if (!chapter) return [];
  const bank = COURSE_QUESTION_BANKS[subjectId];
  if (!bank) return chapter.quizzes || [];
  return chapter.quizzes.length > 0 ? chapter.quizzes : bank.chapterQuestions[chapter.id] || [];
}

export default function AppContainer() {
 const [mounted, setMounted] = useState(false);
 const [currentView, setCurrentView] = useState('home'); // 'home', 'subjects', 'profile'
 
 // Navigation stack for drill-down views (Subject -> Chapter -> Lesson)
 // Format: { type: 'subject' | 'chapter' | 'lesson' | 'quiz', id: string, parentId?: string }
 const [navStack, setNavStack] = useState<any[]>([]);

 // Prevent hydration mismatch for zustand persist
 useEffect(() => {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setMounted(true);
 }, []);

 const lastAccessed = useAppStore(state => state.lastAccessed);
 const [resumePrompt, setResumePrompt] = useState<{ subjectId: string, item: any } | null>(null);

 const pushView = (view: any) => {
   if (view.type === 'subject') {
     const lastItem = lastAccessed?.[view.id];
     if (lastItem) {
       setResumePrompt({ subjectId: view.id, item: lastItem });
       return;
     }
   }
   setNavStack([...navStack, view]);
 };
 const popView = () => setNavStack(navStack.slice(0, -1));
 const replaceView = (view: any) => setNavStack([...navStack.slice(0, -1), view]);

 const isBaseView = navStack.length === 0;

 // Derive Current Screen to render
 const currentScreen = isBaseView ? currentView : navStack[navStack.length - 1].type;
 
 const screenProps = isBaseView ? {} : navStack[navStack.length - 1];

 if (!mounted) return <div className="h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600"><Zap size={32} className="animate-pulse" /></div>;

 return (
 <div className="flex flex-col h-full bg-transparent relative">
 
 {/* Dynamic Content Area */}
 <div className="flex-1 overflow-y-auto overflow-x-hidden relative hide-scrollbar">
 <AnimatePresence mode="popLayout" initial={false}>
  <motion.div
  key={isBaseView ? currentView : `${screenProps.type}-${screenProps.id}`}
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.2 }}
  className="w-full h-full absolute inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar screen-pattern"
  >
 {isBaseView && currentView === 'home' && <HomeView onNavigate={(view) => { setCurrentView(view); }} onPush={pushView} />}
 {isBaseView && currentView === 'subjects' && <SubjectsView onPush={pushView} />}
 {isBaseView && currentView === 'formula' && <FormulaView />}
 {isBaseView && currentView === 'profile' && <ProfileView />}
 
 {/* Drill down views */}
 {!isBaseView && currentScreen === 'subject' && <SubjectDetail id={screenProps.id} onBack={popView} onPush={pushView} />}
 {!isBaseView && currentScreen === 'lesson' && <LessonView id={screenProps.id} subjectId={screenProps.subjectId} chapterId={screenProps.chapterId} onBack={popView} onReplace={replaceView} />}
 {!isBaseView && currentScreen === 'quiz' && <QuizView id={screenProps.id} chapterId={screenProps.chapterId} subjectId={screenProps.subjectId} onBack={popView} />}
 </motion.div>
 </AnimatePresence>
 </div>

 {/* Bottom Nav (Only visibly strictly on base views) */}
 <AnimatePresence>
 {isBaseView && (
 <motion.div
 initial={{ y: 100 }}
 animate={{ y: 0 }}
 exit={{ y: 100 }}
 transition={{ duration: 0.2 }}
 className="absolute bottom-0 w-full"
 >
 <BottomNav currentView={currentView} setView={setCurrentView} />
 </motion.div>
 )}
 </AnimatePresence>

 {resumePrompt && (
   <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
     <div className="bg-[var(--paper)] rounded-[28px] p-6 max-w-[340px] w-full shadow-[0_24px_80px_rgba(0,0,0,0.5)] border border-[var(--line)]">
       <h3 className="text-[20px] font-bold text-[var(--ink)] mb-2 tracking-tight">이어서 학습하시겠습니까?</h3>
       <p className="text-[14px] text-[var(--muted)] mb-6 leading-relaxed">
         이전에 진행 중이던 학습 기록이 있습니다. 마지막으로 본 위치에서 이어하시겠습니까?
       </p>
       <div className="flex gap-3">
         <button 
           onClick={() => {
             const subjId = resumePrompt.subjectId;
             setResumePrompt(null);
             setNavStack([...navStack, { type: 'subject', id: subjId }]);
           }}
           className="flex-1 py-3.5 rounded-[16px] font-bold text-[14px] bg-[var(--faint)] text-[var(--ink)] active:scale-95 transition-transform"
         >
           처음부터
         </button>
         <button 
           onClick={() => {
             const subjId = resumePrompt.subjectId;
             const item = resumePrompt.item;
             setResumePrompt(null);
             setNavStack([
               ...navStack,
               { type: 'subject', id: subjId },
               item
             ]);
           }}
           className="flex-1 py-3.5 rounded-[16px] font-bold text-[14px] bg-blue-500 text-white active:scale-95 transition-transform shadow-lg shadow-blue-500/20"
         >
           이어하기
         </button>
       </div>
     </div>
   </div>
 )}
 </div>
 );
}

// Animation Variants
const staggerContainer = {
 hidden: { opacity: 0 },
 show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const staggerItem = {
 hidden: { opacity: 0, scale: 0.95, y: 15 },
 show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

// --- Home Dashboard View ---
function HomeView({ onNavigate, onPush }: { onNavigate: (v: string) => void, onPush: (v: any) => void }) {
  const completedLessons = useAppStore(state => state.completedLessons);
  const totalLessons = curriculum.flatMap(s => s.chapters.flatMap(c => c.lessons)).length;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="space-y-5 pb-[118px] pt-[16px] px-[20px]">
      {/* Hero Card */}
      <motion.section variants={staggerItem} className="hero-pattern relative rounded-[32px] p-[22px] overflow-hidden text-white bg-[var(--hero-bg)] shadow-[0_24px_80px_rgba(37,99,235,.32)] dark:shadow-[0_24px_80px_rgba(0,0,0,.36)] dark:border dark:border-[#22d3ee]/20 min-h-[190px] mb-5">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase opacity-80 dark:text-[#67e8f9] dark:border dark:border-[#22d3ee]/30 dark:bg-[#22d3ee]/10 dark:px-2.5 dark:py-1.5 dark:rounded-full dark:inline-block dark:mb-2">Current Course</div>
              <h2 className="text-[20px] sm:text-[20px] font-bold tracking-tight mt-1 mb-2.5 leading-snug dark:text-white">전기공학 입문<br/>Essential Foundations</h2>
              <div className="font-mono text-[11px] mt-3 px-3 py-2.5 rounded-2xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 inline-block">
                V = IR · P = VI · KCL/KVL
              </div>
            </div>
            
            {/* Spark Icon */}
            <div className="w-[54px] h-[54px] rounded-[20px] bg-white/20 border border-white/30 flex items-center justify-center text-[26px] backdrop-blur-md dark:hidden">
              ⚡
            </div>
          </div>
          
          {/* Progress Meter */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-[30px] dark:hidden">
            <div className="h-full w-[18%] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,.8)]" style={{ width: `${progressPercent}%` }}></div>
          </div>
          
          <div className="flex justify-between text-[11px] font-extrabold mt-2.5 opacity-90 dark:hidden">
            <span>{completedLessons.length} / {totalLessons} 레슨 완료</span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </motion.section>

      {/* Recommended Area */}
      <motion.div variants={staggerItem}>
        <div className="flex items-end justify-between mx-0.5 mb-3 mt-1">
          <h3 className="text-[13px] font-black tracking-widest uppercase text-[var(--ink)]">다음 학습 추천</h3>
          <button 
            onClick={() => onNavigate('subjects')}
            className="text-[12px] font-black text-[var(--blue)] dark:text-[var(--cyan)] bg-transparent border-0 active:opacity-50"
          >
            전체 보기
          </button>
        </div>
        
        <button 
          onClick={() => onPush({ type: 'subject', id: 'electricity-theory' })}
          className="w-full grid grid-[max-content_1fr_max-content] gap-[14px] items-center bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-4 shadow-[var(--shadow)] mb-[18px] text-left"
          style={{ gridTemplateColumns: '58px 1fr auto' }}
        >
          <div className="w-[58px] h-[58px] rounded-[22px] bg-gradient-to-br from-[#f8fafc] to-[#eff6ff] dark:from-[#0f172a] dark:to-[#08111f] border border-[#dbeafe] dark:border-[#1e3a5f] flex items-center justify-center relative">
            <span className="text-[24px] font-black text-[var(--blue)] dark:text-[var(--cyan)] z-10">V</span>
            <div className="absolute w-[38px] h-[38px] border-2 border-[var(--blue)] dark:border-[var(--cyan)] rounded-full opacity-30"></div>
          </div>
          <div>
            <h4 className="text-[15px] sm:text-[14px] font-bold tracking-tight mb-1 text-[var(--ink)] mt-0">Chapter 2. 전압, 전류, 저항</h4>
            <p className="text-[12px] sm:text-[11px] leading-snug text-[var(--muted)] m-0">전위차와 기전력의 차이를 먼저 잡고 옴의 법칙으로</p>
          </div>
          <div className="w-[34px] h-[34px] rounded-[13px] bg-[#eff6ff] dark:bg-[#1e3a5f]/50 flex items-center justify-center text-[var(--blue)] dark:text-[var(--cyan)] font-black">
            ›
          </div>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.section variants={staggerItem} className="grid grid-cols-2 gap-3">
        <div className="bg-white/90 dark:bg-[#08111f]/80 border border-[var(--line)] rounded-[26px] p-4 min-h-[132px] shadow-[0_14px_42px_rgba(15,23,42,0.07)] dark:shadow-none relative overflow-hidden">
          <b className="block text-[22px] font-bold tracking-tight text-[var(--ink)]">19</b>
          <span className="block text-[11px] text-[var(--muted)] font-extrabold mt-1">전체 챕터</span>
          <svg width="120" height="90" className="absolute -right-3 -bottom-2.5 opacity-20 dark:opacity-30">
            <path d="M8 70 C30 10, 60 100, 112 30" stroke="currentColor" className="text-[var(--blue)] dark:text-[var(--cyan)]" strokeWidth="10" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div className="bg-white/90 dark:bg-[#08111f]/80 border border-[var(--line)] rounded-[26px] p-4 min-h-[132px] shadow-[0_14px_42px_rgba(15,23,42,0.07)] dark:shadow-none relative overflow-hidden">
          <b className="block text-[22px] font-bold tracking-tight text-[var(--ink)]">72%</b>
          <span className="block text-[11px] text-[var(--muted)] font-extrabold mt-1">퀴즈 정답률</span>
          <svg width="110" height="90" className="absolute -right-2 -bottom-2 opacity-80">
            <circle cx="55" cy="45" r="36" stroke="currentColor" className="text-[var(--green)]" strokeWidth="12" fill="none" />
          </svg>
        </div>
      </motion.section>
    </div>
  );
}

// --- Subjects List View ---
function SubjectsView({ onPush }: { onPush: (v: any) => void }) {
  const completedLessons = useAppStore(state => state.completedLessons);

  return (
    <div className="space-y-5 pb-[118px] pt-[16px] px-[20px]">
      <motion.div variants={staggerItem} className="flex items-end justify-between mx-0.5 mt-4 mb-3">
        <h3 className="text-[13px] font-black tracking-widest uppercase text-[var(--ink)]">과목별 학습 로드맵</h3>
        <button className="text-[12px] font-black text-[var(--blue)] dark:text-[var(--cyan)] bg-transparent border-0 active:opacity-50">정렬</button>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
        {curriculum.map((subj, index) => {
          const sLessons = subj.chapters.flatMap(c => c.lessons);
          const sCompleted = sLessons.filter(l => completedLessons.includes(l.id));
          const pct = sLessons.length === 0 ? 0 : Math.round((sCompleted.length / sLessons.length) * 100);

          return (
            <motion.div 
              variants={staggerItem} 
              key={subj.id}
              onClick={() => onPush({ type: 'subject', id: subj.id })}
              className="bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-5 shadow-[var(--shadow)] cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-[46px] h-[46px] rounded-[18px] bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] flex items-center justify-center text-[16px] font-black text-[#475569] dark:text-[#94a3b8]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-[12px] font-bold text-[var(--blue)] dark:text-[var(--cyan)] shadow-sm px-3 py-1.5 rounded-xl bg-[#eff6ff] dark:bg-[#1e3a8a]/50">
                  {pct}% 진행
                </div>
              </div>
              <h4 className="text-[17px] font-bold tracking-tight text-[var(--ink)] mb-1.5">{subj.title}</h4>
              <p className="text-[13px] leading-snug text-[var(--muted)] m-0">{subj.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// --- Subject Detail View ---
function SubjectDetail({ id, onBack, onPush, isTab = false }: { id: string, onBack: () => void, onPush: (v: any) => void, isTab?: boolean }) {
  const subject = curriculum.find(s => s.id === id);
  const completedLessons = useAppStore(state => state.completedLessons);

  if (!subject) return <div>과목을 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-full flex flex-col pb-[118px]">
      {/* Header Sticky */}
      {!isTab ? (
        <motion.header variants={staggerItem} className="sticky top-0 bg-[var(--nav-bg)] backdrop-blur-md z-20 px-[20px] py-[16px] flex items-center justify-between border-b border-[var(--line)]">
          <button onClick={onBack} className="w-[38px] h-[38px] rounded-[14px] bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-center font-black text-[#475569] dark:text-[#60a5fa] active:scale-95 transition-transform">
            ‹
          </button>
          <span className="font-bold text-[14px] text-[var(--ink)] tracking-tight">{subject.title}</span>
          <div className="w-[38px]"></div>
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
      <motion.section variants={staggerItem} className="mx-[20px] mt-4 relative rounded-[28px] p-[20px] pb-[18px] overflow-hidden text-white bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] dark:from-[#1e3a8a] dark:to-[#172554] shadow-[0_12px_40px_rgba(37,99,235,.25)] dark:shadow-[0_12px_40px_rgba(0,0,0,.3)] dark:border dark:border-[#3b82f6]/20 mb-6">
        <div className="relative z-10">
          <p className="text-[10px] font-black tracking-widest uppercase opacity-80 mb-1.5">{subject.chapters.length} Modules</p>
          <h2 className="text-[18px] font-bold tracking-tight mt-0 mb-1.5 leading-snug">{subject.title} 마스터하기</h2>
          <p className="text-[12px] opacity-90 leading-snug m-0">{subject.description}</p>
        </div>
      </motion.section>

      {/* Chapters (Path) */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mx-[20px] bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-[22px] border border-[var(--line)] rounded-[30px] p-2.5 sm:p-3 shadow-[var(--shadow)] pb-6">
        {subject.chapters.map((chapter, idx) => {
          const lessonIds = chapter.lessons.map(l => l.id);
          const chapterProgress = lessonIds.length === 0 ? 0 : 
            Math.round((lessonIds.filter(id => completedLessons.includes(id)).length / lessonIds.length) * 100);
          const chapterQuizzes = getChapterConceptQuestions(subject.id, chapter);

          return (
            <div key={chapter.id} className="border-b border-[#f1f5f9] dark:border-[#1e293b] last:border-0">
              <div className="py-3 px-1.5 sm:px-2 grid gap-3 items-center" style={{ gridTemplateColumns: '38px 1fr auto' }}>
                <div className="w-[38px] h-[38px] rounded-[14px] bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] flex items-center justify-center text-[11px] font-black text-[#475569] dark:text-[#94a3b8]">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0">
                  <h4 className="m-0 text-[13px] font-bold tracking-tight text-[var(--ink)] truncate">{chapter.title}</h4>
                  <p className="m-0 mt-1 text-[11px] text-[var(--muted)] truncate">해당 챕터의 수업과 퀴즈</p>
                </div>
                <div className="text-[11px] font-black text-[var(--blue)] dark:text-[var(--cyan)] shadow-sm px-2 py-1 rounded bg-[#eff6ff] dark:bg-[#1e3a8a]/50">
                  {chapterProgress}%
                </div>
              </div>
              
              <div className="pl-[50px] pr-2 pb-3 space-y-1">
                {chapter.lessons.map((lesson, lIdx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <div 
                      key={lesson.id} 
                      onClick={() => onPush({ type: 'lesson', id: lesson.id, subjectId: subject.id, chapterId: chapter.id })}
                      className={"flex items-center justify-between p-2.5 rounded-[14px] cursor-pointer active:scale-[0.98] transition-transform " + (isCompleted ? 'bg-[#f8fafc]/50 dark:bg-[#1e293b]/50' : 'bg-[#f8fafc] dark:bg-[#1e293b]')}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isCompleted ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></div>}
                        <h4 className={"text-[12px] truncate " + (isCompleted ? 'text-slate-400 dark:text-slate-500 font-medium' : 'text-slate-700 dark:text-slate-300 font-bold')}>{lesson.title}</h4>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 shrink-0 ml-2" />
                    </div>
                  );
                })}
                {chapterQuizzes.length > 0 && (
                  <div 
                    onClick={() => onPush({ type: 'quiz', id: chapter.id, chapterId: chapter.id, subjectId: subject.id })}
                    className="flex items-center justify-between p-2.5 rounded-[14px] cursor-pointer active:scale-[0.98] transition-transform bg-[#eff6ff] dark:bg-[#1e3a8a]/30 mt-1"
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
function LessonView({ id, subjectId, chapterId, onBack, onReplace }: { id: string, subjectId: string, chapterId: string, onBack: () => void, onReplace?: (view: any) => void }) {
  const markLessonComplete = useAppStore(state => state.markLessonComplete);
  const setLastAccessed = useAppStore(state => state.setLastAccessed);

  useEffect(() => {
    setLastAccessed(subjectId, { type: 'lesson', id, chapterId, subjectId });
  }, [id, chapterId, subjectId, setLastAccessed]);
  
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
      onReplace({ type: 'lesson', subjectId, chapterId: prevContext.chapterId, id: prevContext.id });
    }
  };

  const handleNext = () => {
    markLessonComplete(lesson.id);
    if (nextContext && onReplace) {
      onReplace({ type: 'lesson', subjectId, chapterId: nextContext.chapterId, id: nextContext.id });
    } else {
      onBack();
    }
  };

 return (
   <div className="min-h-full bg-[#fef5e7] dark:bg-[#030712] flex flex-col pointer-events-auto w-full pb-[80px]">
     <div className="sticky top-0 z-30 bg-[#fef5e7]/80 dark:bg-black/80 backdrop-blur-[18px] border-b border-[#eadfce]/70 dark:border-[#1e3a5f] px-[18px] py-[16px] flex items-center gap-[12px]">
       <button onClick={onBack} className="w-[38px] h-[38px] rounded-[15px] border border-[#eadfce] dark:border-[#1e3a5f] bg-[#fffdf8] dark:bg-[#08111f] flex items-center justify-center font-black text-[#b45309] dark:text-[#60a5fa] text-xl active:scale-95">
         ‹
       </button>
       <div className="flex-1 min-w-0">
         <h1 className="text-[14px] m-0 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis font-bold text-[var(--ink)] dark:text-[#e5f3ff]">{lesson.title}</h1>
         <p className="text-[10px] mt-[3px] text-[#7c6f64] dark:text-[#7d91a8] font-black tracking-widest uppercase">{chapter?.title}</p>
       </div>
       <div className="w-[54px] text-right text-[#b45309] dark:text-[#60a5fa] font-black text-[13px]">
         100%
       </div>
     </div>

     <article className="flex-1 px-[20px] py-[22px] pb-[180px] text-[var(--ink)] dark:text-[#e5f3ff] leading-[1.85] tracking-[-0.015em]">
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

     <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-[16px] px-[18px] pb-[22px] z-40 bg-gradient-to-t from-[#fffcf5] dark:from-[#030712] via-[#fffcf5]/80 dark:via-[#030712]/80 to-transparent flex gap-[10px] pointer-events-none">
       <button onClick={handlePrev} disabled={!prevContext} className="pointer-events-auto flex-1 h-[56px] bg-[#fffdf8] dark:bg-[#08111f] border border-[#eadfce] dark:border-[#1e3a5f] disabled:opacity-50 disabled:active:scale-100 rounded-[20px] font-black text-[14px] text-[#b45309] dark:text-[#60a5fa] hover:scale-[1.02] active:scale-[0.98] transition-transform">
         이전 챕터
       </button>
       <button onClick={handleNext} className="pointer-events-auto flex-1 h-[56px] bg-[#1f2937] dark:bg-[#22d3ee] text-[#ffffff] dark:text-[#030712] border-0 rounded-[20px] font-black text-[14px] shadow-[0_18px_45px_rgba(31,41,55,.25)] dark:shadow-[0_18px_45px_rgba(34,211,238,.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform">
         {nextContext ? '다음 챕터' : '학습 완료'}
       </button>
     </div>
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
function QuizView({ id, chapterId, subjectId, onBack }: { id: string, chapterId: string, subjectId: string, onBack: () => void }) {
 const setLastAccessed = useAppStore(state => state.setLastAccessed);

 useEffect(() => {
   if (subjectId) {
     setLastAccessed(subjectId, { type: 'quiz', id, chapterId, subjectId });
   }
 }, [id, chapterId, subjectId, setLastAccessed]);

 const subject = curriculum.find(s => s.id === subjectId);
 const chapter = subject?.chapters.find(c => c.id === chapterId);

 const quizzes = getChapterConceptQuestions(subjectId, chapter);
 
 const [currentIndex, setCurrentIndex] = useState(0);
 const [selectedOption, setSelectedOption] = useState<number | null>(null);
 const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

 const saveQuizResult = useAppStore(state => state.saveQuizResult);

 if (!quizzes.length) return <div>문제가 없습니다.</div>;

 const currentQuiz = quizzes[currentIndex];

 const handleSelect = (idx: number) => {
 if (isAnswerRevealed) return;
 setSelectedOption(idx);
 };

 const handleConfirm = () => {
 if (selectedOption === null) return;
 
 // Check answer
 setIsAnswerRevealed(true);
 const isCorrect = selectedOption === currentQuiz.correctAnswerIndex;
 saveQuizResult(currentQuiz.id, isCorrect);
 };

 const handleNext = () => {
 if (currentIndex < quizzes.length - 1) {
 setCurrentIndex(currentIndex + 1);
 setSelectedOption(null);
 setIsAnswerRevealed(false);
 } else {
 onBack(); // Finish
 }
 };

 const isCorrect = selectedOption === currentQuiz.correctAnswerIndex;

 return (
 <div className="min-h-full flex flex-col pb-[140px]">
 {/* Navbar Header */}
 <motion.header variants={staggerItem} className="sticky top-0 bg-[var(--nav-bg)] backdrop-blur-md z-20 px-[20px] py-[16px] border-b border-[var(--line)] flex items-center justify-between mb-6">
 <button onClick={onBack} className="w-[38px] h-[38px] rounded-[14px] bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-center font-black text-[#475569] dark:text-[#60a5fa] active:scale-95 transition-transform">
 <X size={20} />
 </button>
 <span className="font-bold text-[14px] text-[var(--ink)] tracking-tight">확인 문제 ({currentIndex + 1}/{quizzes.length})</span>
 <div className="w-[38px]"></div>
 </motion.header>

 {/* Progress Bar */}
 <motion.div variants={staggerItem} className="w-full bg-[#f1f5f9] dark:bg-[#1e293b] rounded-full h-[6px] overflow-hidden mx-[20px] max-w-[calc(100%-40px)]">
 <motion.div 
 className="h-full bg-[var(--blue)] dark:bg-[var(--cyan)] rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)] dark:shadow-[0_0_10px_rgba(34,211,238,0.4)]"
 initial={{ width: `${(currentIndex / quizzes.length) * 100}%` }}
 animate={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
 />
 </motion.div>

 <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex-1 pb-[80px] px-[20px]">
 <motion.h2 variants={staggerItem} className="text-[20px] font-bold text-[var(--ink)] leading-[1.6] mb-8 break-keep">
 <span className="text-[var(--blue)] dark:text-[var(--cyan)] mr-2 font-black">Q.</span>{currentQuiz.question}
 </motion.h2>

 <motion.div variants={staggerItem} className="space-y-3">
 {currentQuiz.options.map((option: string, idx: number) => {
 let stateClass = "bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-sm border-[var(--line)] text-[var(--ink)]";
 if (isAnswerRevealed) {
 if (idx === currentQuiz.correctAnswerIndex) {
 stateClass = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-400 font-bold"; 
 } else if (idx === selectedOption) {
 stateClass = "bg-orange-50 dark:bg-orange-900/30 border-orange-500 text-orange-900 dark:text-orange-400"; 
 } else {
 stateClass = "bg-white/50 dark:bg-[#0f172a]/50 border-[var(--line)] text-[var(--muted)] opacity-60"; 
 }
 } else if (selectedOption === idx) {
 stateClass = "bg-[#eff6ff] dark:bg-[#1e3a8a]/40 border-[var(--blue)] dark:border-[var(--cyan)] text-[var(--blue)] dark:text-[var(--cyan)] font-bold";
 }

 return (
 <button
 key={idx}
 disabled={isAnswerRevealed}
 onClick={() => handleSelect(idx)}
 className={`w-full text-left p-5 rounded-[24px] border border-[var(--line)] text-[15px] transition-all flex items-center justify-between shadow-[var(--shadow)] active:scale-[0.98] ${stateClass}`}
 >
 <span>{option}</span>
 {isAnswerRevealed && idx === currentQuiz.correctAnswerIndex && <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 flex-shrink-0 ml-2" size={24} />}
 {isAnswerRevealed && idx === selectedOption && idx !== currentQuiz.correctAnswerIndex && <X className="text-orange-500 dark:text-orange-400 flex-shrink-0 ml-2" size={24} />}
 </button>
 );
 })}
 </motion.div>

 {/* Explanation Bottom Sheet Area */}
 <AnimatePresence>
 {isAnswerRevealed && (
 <motion.div 
 initial={{ opacity: 0, y: 20, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 className={`mt-8 p-6 rounded-[28px] border ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'}`}
 >
 <h4 className={`text-[16px] font-black mb-2 ${isCorrect ? 'text-emerald-800 dark:text-emerald-400' : 'text-orange-800 dark:text-orange-400'}`}>
 {isCorrect ? '정답입니다! 🎉' : '아쉽네요! 다시 한번 생각해볼까요? 😅'}
 </h4>
 <p className="text-[14px] text-[var(--ink)] leading-[1.6] break-keep font-medium">
 {currentQuiz.explanation}
 </p>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>

 {/* Footer Action */}
 <div className="fixed bottom-0 left-0 right-0 p-4 pt-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)] to-transparent max-w-md mx-auto pb-[24px] pointer-events-none z-40">
 <div className="pointer-events-auto">
 {!isAnswerRevealed ? (
 <button 
 disabled={selectedOption === null}
 onClick={handleConfirm}
 className="w-full bg-[var(--ink)] dark:bg-[var(--cyan)] disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-[var(--paper)] dark:text-[#030712] rounded-[24px] py-[18px] font-black text-[16px] tracking-wide shadow-[0_18px_45px_rgba(31,41,55,.15)] dark:shadow-[0_18px_45px_rgba(34,211,238,.2)] transition-all active:scale-[0.98] border-0"
 >
 정답 확인
 </button>
 ) : (
 <button 
 onClick={handleNext}
 className="w-full bg-[var(--blue)] dark:bg-[var(--cyan)] text-white dark:text-[#030712] rounded-[24px] py-[18px] font-black text-[16px] tracking-wide shadow-[0_18px_45px_rgba(37,99,235,.25)] dark:shadow-[0_18px_45px_rgba(34,211,238,.3)] transition-all active:scale-[0.98] border-0"
 >
 {currentIndex < quizzes.length - 1 ? '다음 문제' : '퀴즈 완료'}
 </button>
 )}
 </div>
 </div>
 </div>
 );
}

import { useTheme } from 'next-themes';

// --- Formula View ---
function FormulaView() {
  return (
    <div className="flex flex-col gap-6 pointer-events-auto px-[20px] pt-[16px]">
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-[28px] font-black tracking-tight text-[#1f2937] dark:text-[#f3f4f6]">
          공식
        </h1>
      </header>
      <div className="flex flex-col justify-center items-center h-[300px] text-center gap-4">
        <div className="w-16 h-16 bg-[#e5e7eb] dark:bg-[#1f2937] rounded-full flex items-center justify-center">
          <Sigma className="text-gray-400" size={32} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#374151] dark:text-[#d1d5db]">공식 모음</h3>
          <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm mt-1">곧 업데이트 될 예정입니다.</p>
        </div>
      </div>
    </div>
  );
}

// --- Profile View ---
function ProfileView() {
  const { theme, setTheme } = useTheme();
  const resetProgress = useAppStore(state => state.resetProgress);
  const [showConfirm, setShowConfirm] = useState(false);

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'medium', label: 'Medium' },
    { id: 'dark', label: 'Dark' },
  ];

  const handleReset = () => {
    resetProgress();
    setShowConfirm(false);
  };

  return (
    <div className="space-y-8 pb-[118px] pt-[16px] px-[20px] relative">
      <motion.header variants={staggerItem} className="space-y-1">
        <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">PREFERENCES</p>
        <h1 className="text-[38px] font-bold tracking-tight text-[var(--ink)] leading-tight">Settings</h1>
      </motion.header>

      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">APPEARANCE</h3>
        
        <div className="bg-[var(--paper)] rounded-[28px] p-7 border border-[var(--line)] shadow-lg overflow-hidden">
          <h4 className="text-[18px] font-bold text-[var(--ink)] mb-10 mt-1 pl-1">Theme Mode</h4>
          
          <div className="bg-[var(--faint)] p-1.5 rounded-[22px] flex items-center relative">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex-1 py-3.5 px-4 rounded-[18px] text-[13px] font-bold transition-all duration-300 relative z-10 ${
                  theme === t.id 
                    ? 'text-blue-500 bg-[var(--bg)] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">DATA</h3>
        
        <div className="bg-[var(--paper)] rounded-[28px] p-7 border border-[var(--line)] shadow-lg overflow-hidden flex items-center justify-between">
          <div>
            <h4 className="text-[18px] font-bold text-[var(--ink)] mb-1">초기화</h4>
            <p className="text-[12px] text-slate-500">학습 기록 및 모든 진도율을 초기화합니다.</p>
          </div>
          <button 
            onClick={() => setShowConfirm(true)}
            className="px-5 py-3 rounded-[16px] font-bold text-[13px] bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20 active:scale-95 transition-transform shrink-0"
          >
            기록 초기화
          </button>
        </div>
      </motion.section>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[var(--paper)] rounded-[24px] p-6 max-w-[320px] w-full shadow-2xl border border-[var(--line)]">
            <h3 className="text-[18px] font-bold text-[var(--ink)] mb-2">초기화 확인</h3>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              학습 기록 및 모든 진도율을 완전히 초기화하시겠습니까?<br/>이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-[14px] font-bold text-[14px] bg-[var(--faint)] text-[var(--ink)] active:scale-95 transition-transform"
              >
                취소
              </button>
              <button 
                onClick={handleReset}
                className="flex-1 py-3 rounded-[14px] font-bold text-[14px] bg-red-500 text-white active:scale-95 transition-transform shadow-md shadow-red-500/20"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
