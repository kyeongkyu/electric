const fs = require('fs');

const elecTheory = {
  id: "elec-theory-framework",
  title: "전기이론 틀잡기",
  description: "전기이론의 뼈대와 큰 흐름을 잡아주는 과정입니다.",
  icon: "zap",
  color: "bg-amber-600",
  chapters: [
    {
      id: "etf-a1",
      title: "A1. 장(Field) 관점으로 보는 전기현상",
      description: "전기현상을 바라보는 장의 관점",
      lessons: [
        "장의 개념", "전기장과 자기장의 차이", "전압/전위와 전기장의 관계",
        "전류와 자기장의 관계", "회로이론과 전자기학의 차이",
        "집중정수 모델과 실제 공간의 장", "에너지 분포로 보는 전기현상",
        "전기장·자기장·회로소자의 연결"
      ].map((title, i) => ({ id: `etf-a1-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a2",
      title: "A2. 정전계 핵심 구조",
      description: "정지한 전하에 의한 전기역학",
      lessons: [
        "전하와 전기력", "쿨롱의 법칙", "전기장", "전위", "전기력선",
        "등전위면", "전속과 전속밀도", "가우스 법칙", "도체 내부 전계", "유전체의 역할"
      ].map((title, i) => ({ id: `etf-a2-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a3",
      title: "A3. 정전용량과 유전체",
      description: "커패시터와 유전체의 특성",
      lessons: [
        "커패시터의 물리적 의미", "정전용량의 정의", "평행판 콘덴서",
        "유전체 삽입 효과", "유전율과 비유전율", "직렬 콘덴서", "병렬 콘덴서",
        "정전 에너지", "전기장 에너지 밀도", "실제 커패시터 응용"
      ].map((title, i) => ({ id: `etf-a3-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a4",
      title: "A4. 정자계 핵심 구조",
      description: "정상 전류가 만드는 자기 현상",
      lessons: [
        "자기장과 자속", "전류가 만드는 자기장", "비오-사바르 법칙의 의미",
        "앙페르 법칙의 의미", "자속밀도 B", "자계강도 H", "투자율",
        "솔레노이드", "토로이드", "자성체와 히스테리시스"
      ].map((title, i) => ({ id: `etf-a4-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a5",
      title: "A5. 전자력과 전자유도",
      description: "자기장 속의 힘과 운동에 의한 전자기 유도",
      lessons: [
        "로렌츠 힘", "전류가 받는 힘", "플레밍 왼손 법칙", "전동기 원리",
        "패러데이 전자유도 법칙", "렌츠의 법칙", "플레밍 오른손 법칙",
        "발전기 원리", "운동기전력", "와전류와 손실"
      ].map((title, i) => ({ id: `etf-a5-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a6",
      title: "A6. 인덕턴스와 자기회로",
      description: "인덕터의 특성과 자기회로 모델링",
      lessons: [
        "자체 인덕턴스", "상호 인덕턴스", "결합계수", "인덕터의 자기 에너지",
        "기자력", "자기저항", "자속", "자기회로와 전기회로의 대응",
        "공극이 있는 자기회로 맛보기", "변압기 기초"
      ].map((title, i) => ({ id: `etf-a6-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a7",
      title: "A7. 맥스웰 방정식 맛보기",
      description: "전자기학을 완성하는 4가지 방정식",
      lessons: [
        "맥스웰 방정식이 필요한 이유", "전기장에 대한 가우스 법칙", "자기장에 대한 가우스 법칙",
        "패러데이 법칙", "앙페르-맥스웰 법칙", "변위전류", "전자기파가 나오는 직관",
        "전기와 자기는 하나의 현상이라는 관점", "회로이론과 맥스웰 방정식의 관계"
      ].map((title, i) => ({ id: `etf-a7-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "etf-a8",
      title: "A8. 전기기기와 전력 시스템 연결",
      description: "전기공학의 실제 응용인 발전기, 전동기, 전력망의 기초",
      lessons: [
        "변압기 원리", "전동기 원리", "발전기 원리", "3상 전력의 의미",
        "회전자계", "역률과 무효전력", "송전에서 전압을 높이는 이유",
        "전선 손실과 효율", "실제 전력 시스템의 큰 흐름"
      ].map((title, i) => ({ id: `etf-a8-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    }
  ]
};

const circuitTheory = {
  id: "circuit-theory-framework",
  title: "회로이론 틀잡기",
  description: "회로이론의 전체적인 뼈대와 큰 흐름을 잡아주는 과정입니다.",
  icon: "brain-circuit",
  color: "bg-indigo-600",
  chapters: [
    {
      id: "ctf-b1",
      title: "B1. 회로 해석의 기본 언어",
      description: "회로를 모델링하고 해석하는 기초 언어",
      lessons: [
        "회로 모델의 의미", "집중정수 회로", "전압과 전류의 기준 방향",
        "수동부호규약", "노드, 가지, 루프, 메시", "독립전원", "종속전원",
        "선형소자와 비선형소자", "KCL의 의미", "KVL의 의미", "회로 해석 절차"
      ].map((title, i) => ({ id: `ctf-b1-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b2",
      title: "B2. 저항 회로 해석",
      description: "저항으로 구성된 직류 회로 해석",
      lessons: [
        "직렬 회로", "병렬 회로", "합성저항", "분압법칙", "분류법칙",
        "전원 변환", "등가저항", "입력저항", "브리지 회로", "Δ-Y 변환 맛보기",
        "DC 회로 대표 문제"
      ].map((title, i) => ({ id: `ctf-b2-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b3",
      title: "B3. 노드/메시 해석",
      description: "시스템적인 회로 방정식 체계 수립",
      lessons: [
        "노드 전압법", "기준 노드 선택", "KCL 방정식 작성", "슈퍼노드",
        "메시 전류법", "KVL 방정식 작성", "슈퍼메시", "종속전원 기초",
        "노드와 메시 중 선택 기준", "연립방정식 세우는 루틴"
      ].map((title, i) => ({ id: `ctf-b3-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b4",
      title: "B4. 회로 정리와 등가회로",
      description: "회로를 단순화하여 해석 효율 극대화",
      lessons: [
        "선형성", "중첩의 원리", "테브난 정리", "노턴 정리", "테브난/노턴 변환",
        "최대 전력 전달 정리", "입력저항", "출력저항", "소스 변환", "부하 관점 해석"
      ].map((title, i) => ({ id: `ctf-b4-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b5",
      title: "B5. 동적 소자와 1차 과도응답",
      description: "에너지 저장소자와 스위칭 상태 공간",
      lessons: [
        "커패시터의 i-v 관계", "인덕터의 v-i 관계", "초기조건", "연속성 조건",
        "DC 정상상태에서 C/L", "스위칭 순간 해석", "RC 자연응답", "RC 계단응답",
        "RL 자연응답", "RL 계단응답", "시정수", "초기값/최종값/완전응답"
      ].map((title, i) => ({ id: `ctf-b5-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b6",
      title: "B6. RLC와 2차 응답",
      description: "RLC가 모두 있는 회로의 진동과 감쇠",
      lessons: [
        "RLC 회로의 의미", "전기장 에너지와 자기장 에너지 교환",
        "2차 미분방정식의 의미", "자연주파수", "감쇠계수", "과감쇠", "임계감쇠",
        "부족감쇠", "공진", "Q factor", "응답 그래프 해석"
      ].map((title, i) => ({ id: `ctf-b6-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b7",
      title: "B7. 정현파 정상상태와 임피던스",
      description: "교류회로와 페이저 변환 기술",
      lessons: [
        "정현파 복습", "페이저 복습", "복소수 표현", "R 임피던스", "L 임피던스",
        "C 임피던스", "어드미턴스", "AC KCL/KVL", "RL 회로 해석", "RC 회로 해석",
        "RLC 회로 해석", "위상 해석"
      ].map((title, i) => ({ id: `ctf-b7-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b8",
      title: "B8. 교류 전력과 3상 회로",
      description: "교류에서의 전력 계산 기초와 3상",
      lessons: [
        "순간전력", "평균전력", "유효전력", "무효전력", "피상전력", "복소전력",
        "역률", "역률 개선", "평형 3상 회로", "Y결선", "Δ결선", "3상 전력"
      ].map((title, i) => ({ id: `ctf-b8-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b9",
      title: "B9. 라플라스와 주파수 응답 입문",
      description: "복소주파수 s영역 회로해석",
      lessons: [
        "라플라스 변환의 목적", "s-영역 회로 모델", "초기조건 포함 회로",
        "전달함수", "극점", "영점", "안정성 직관", "주파수 응답",
        "저역통과 필터", "고역통과 필터", "보드선도 기초", "시스템 관점의 회로"
      ].map((title, i) => ({ id: `ctf-b9-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    },
    {
      id: "ctf-b10",
      title: "B10. OP AMP와 실전 회로 맛보기",
      description: "연산증폭기를 이용한 능동회로의 구성",
      lessons: [
        "OP AMP의 역할", "이상적 OP AMP 가정", "가상단락", "가상접지",
        "반전 증폭기", "비반전 증폭기", "전압 팔로워", "가산 증폭기",
        "차동 증폭기 맛보기", "능동 필터 맛보기", "실제 소자의 한계"
      ].map((title, i) => ({ id: `ctf-b10-${i+1}`, title, content: "내용 준비 중입니다." })),
      quizzes: []
    }
  ]
};

const filePath = 'data/content.ts';
let content = fs.readFileSync(filePath, 'utf8');

const additionalContent = `
  ,
  ${JSON.stringify(elecTheory, null, 2)},
  ${JSON.stringify(circuitTheory, null, 2)}
];
`;

content = content.replace(/\];\s*$/, additionalContent);

fs.writeFileSync(filePath, content);
console.log('Curriculum updated.');
