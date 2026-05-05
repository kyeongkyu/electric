"use client";

import { Home, BookOpen, User, Sigma } from "lucide-react";

export function BottomNav({ currentView, setView }: { currentView: string, setView: (v: string) => void }) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈', color: 'text-blue-600 dark:text-blue-400' },
    { id: 'subjects', icon: BookOpen, label: '학습', color: 'text-emerald-600 dark:text-emerald-400' },
    { id: 'formula', icon: Sigma, label: '공식', color: 'text-violet-600 dark:text-violet-400' },
    { id: 'profile', icon: User, label: '설정', color: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="absolute left-6 right-6 bottom-[24px] h-[60px] rounded-[30px] bg-white/50 dark:bg-[#020617]/20 border border-white/50 dark:border-white/10 backdrop-blur-lg backdrop-saturate-200 flex justify-around items-center shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`relative flex flex-col items-center justify-center gap-1.5 font-bold text-[10px] transition-colors w-16 h-full ${
              isActive 
                ? tab.color 
                : 'text-slate-600 dark:text-slate-400/80'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-sm' : ''} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
