"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppStore } from '@/lib/store';
import { staggerItem } from './viewAnimations';

export function ProfileView() {
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
    <div className="space-y-8 pb-[96px] pt-[16px] px-[20px] relative">
      <motion.header variants={staggerItem} className="space-y-1">
        <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">PREFERENCES</p>
        <h1 className="text-[38px] font-bold tracking-tight text-[var(--ink)] leading-tight">Settings</h1>
      </motion.header>

      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">APPEARANCE</h3>
        
        <div className="bg-[var(--paper)] rounded-[28px] p-7 border border-[var(--line)] shadow-lg overflow-hidden">
          <h4 className="text-[18px] font-bold text-[var(--ink)] mb-10 mt-1 pl-1">Theme Mode</h4>
          
          <div className="relative flex items-center rounded-full border border-white/60 bg-white/30 p-1.5 shadow-[0_12px_34px_rgba(15,23,42,.12),inset_0_1px_1px_rgba(255,255,255,.72)] backdrop-blur-[10px] backdrop-saturate-200 dark:border-white/10 dark:bg-[#08111f]/30 dark:shadow-[0_12px_34px_rgba(0,0,0,.3),inset_0_1px_1px_rgba(255,255,255,.1)]">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative z-10 flex-1 rounded-full px-4 py-2.5 text-[12px] font-black transition-all duration-300 ${
                  theme === t.id 
                    ? 'bg-white/70 text-blue-600 shadow-[0_8px_22px_rgba(37,99,235,.18),inset_0_1px_1px_rgba(255,255,255,.85)] dark:bg-[#22d3ee]/18 dark:text-[#67e8f9] dark:shadow-[0_8px_22px_rgba(34,211,238,.14),inset_0_1px_1px_rgba(255,255,255,.12)]' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
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

