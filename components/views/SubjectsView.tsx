"use client";

import { motion } from 'motion/react';
import { curriculum } from '@/data/content';
import { useAppStore } from '@/lib/store';
import { staggerContainer, staggerItem } from './viewAnimations';
import type { NavItem } from '@/lib/navigationTypes';

export function SubjectsView({ onPush }: { onPush: (v: NavItem) => void }) {
  const completedLessons = useAppStore(state => state.completedLessons);

  return (
    <div className="space-y-5 pb-[96px] pt-[16px] px-[20px]">
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
