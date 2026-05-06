"use client";

export function LessonVisuals({ lessonId }: { lessonId: string }) {
 if (lessonId !== "ee-ch0-l3") {
  return null;
 }

 return <CircuitSymbolsAndFormulaVisual />;
}

const symbolCards = [
 {
  name: "전압원",
  role: "전하를 밀어주는 에너지 공급원",
  accent: "#2563eb",
  svg: (
   <svg viewBox="0 0 96 56" className="h-14 w-full" aria-hidden="true">
    <path d="M8 28H28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="48" cy="28" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
    <path d="M42 28H54M48 22V34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M66 28H88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
   </svg>
  ),
 },
 {
  name: "저항",
  role: "전류의 흐름을 제한하고 전압강하를 만든다",
  accent: "#dc2626",
  svg: (
   <svg viewBox="0 0 96 56" className="h-14 w-full" aria-hidden="true">
    <path d="M8 28H22L28 16L40 40L52 16L64 40L74 28H88" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
   </svg>
  ),
 },
 {
  name: "커패시터",
  role: "마주 보는 두 판 사이 전기장에 에너지를 저장",
  accent: "#0891b2",
  svg: (
   <svg viewBox="0 0 96 56" className="h-14 w-full" aria-hidden="true">
    <path d="M8 28H38M58 28H88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M40 12V44M56 12V44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
   </svg>
  ),
 },
 {
  name: "인덕터",
  role: "코일 주변 자기장에 에너지를 저장",
  accent: "#7c3aed",
  svg: (
   <svg viewBox="0 0 96 56" className="h-14 w-full" aria-hidden="true">
    <path d="M8 28H20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 28C20 16 36 16 36 28C36 16 52 16 52 28C52 16 68 16 68 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M68 28H88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
   </svg>
  ),
 },
 {
  name: "접지",
  role: "전압의 기준점, 보통 0 V로 잡는 지점",
  accent: "#475569",
  svg: (
   <svg viewBox="0 0 96 56" className="h-14 w-full" aria-hidden="true">
    <path d="M48 8V26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M30 26H66M36 36H60M42 46H54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
   </svg>
  ),
 },
 {
  name: "스위치",
  role: "회로를 열거나 닫아 전류 경로를 만든다",
  accent: "#16a34a",
  svg: (
   <svg viewBox="0 0 96 56" className="h-14 w-full" aria-hidden="true">
    <path d="M8 36H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="36" cy="36" r="4" fill="currentColor" />
    <circle cx="70" cy="36" r="4" fill="currentColor" />
    <path d="M40 34L66 18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M74 36H88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
   </svg>
  ),
 },
];

function CircuitSymbolsAndFormulaVisual() {
 return (
  <section className="my-8 space-y-5" aria-label="회로도 기호와 공식 변형 시각자료">
   <div className="rounded-2xl border border-[#eadfce] bg-[#fffdf8] p-5 shadow-sm dark:border-[#1e3a5f] dark:bg-[#08111f]">
    <div className="mb-4">
     <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">Schematic Symbols</p>
     <h3 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-50">회로도는 부품을 약속된 기호로 줄여 그린 지도입니다</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
      실제 부품 모양을 외우는 것보다, 기호가 회로 안에서 어떤 역할을 맡는지 먼저 잡으면 회로 읽기가 쉬워집니다.
     </p>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
     {symbolCards.map((card) => (
      <div
       key={card.name}
       className="min-h-40 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
       style={{ color: card.accent }}
      >
       <div className="rounded-lg bg-slate-50 py-2 dark:bg-slate-950/70">{card.svg}</div>
       <div className="mt-3 text-base font-bold text-slate-950 dark:text-slate-50">{card.name}</div>
       <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">{card.role}</p>
      </div>
     ))}
    </div>
   </div>

   <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="rounded-2xl border border-[#eadfce] bg-white p-5 pb-20 shadow-sm dark:border-[#1e3a5f] dark:bg-[#08111f] lg:pb-5">
     <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Reading A Circuit</p>
      <h3 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-50">닫힌 길이 있어야 전류가 흐릅니다</h3>
     </div>

     <svg viewBox="0 0 320 320" className="mt-5 h-auto w-full text-slate-800 dark:text-slate-100" role="img" aria-label="전압원, 스위치, 저항, 접지로 구성된 간단한 회로도">
      <defs>
       <marker id="eeCurrentArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M0 0L10 5L0 10Z" fill="#2563eb" />
       </marker>
      </defs>

      <path d="M84 242V88H140" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M194 88H236V242H84" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />

      <circle cx="84" cy="172" r="30" fill="#eff6ff" stroke="#2563eb" strokeWidth="5" />
      <path d="M72 172H96M84 160V184" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      <text x="50" y="133" className="fill-slate-700 text-sm font-bold dark:fill-slate-100">전압원</text>
      <text x="48" y="218" className="fill-blue-700 text-xs font-semibold dark:fill-blue-300">에너지 공급</text>

      <circle cx="150" cy="88" r="5" fill="currentColor" />
      <circle cx="188" cy="88" r="5" fill="currentColor" />
      <path d="M156 86L184 70" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
      <text x="130" y="54" className="fill-slate-700 text-sm font-bold dark:fill-slate-100">닫힌 스위치</text>
      <text x="134" y="116" className="fill-emerald-700 text-xs font-semibold dark:fill-emerald-300">길이 이어짐</text>

      <path d="M236 130V142L220 150L252 164L220 178L252 192L236 200V214" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="208" y="126" className="fill-slate-700 text-sm font-bold dark:fill-slate-100">저항 R</text>
      <text x="206" y="232" className="fill-red-700 text-xs font-semibold dark:fill-red-300">전압강하</text>

      <path d="M236 242V262" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M212 262H260M220 277H252M230 292H242" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <text x="197" y="313" className="fill-slate-700 text-sm font-bold dark:fill-slate-100">0 V 기준</text>

      <path d="M102 88H130" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" markerEnd="url(#eeCurrentArrow)" />
      <path d="M236 98V122" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" markerEnd="url(#eeCurrentArrow)" />
      <text x="52" y="78" className="fill-blue-700 text-sm font-bold dark:fill-blue-300">I 기준 방향</text>
     </svg>
     <p className="mt-3 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-blue-950/30 dark:text-slate-200">
      주의: 전류 방향은 관습적으로 +에서 -로 잡습니다. 전자의 평균 이동 방향과는 반대입니다.
     </p>
    </div>

    <div className="rounded-2xl border border-[#eadfce] bg-[#fffdf8] p-5 shadow-sm dark:border-[#1e3a5f] dark:bg-[#08111f]">
     <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-300">Formula Basics</p>
     <h3 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-50">공식 변형은 단위가 맞는지로 검산합니다</h3>

     <div className="mt-5 grid gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
       <div className="mx-auto grid h-44 w-44 place-items-center">
        <div className="relative h-40 w-40">
         <div className="absolute inset-0 [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-gradient-to-b from-blue-100 to-rose-100 dark:from-blue-950 dark:to-rose-950" />
         <div className="absolute left-1/2 top-8 -translate-x-1/2 text-3xl font-black text-blue-700 dark:text-blue-300">V</div>
         <div className="absolute bottom-8 left-9 text-2xl font-black text-emerald-700 dark:text-emerald-300">I</div>
         <div className="absolute bottom-8 right-8 text-2xl font-black text-red-700 dark:text-red-300">R</div>
         <div className="absolute left-7 right-7 top-[88px] h-0.5 bg-slate-500" />
         <div className="absolute bottom-7 left-1/2 h-12 w-0.5 -translate-x-1/2 bg-slate-500" />
        </div>
       </div>
       <p className="text-center text-sm font-semibold text-slate-700 dark:text-slate-200">가리면 남는 관계가 보입니다</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
       <FormulaCard formula="V = I x R" meaning="전압은 전류를 밀어 저항을 지날 때 필요한 에너지 차이" />
       <FormulaCard formula="I = V / R" meaning="같은 저항이면 전압이 클수록 전류가 커짐" />
       <FormulaCard formula="R = V / I" meaning="같은 전압에서 전류가 작으면 저항이 큼" />
       <FormulaCard formula="P = V x I" meaning="전력은 1초마다 전달되는 전기 에너지" />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}

function FormulaCard({ formula, meaning }: { formula: string; meaning: string }) {
 return (
  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
   <div className="font-mono text-lg font-bold text-slate-950 dark:text-slate-50">{formula}</div>
   <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">{meaning}</p>
  </div>
 );
}
