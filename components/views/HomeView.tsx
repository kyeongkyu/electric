"use client";

import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { curriculum } from '@/data/content';
import { useAppStore } from '@/lib/store';
import { staggerItem } from './viewAnimations';
import type { BaseView, NavItem } from '@/lib/navigationTypes';

export function HomeView({ onNavigate, onPush }: { onNavigate: (v: BaseView) => void, onPush: (v: NavItem) => void }) {
  const completedLessons = useAppStore(state => state.completedLessons);
  const totalLessons = curriculum.flatMap(s => s.chapters.flatMap(c => c.lessons)).length;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="space-y-5 pb-[96px] pt-[16px] px-[20px]">
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
