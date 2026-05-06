"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { curriculum } from '@/data/content';
import { useAppStore } from '@/lib/store';
import { getChapterConceptQuestions } from '@/lib/questionBanks';
import { staggerContainer, staggerItem } from './viewAnimations';

export function QuizView({ id, chapterId, subjectId, onBack }: { id: string, chapterId: string, subjectId: string, onBack: () => void }) {
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

