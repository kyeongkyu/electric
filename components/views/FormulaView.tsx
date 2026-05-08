"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sigma } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { staggerContainer, staggerItem } from './viewAnimations';

export function FormulaView() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');

  const categories = ['전체', '기초', '회로', '저장/과도', '교류', '전자기', '시스템'];
  const formulas = [
    { category: '기초', title: '전류의 정의', formula: '$$I=\\frac{dQ}{dt}$$', unit: '$A=C/s$', meaning: '단위 시간 동안 기준 단면을 지나가는 전하량입니다.', example: '$2A$가 $3s$ 동안 흐르면 $Q=6C$입니다.', tags: ['전류', '전하', '암페어'] },
    { category: '기초', title: '전압의 정의', formula: '$$V=\\frac{W}{Q}$$', unit: '$V=J/C$', meaning: '단위 전하가 두 지점 사이에서 주고받는 에너지 차입니다.', example: '$9V$ 전지는 $1C$당 약 $9J$의 에너지를 공급합니다.', tags: ['전압', '전위차', '에너지'] },
    { category: '기초', title: '옴의 법칙', formula: '$$V=IR$$', unit: '$V=A\\cdot\\Omega$', meaning: '선형 저항에서 전압과 전류가 비례한다는 관계입니다.', example: '$5V$가 $1k\\Omega$에 걸리면 $I=5mA$입니다.', tags: ['옴', '저항', '전류'] },
    { category: '기초', title: '전력', formula: '$$P=VI$$', unit: '$W=V\\cdot A$', meaning: '에너지가 전달되거나 소비되는 속도입니다.', example: '$220V$, $2A$ 부하는 약 $440W$를 사용합니다.', tags: ['전력', '와트', '에너지'] },
    { category: '기초', title: '전기에너지', formula: '$$W=Pt$$', unit: '$J=W\\cdot s$', meaning: '전력과 사용 시간을 곱한 총 에너지입니다.', example: '$1kW$를 2시간 쓰면 $2kWh$입니다.', tags: ['에너지', '전력량', 'kWh'] },
    { category: '회로', title: '직렬 저항', formula: '$$R_s=R_1+R_2+\\cdots$$', unit: '$\\Omega$', meaning: '직렬 연결에서는 같은 전류가 흐르고 저항값은 더해집니다.', example: '$1k\\Omega+2k\\Omega=3k\\Omega$입니다.', tags: ['직렬', '합성저항'] },
    { category: '회로', title: '병렬 저항', formula: '$$\\frac{1}{R_p}=\\frac{1}{R_1}+\\frac{1}{R_2}+\\cdots$$', unit: '$\\Omega$', meaning: '병렬 연결에서는 같은 전압이 걸리고 전류 경로가 늘어납니다.', example: '$1k\\Omega$ 두 개 병렬은 $500\\Omega$입니다.', tags: ['병렬', '합성저항'] },
    { category: '회로', title: '분압 법칙', formula: '$$V_1=V_{in}\\frac{R_1}{R_1+R_2}$$', unit: '$V$', meaning: '직렬 저항에서 전압은 저항 크기에 비례해 나뉩니다.', example: '같은 저항 두 개면 입력 전압이 절반씩 나뉩니다.', tags: ['분압', '직렬'] },
    { category: '회로', title: '분류 법칙', formula: '$$I_1=I_{in}\\frac{R_2}{R_1+R_2}$$', unit: '$A$', meaning: '병렬 가지의 전류는 반대쪽 저항 비율로 나뉩니다.', example: '저항이 작은 가지에 더 큰 전류가 흐릅니다.', tags: ['분류', '병렬'] },
    { category: '회로', title: 'KCL', formula: '$$\\sum I_{in}=\\sum I_{out}$$', unit: '$A$', meaning: '노드에서 들어오는 전류와 나가는 전류의 합은 같습니다.', example: '$2A$와 $1A$가 들어오면 총 $3A$가 나가야 합니다.', tags: ['KCL', '노드', '전류법칙'] },
    { category: '회로', title: 'KVL', formula: '$$\\sum V_k=0$$', unit: '$V$', meaning: '닫힌 루프에서 전압 상승과 전압 강하의 합은 0입니다.', example: '전원 $10V$와 저항 전압강하 $10V$가 한 루프에서 균형을 이룹니다.', tags: ['KVL', '루프', '전압법칙'] },
    { category: '회로', title: '테브난/노턴 관계', formula: '$$V_{th}=I_N R_{th}$$', unit: '$V=A\\cdot\\Omega$', meaning: '같은 단자 특성을 갖는 전압원 등가와 전류원 등가 사이의 관계입니다.', example: '$R_{th}=2k\\Omega$, $I_N=5mA$이면 $V_{th}=10V$입니다.', tags: ['테브난', '노턴', '등가회로'] },
    { category: '저장/과도', title: '커패시터 전하', formula: '$$Q=CV$$', unit: '$C=F\\cdot V$', meaning: '정전용량은 같은 전압에서 저장되는 전하량을 정합니다.', example: '$10\\mu F$에 $5V$면 $50\\mu C$입니다.', tags: ['커패시터', '정전용량'] },
    { category: '저장/과도', title: '커패시터 전류', formula: '$$i=C\\frac{dv}{dt}$$', unit: '$A$', meaning: '커패시터 전류는 전압 변화율에 비례합니다.', example: '전압이 빠르게 변할수록 큰 전류가 흐릅니다.', tags: ['커패시터', '과도응답'] },
    { category: '저장/과도', title: '인덕터 전압', formula: '$$v=L\\frac{di}{dt}$$', unit: '$V$', meaning: '인덕터 전압은 전류 변화율에 비례합니다.', example: '$2H$에서 $1A/s$ 변화면 $2V$입니다.', tags: ['인덕터', '인덕턴스'] },
    { category: '저장/과도', title: 'RC 시정수', formula: '$$\\tau=RC$$', unit: '$s$', meaning: 'RC 회로가 새 정상상태로 접근하는 시간 척도입니다.', example: '$5\\tau$ 후에는 최종값에 거의 도달합니다.', tags: ['RC', '시정수', '과도'] },
    { category: '저장/과도', title: 'RL 시정수', formula: '$$\\tau=\\frac{L}{R}$$', unit: '$s$', meaning: 'RL 회로에서 전류가 변하는 속도를 정합니다.', example: '저항이 클수록 같은 인덕터의 시정수는 작아집니다.', tags: ['RL', '시정수', '과도'] },
    { category: '교류', title: '저항 임피던스', formula: '$$Z_R=R$$', unit: '$\\Omega$', meaning: '저항은 교류에서도 전압과 전류가 같은 위상입니다.', example: '순저항 부하는 역률이 1에 가깝습니다.', tags: ['임피던스', '저항'] },
    { category: '교류', title: '인덕터 임피던스', formula: '$$Z_L=j\\omega L$$', unit: '$\\Omega$', meaning: '인덕터 리액턴스는 주파수가 높을수록 커집니다.', example: '고주파에서 인덕터는 전류 변화를 더 강하게 막습니다.', tags: ['임피던스', '인덕터', '교류'] },
    { category: '교류', title: '커패시터 임피던스', formula: '$$Z_C=\\frac{1}{j\\omega C}$$', unit: '$\\Omega$', meaning: '커패시터 리액턴스의 크기는 주파수가 높을수록 작아집니다.', example: '고주파 신호는 커패시터를 더 쉽게 통과합니다.', tags: ['임피던스', '커패시터', '교류'] },
    { category: '교류', title: 'RMS', formula: '$$V_{rms}=\\frac{V_m}{\\sqrt{2}}$$', unit: '$V$', meaning: '정현파의 실효값은 같은 열효과를 내는 DC 값입니다.', example: '가정용 $220V$는 보통 RMS 값입니다.', tags: ['RMS', '실효값'] },
    { category: '교류', title: '공진주파수', formula: '$$\\omega_0=\\frac{1}{\\sqrt{LC}}$$', unit: '$rad/s$', meaning: 'RLC 회로에서 인덕터와 커패시터 리액턴스가 상쇄되는 각주파수입니다.', example: '$f_0=\\omega_0/(2\\pi)$로 Hz 값을 얻습니다.', tags: ['공진', 'RLC'] },
    { category: '교류', title: '복소전력', formula: '$$S=P+jQ=VI^*$$', unit: '$VA$', meaning: '유효전력과 무효전력을 복소수로 함께 표현합니다.', example: '$P$는 실제 소비, $Q$는 장에 왕복 저장되는 전력입니다.', tags: ['복소전력', '무효전력', '역률'] },
    { category: '전자기', title: '쿨롱 법칙', formula: '$$F=k\\frac{|q_1q_2|}{r^2}$$', unit: '$N$', meaning: '두 점전하 사이의 전기력 크기입니다.', example: '거리가 2배가 되면 힘은 1/4로 줄어듭니다.', tags: ['쿨롱', '전하', '전기력'] },
    { category: '전자기', title: '전기장', formula: '$$\\mathbf{E}=\\frac{\\mathbf{F}}{q}$$', unit: '$N/C=V/m$', meaning: '단위 양전하가 받는 힘입니다.', example: '전기장은 힘의 방향과 크기를 공간에 표시한 벡터장입니다.', tags: ['전기장', '장'] },
    { category: '전자기', title: '가우스 법칙', formula: '$$\\oint_S \\mathbf{D}\\cdot d\\mathbf{S}=Q_{free}$$', unit: '$C$', meaning: '닫힌 면을 통과하는 전속은 내부 자유전하와 같습니다.', example: '구대칭 문제에서 전기장 계산을 크게 줄여줍니다.', tags: ['가우스', '전속밀도'] },
    { category: '전자기', title: '앙페르 법칙', formula: '$$\\oint \\mathbf{H}\\cdot d\\mathbf{l}=I_{enc}$$', unit: '$A$', meaning: '전류가 순환하는 자기장을 만든다는 관계입니다.', example: '긴 직선 도선 주변 자기장은 원형으로 감깁니다.', tags: ['앙페르', '자기장'] },
    { category: '전자기', title: '패러데이 법칙', formula: '$$e=-N\\frac{d\\Phi}{dt}$$', unit: '$V$', meaning: '시간에 따라 변하는 자기선속은 유도전압을 만듭니다.', example: '자속 변화가 빠를수록 유도전압이 커집니다.', tags: ['패러데이', '유도'] },
    { category: '전자기', title: '로렌츠 힘', formula: '$$\\mathbf{F}=q(\\mathbf{E}+\\mathbf{v}\\times\\mathbf{B})$$', unit: '$N$', meaning: '전하가 전기장과 자기장 속에서 받는 힘입니다.', example: '자기력 방향은 속도와 자기장 모두에 수직입니다.', tags: ['로렌츠', '전자기력'] },
    { category: '시스템', title: '3상 전력', formula: '$$P_{3\\phi}=\\sqrt{3}V_LI_L\\cos\\phi$$', unit: '$W$', meaning: '평형 3상 부하의 유효전력입니다.', example: '선간전압과 선전류를 쓸 때 $\\sqrt{3}$ 계수가 붙습니다.', tags: ['3상', '전력'] },
    { category: '시스템', title: '역률', formula: '$$pf=\\cos\\phi=\\frac{P}{|S|}$$', unit: '무차원', meaning: '피상전력 중 실제 유효전력으로 쓰이는 비율입니다.', example: '역률이 낮으면 같은 전력에 더 큰 전류가 필요합니다.', tags: ['역률', '전력'] },
    { category: '시스템', title: '효율', formula: '$$\\eta=\\frac{P_{out}}{P_{in}}\\times100\\%$$', unit: '$\\%$', meaning: '입력 전력 중 출력으로 유용하게 전달된 비율입니다.', example: '$100W$ 입력, $85W$ 출력이면 효율은 $85\\%$입니다.', tags: ['효율', '손실'] },
    { category: '시스템', title: '이상 변압기 권수비', formula: '$$\\frac{V_1}{V_2}=\\frac{N_1}{N_2}$$', unit: '비율', meaning: '이상 변압기에서 전압비는 권수비와 같습니다.', example: '2차 권수가 절반이면 이상적으로 2차 전압도 절반입니다.', tags: ['변압기', '권수비'] },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filteredFormulas = formulas.filter(item => {
    const matchesCategory = activeCategory === '전체' || item.category === activeCategory;
    const haystack = [
      item.category,
      item.title,
      item.formula,
      item.unit,
      item.meaning,
      item.example,
      ...item.tags,
    ].join(' ').toLowerCase();

    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return (
    <div className="pointer-events-auto space-y-5 px-[20px] pb-[96px] pt-[16px]">
      <motion.header variants={staggerItem} className="space-y-2">
        <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">FORMULA DESK</p>
        <h1 className="text-[38px] font-black tracking-tight text-[var(--ink)] leading-tight">공식</h1>
        <p className="m-0 text-[13px] leading-[1.6] text-[var(--muted)]">
          전기공학과 회로이론에서 자주 쓰는 핵심 공식을 빠르게 찾고, 단위와 쓰임을 함께 확인합니다.
        </p>
      </motion.header>

      <motion.section variants={staggerItem} className="space-y-3">
        <div className="rounded-full border border-white/60 bg-white/30 px-4 py-2.5 shadow-[0_12px_34px_rgba(15,23,42,.12),inset_0_1px_1px_rgba(255,255,255,.72)] backdrop-blur-[10px] backdrop-saturate-200 dark:border-white/10 dark:bg-[#08111f]/30 dark:shadow-[0_12px_34px_rgba(0,0,0,.3),inset_0_1px_1px_rgba(255,255,255,.1)]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="공식, 단위, 키워드 검색"
            className="w-full border-0 bg-transparent text-[14px] font-bold text-[var(--ink)] outline-none placeholder:text-slate-400 dark:text-[#e5f3ff] dark:placeholder:text-slate-600"
          />
        </div>

        <div className="mx-[-20px] flex gap-1.5 overflow-x-auto px-[20px] pb-1 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-black transition-all active:scale-[0.98] ${
                activeCategory === category
                  ? 'border-white/55 bg-white/35 text-[var(--ink)] dark:border-white/15 dark:bg-white/10 dark:text-[#e5f3ff]'
                  : 'border-white/35 bg-white/10 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="m-0 text-[11px] font-black uppercase tracking-widest text-slate-500">Formula List</p>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-black text-blue-600 dark:bg-cyan-300/10 dark:text-[#67e8f9]">
            {filteredFormulas.length}개
          </span>
        </div>

        {filteredFormulas.length === 0 ? (
          <div className="rounded-[28px] border border-white/50 bg-white/25 p-8 text-center shadow-[0_14px_42px_rgba(15,23,42,.1)] backdrop-blur-[10px] dark:border-white/10 dark:bg-[#08111f]/30">
            <Sigma className="mx-auto mb-3 text-slate-400" size={30} />
            <h3 className="m-0 text-[16px] font-black text-[var(--ink)] dark:text-[#e5f3ff]">검색 결과가 없습니다</h3>
            <p className="m-0 mt-2 text-[13px] text-[var(--muted)]">다른 키워드나 카테고리로 다시 찾아보세요.</p>
          </div>
        ) : (
          filteredFormulas.map(item => (
            <motion.article
              key={`${item.category}-${item.title}`}
              variants={staggerItem}
              className="rounded-[28px] border border-white/50 bg-white/25 p-4 shadow-[0_14px_42px_rgba(15,23,42,.1),inset_0_1px_1px_rgba(255,255,255,.55)] backdrop-blur-[10px] backdrop-saturate-200 dark:border-white/10 dark:bg-[#08111f]/30 dark:shadow-[0_14px_42px_rgba(0,0,0,.3),inset_0_1px_1px_rgba(255,255,255,.08)]"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-black text-blue-600 dark:bg-cyan-300/10 dark:text-[#67e8f9]">
                    {item.category}
                  </span>
                  <h3 className="m-0 mt-2 text-[18px] font-black leading-snug tracking-tight text-[var(--ink)] dark:text-[#e5f3ff]">
                    {item.title}
                  </h3>
                </div>
                <Sigma className="mt-1 shrink-0 text-blue-500/70 dark:text-cyan-300/70" size={22} />
              </div>

              <div className="formula-card mb-4 rounded-[22px] border border-white/45 bg-white/30 px-4 py-3 text-[var(--ink)] shadow-[inset_0_1px_1px_rgba(255,255,255,.55)] dark:border-white/10 dark:bg-white/5 dark:text-[#e5f3ff]">
                <MarkdownRenderer content={item.formula} />
              </div>

              <div className="space-y-3">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-widest text-slate-500">의미</p>
                  <p className="m-0 mt-1 text-[13px] leading-[1.65] text-[var(--ink)] dark:text-[#dbeafe]">{item.meaning}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="rounded-[18px] bg-white/20 p-3 dark:bg-white/5">
                    <p className="m-0 text-[10px] font-black uppercase tracking-widest text-slate-500">단위 / 조건</p>
                    <div className="mt-1 text-[12px] font-bold text-[var(--ink)] dark:text-[#e5f3ff]">
                      <MarkdownRenderer content={item.unit} />
                    </div>
                  </div>
                  <div className="rounded-[18px] bg-white/20 p-3 dark:bg-white/5">
                    <p className="m-0 text-[10px] font-black uppercase tracking-widest text-slate-500">예제</p>
                    <div className="mt-1 text-[12px] leading-[1.6] text-[var(--ink)] dark:text-[#e5f3ff]">
                      <MarkdownRenderer content={item.example} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-slate-500/10 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))
        )}
      </motion.section>
    </div>
  );
}

// --- Profile View ---
