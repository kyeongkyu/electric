"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { BottomNav } from '@/components/Navigation';
import { useAppStore } from '@/lib/store';
import type { BaseView, NavItem } from '@/lib/navigationTypes';
import { HomeView } from '@/components/views/HomeView';
import { SubjectsView } from '@/components/views/SubjectsView';
import { SubjectDetail } from '@/components/views/SubjectDetail';
import { LessonView } from '@/components/views/LessonView';
import { QuizView } from '@/components/views/QuizView';
import { FormulaView } from '@/components/views/FormulaView';
import { ProfileView } from '@/components/views/ProfileView';

export default function AppContainer() {
 const [mounted, setMounted] = useState(false);
 const [currentView, setCurrentView] = useState<BaseView>('home');
 
 // Navigation stack for drill-down views (Subject -> Chapter -> Lesson)
 // Format: { type: 'subject' | 'chapter' | 'lesson' | 'quiz', id: string, parentId?: string }
 const [navStack, setNavStack] = useState<NavItem[]>([]);

 // Prevent hydration mismatch for zustand persist
 useEffect(() => {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setMounted(true);
 }, []);

 const lastAccessed = useAppStore(state => state.lastAccessed);
 const [resumePrompt, setResumePrompt] = useState<{ subjectId: string; item: NavItem } | null>(null);

 const pushView = (view: NavItem) => {
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
 const replaceView = (view: NavItem) => setNavStack([...navStack.slice(0, -1), view]);

 const isBaseView = navStack.length === 0;

 // Derive Current Screen to render
 const currentNav = isBaseView ? null : navStack[navStack.length - 1];
 const currentScreen = currentNav?.type || currentView;

 if (!mounted) return <div className="h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600"><Zap size={32} className="animate-pulse" /></div>;

 return (
 <div className="flex flex-col h-full bg-transparent relative">
 
 {/* Dynamic Content Area */}
 <div className="flex-1 overflow-y-auto overflow-x-hidden relative hide-scrollbar">
 <AnimatePresence mode="popLayout" initial={false}>
  <motion.div
  key={currentNav ? `${currentNav.type}-${currentNav.id}` : currentView}
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
 {currentNav?.type === 'subject' && <SubjectDetail id={currentNav.id} onBack={popView} onPush={pushView} />}
 {currentNav?.type === 'lesson' && <LessonView id={currentNav.id} subjectId={currentNav.subjectId} chapterId={currentNav.chapterId} onBack={popView} onReplace={replaceView} />}
 {currentNav?.type === 'quiz' && <QuizView id={currentNav.id} chapterId={currentNav.chapterId} subjectId={currentNav.subjectId} onBack={popView} />}
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

