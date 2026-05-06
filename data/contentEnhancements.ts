import type { Subject } from '@/data/content';

const TARGET_SUBJECTS = new Set([
  'electrical-essentials',
  'elec-theory-framework',
  'circuit-theory-framework',
]);

type TopicGuide = {
  core: string;
  definition: string;
  formulas: string[];
  example: string;
  misconception: string;
};

const bySubject = {
  'electrical-essentials': {
    level: '노베이스 입문',
    lens: '용어의 뜻, 단위, 간단한 회로 읽기 순서',
    practice: '숫자를 크게 만들기보다 단위가 맞는지 먼저 확인한다.',
  },
  'elec-theory-framework': {
    level: '전기이론 틀잡기',
    lens: '장(field), 물질, 에너지, 법칙 사이의 연결',
    practice: '공식을 외우기 전에 어떤 공간 분포와 경계 조건을 가정하는지 먼저 본다.',
  },
  'circuit-theory-framework': {
    level: '회로이론 틀잡기',
    lens: '회로 모델, 기준 방향, 해석 절차, 근사 조건',
    practice: '회로를 단순화한 뒤 KCL/KVL, 등가회로, 시간/주파수 영역 중 맞는 도구를 고른다.',
  },
} as const;

function has(text: string, words: string[]) {
  return words.some(word => text.includes(word));
}

function guideFor(subjectId: string, title: string, chapterTitle: string): TopicGuide {
  const text = `${title} ${chapterTitle}`;

  if (has(text, ['전하', '전자', '전류'])) {
    return {
      core: '전하는 전기 현상을 만드는 기본 성질이고, 전류는 전하가 기준 단면을 지나가는 비율이다.',
      definition: '관습적 전류 방향은 양전하가 움직인다고 가정한 방향이며, 금속 도선 안 전자의 평균 드리프트 방향은 그 반대다.',
      formulas: ['$I=\\dfrac{dQ}{dt}$', '$Q=\\int i(t)\\,dt$', '$1\\,A=1\\,C/s$'],
      example: '$2\\,A$가 $3\\,s$ 동안 일정하면 지나간 전하는 $Q=It=6\\,C$이다.',
      misconception: '전류가 크다고 해서 전자가 빛처럼 빠르게 이동한다는 뜻은 아니다. 에너지 전달은 전자기장과 회로 전체의 반응으로 빠르게 형성된다.',
    };
  }

  if (has(text, ['전압', '전위', '기전력', '전위차'])) {
    return {
      core: '전압은 두 지점 사이에서 단위 전하가 주고받는 에너지 차이다.',
      definition: '전위는 기준점에 대한 에너지 상태이고, 전위차는 두 지점의 전위 차이며, 기전력은 전원이 전하를 높은 에너지 상태로 밀어 올리는 능력을 뜻한다.',
      formulas: ['$1\\,V=1\\,J/C$', '$V_{ab}=V_a-V_b$', '$v=\\dfrac{dw}{dq}$'],
      example: '$9\\,V$ 전지는 전하 $1\\,C$가 회로를 지날 때 이상적으로 $9\\,J$의 에너지를 공급할 수 있다는 뜻이다.',
      misconception: '전압을 단순히 힘이라고 부르면 방향, 기준점, 에너지 의미가 흐려진다. 정확히는 단위 전하당 에너지 차이다.',
    };
  }

  if (has(text, ['저항', '비저항', '옴', '전압강하'])) {
    return {
      core: '저항은 전류 흐름을 방해하면서 전기 에너지를 열 등으로 변환하는 성질이다.',
      definition: '옴의 법칙은 온도와 재료 상태가 거의 일정한 선형 저항에서 전압과 전류가 비례한다는 모델이다.',
      formulas: ['$V=IR$', '$R=\\rho\\dfrac{l}{A}$', '$P=I^2R=\\dfrac{V^2}{R}$'],
      example: '$5\\,V$가 걸린 $1\\,k\\Omega$ 저항에는 $I=5\\,mA$가 흐른다.',
      misconception: '모든 부품이 항상 $V=IR$을 따르는 것은 아니다. 다이오드, 램프, 온도 변화가 큰 부품은 비선형으로 동작할 수 있다.',
    };
  }

  if (has(text, ['직렬', '병렬', '합성', '개방', '단락'])) {
    return {
      core: '직렬은 같은 전류, 병렬은 같은 전압이 핵심 규칙이다.',
      definition: '개방회로는 경로가 끊겨 전류가 흐르지 않는 상태이고, 단락회로는 매우 작은 저항 경로가 생겨 큰 전류가 흐를 수 있는 상태다.',
      formulas: ['$R_s=R_1+R_2+\\cdots$', '$\\dfrac{1}{R_p}=\\dfrac{1}{R_1}+\\dfrac{1}{R_2}+\\cdots$', '$V=IR$'],
      example: '$1\\,k\\Omega$ 두 개를 직렬로 연결하면 $2\\,k\\Omega$, 병렬로 연결하면 $500\\,\\Omega$이다.',
      misconception: '병렬저항을 더하면 값이 커진다고 착각하기 쉽다. 병렬은 전류 길이 늘어나므로 합성저항이 가장 작은 가지보다 작아진다.',
    };
  }

  if (has(text, ['전력', '에너지', '효율', '손실', '역률'])) {
    return {
      core: '전력은 에너지가 전달되거나 소비되는 속도다.',
      definition: 'DC 회로에서는 $P=VI$가 기본이고, AC에서는 위상차 때문에 유효전력, 무효전력, 피상전력을 구분한다.',
      formulas: ['$P=VI$', '$W=Pt$', '$\\eta=\\dfrac{P_{out}}{P_{in}}\\times100\\%$', '$S=P+jQ$'],
      example: '$220\\,V$에서 $2\\,A$를 소비하고 역률이 1에 가까운 부하는 약 $440\\,W$를 사용한다.',
      misconception: '무효전력은 쓸모없는 전력이 아니라, 전기장과 자기장에 왕복 저장되는 에너지 흐름을 나타낸다.',
    };
  }

  if (has(text, ['KCL', 'KVL', '노드', '루프', '메시', '가지'])) {
    return {
      core: 'KCL은 전하 보존, KVL은 에너지 보존을 회로식으로 쓴 것이다.',
      definition: '노드는 같은 전위를 공유하는 연결점, 가지는 두 노드 사이 부품 경로, 루프는 닫힌 경로, 메시는 내부에 다른 루프가 없는 기본 루프다.',
      formulas: ['$\\sum i_{in}=\\sum i_{out}$', '$\\sum v_k=0$', '$Gv=i$'],
      example: '한 노드로 $2\\,A$와 $1\\,A$가 들어오면, 나가는 전류의 합은 $3\\,A$가 되어야 한다.',
      misconception: 'KVL의 전압 부호는 임의로 정한 순회 방향과 극성 기준에 따라 달라진다. 부호가 바뀌어도 일관되면 같은 답이 나온다.',
    };
  }

  if (has(text, ['노달', '메시', '중첩', '테브난', '노턴', '등가'])) {
    return {
      core: '해석법은 복잡한 회로를 적은 수의 미지수로 바꾸는 절차다.',
      definition: '노달 해석은 노드 전압을, 메시 해석은 메시 전류를 미지수로 삼는다. 테브난/노턴 등가는 외부 단자에서 같은 동작을 보이는 단순 모델이다.',
      formulas: ['$\\mathbf{G}\\mathbf{v}=\\mathbf{i}$', '$\\mathbf{R}\\mathbf{i}=\\mathbf{v}$', '$V_{th}=I_N R_{th}$'],
      example: '부하가 자주 바뀌는 회로는 먼저 테브난 등가로 바꾸면 부하 전류를 빠르게 다시 계산할 수 있다.',
      misconception: '등가회로는 모든 내부 물리량까지 같다는 뜻이 아니다. 지정한 단자에서 보이는 전압-전류 관계가 같다는 뜻이다.',
    };
  }

  if (has(text, ['커패시터', '정전용량', '유전체', '분극'])) {
    return {
      core: '커패시터는 분리된 전하가 만든 전기장에 에너지를 저장한다.',
      definition: '정전용량은 같은 전압에서 얼마나 많은 전하를 분리해 저장할 수 있는지를 나타내며, 유전체는 분극으로 전기장을 조절한다.',
      formulas: ['$Q=CV$', '$i=C\\dfrac{dv}{dt}$', '$W_E=\\dfrac{1}{2}CV^2$'],
      example: '$10\\,\\mu F$ 커패시터에 $5\\,V$를 걸면 $Q=50\\,\\mu C$가 저장된다.',
      misconception: '에너지가 절연체 물질 안에 덩어리처럼 저장되는 것이 아니라, 판 사이 공간에 형성된 전기장에 저장된다고 보는 것이 정확하다.',
    };
  }

  if (has(text, ['인덕터', '인덕턴스', '자기회로', '상호', '결합'])) {
    return {
      core: '인덕터는 전류가 만든 자기장에 에너지를 저장하고 전류 변화에 반대 방향의 전압을 만든다.',
      definition: '인덕턴스는 전류 변화가 자기선속과 유도전압으로 연결되는 정도이며, 결합계에서는 한 코일의 변화가 다른 코일에도 영향을 준다.',
      formulas: ['$v=L\\dfrac{di}{dt}$', '$W_B=\\dfrac{1}{2}Li^2$', '$v_2=M\\dfrac{di_1}{dt}$'],
      example: '$2\\,H$ 인덕터 전류가 $1\\,A/s$로 변하면 유도전압의 크기는 $2\\,V$이다.',
      misconception: '인덕터가 전류를 영원히 막는 부품은 아니다. DC 정상상태에서는 이상적인 인덕터 전압이 0에 가까워진다.',
    };
  }

  if (has(text, ['과도', '응답', '시정수', 'RC', 'RL', '초기', '최종'])) {
    return {
      core: '과도응답은 스위칭 직후 저장 에너지가 새 정상상태로 이동하는 과정이다.',
      definition: '커패시터 전압과 인덕터 전류는 순간적으로 뛰지 못하며, 1차 회로의 변화 속도는 시정수 $\\tau$가 정한다.',
      formulas: ['$\\tau=RC$', '$\\tau=\\dfrac{L}{R}$', '$x(t)=x(\\infty)+[x(0^+)-x(\\infty)]e^{-t/\\tau}$'],
      example: '$\\tau=2\\,ms$이면 약 $5\\tau=10\\,ms$ 뒤 최종값의 99% 근처에 도달한다.',
      misconception: '$5\\tau$는 수학적으로 완전히 끝났다는 뜻이 아니라 실무적으로 거의 끝났다고 보는 기준이다.',
    };
  }

  if (has(text, ['교류', '페이저', '임피던스', 'RLC', '공진', '주파수'])) {
    return {
      core: '교류 해석은 시간에 따라 변하는 정현파를 크기와 위상 정보로 압축해 다룬다.',
      definition: '페이저는 같은 주파수의 정현파를 복소수로 표현하는 도구이고, 임피던스는 교류에서 전압과 전류의 비를 나타낸다.',
      formulas: ['$Z_R=R$', '$Z_L=j\\omega L$', '$Z_C=\\dfrac{1}{j\\omega C}$', '$\\omega_0=\\dfrac{1}{\\sqrt{LC}}$'],
      example: '주파수가 올라가면 인덕터 리액턴스는 커지고 커패시터 리액턴스의 크기는 작아진다.',
      misconception: '페이저는 아무 파형에나 쓰는 그림이 아니라, 같은 주파수의 정현파 정상상태를 다룰 때 특히 강력하다.',
    };
  }

  if (has(text, ['전기장', '전속', '가우스', '쿨롱', '정전계'])) {
    return {
      core: '전기장은 전하가 주변 공간에 만드는 영향이고, 전속은 그 장을 면을 통과하는 양으로 세는 관점이다.',
      definition: '가우스 법칙은 닫힌 면을 통과하는 전속이 내부 자유전하와 연결된다는 법칙이다. 대칭성이 좋을 때 계산을 크게 단순화한다.',
      formulas: ['$\\mathbf{E}=\\dfrac{\\mathbf{F}}{q}$', '$\\mathbf{D}=\\epsilon\\mathbf{E}$', '$\\oint_S \\mathbf{D}\\cdot d\\mathbf{S}=Q_{free}$'],
      example: '구대칭 전하 분포는 구면을 가우스 면으로 잡으면 $E$의 크기가 면 전체에서 같아 계산이 쉬워진다.',
      misconception: '가우스 법칙은 항상 참이지만, 아무 면이나 잡아도 계산이 쉬운 것은 아니다. 대칭성이 핵심이다.',
    };
  }

  if (has(text, ['자기장', '앙페르', '비오', '사바르', '자성체', '자속'])) {
    return {
      core: '자기장은 움직이는 전하와 전류 주변에 생기는 장이며, 자속은 면을 통과하는 자기장의 양을 나타낸다.',
      definition: '앙페르 법칙은 전류와 순환하는 자기장의 관계를 보여 주고, 비오-사바르 법칙은 전류 요소가 만드는 자기장을 적분해 구한다.',
      formulas: ['$\\oint \\mathbf{H}\\cdot d\\mathbf{l}=I_{enc}$', '$\\mathbf{B}=\\mu\\mathbf{H}$', '$\\Phi=\\int \\mathbf{B}\\cdot d\\mathbf{S}$'],
      example: '긴 직선 도선 주위의 자기장은 도선을 중심으로 동심원 방향으로 감긴다.',
      misconception: '$B$와 $H$를 같은 양으로 보면 자성체 해석에서 혼란이 생긴다. $H$는 원인 쪽, $B$는 매질 반응까지 포함한 자속밀도 쪽으로 본다.',
    };
  }

  if (has(text, ['로렌츠', '전자기력', '힘', '모터'])) {
    return {
      core: '전하와 전류는 전기장과 자기장 속에서 힘을 받으며, 이 힘이 모터와 계측기의 기본 원리다.',
      definition: '전기력은 전하의 위치와 관계되고, 자기력은 움직이는 전하의 속도 방향과 자기장 방향의 벡터곱으로 정해진다.',
      formulas: ['$\\mathbf{F}=q(\\mathbf{E}+\\mathbf{v}\\times\\mathbf{B})$', '$\\mathbf{F}=I\\mathbf{l}\\times\\mathbf{B}$'],
      example: '자기장에 수직으로 놓인 도선에 전류가 흐르면 도선은 전류와 자기장 모두에 수직인 방향의 힘을 받는다.',
      misconception: '오른손 법칙은 방향을 기억하는 도구일 뿐이다. 실제 부호와 방향은 벡터식과 전하 부호를 함께 확인해야 한다.',
    };
  }

  if (has(text, ['패러데이', '유도', '렌츠', '발전기'])) {
    return {
      core: '시간에 따라 변하는 자기선속은 전기장을 만들고 회로에 유도전압을 만든다.',
      definition: '패러데이 법칙은 자기선속 변화율과 유도기전력의 관계를, 렌츠 법칙은 그 방향이 원인 변화에 반대됨을 말한다.',
      formulas: ['$e=-N\\dfrac{d\\Phi}{dt}$', '$\\nabla\\times\\mathbf{E}=-\\dfrac{\\partial\\mathbf{B}}{\\partial t}$'],
      example: '코일을 지나는 자속이 빠르게 변할수록 유도전압의 크기가 커진다.',
      misconception: '유도는 단순히 자석이 가까이 있어서 생기는 것이 아니라, 회로를 지나는 자기선속이 시간적으로 변할 때 생긴다.',
    };
  }

  if (has(text, ['맥스웰', '전자기파', '파동', '포인팅'])) {
    return {
      core: '맥스웰 방정식은 전기장과 자기장을 하나의 전자기 현상으로 묶는다.',
      definition: '변하는 전기장은 자기장을 만들고, 변하는 자기장은 전기장을 만들며, 이 결합이 공간으로 전파되면 전자기파가 된다.',
      formulas: ['$\\nabla\\cdot\\mathbf{D}=\\rho$', '$\\nabla\\cdot\\mathbf{B}=0$', '$\\nabla\\times\\mathbf{H}=\\mathbf{J}+\\dfrac{\\partial\\mathbf{D}}{\\partial t}$', '$\\mathbf{S}=\\mathbf{E}\\times\\mathbf{H}$'],
      example: '전송선 주변의 전기장과 자기장이 함께 에너지를 운반하며, 포인팅 벡터는 그 에너지 흐름 방향을 나타낸다.',
      misconception: '전기 에너지가 도선 금속 내부로만 이동한다고 보면 고주파와 전력 전달을 제대로 설명하기 어렵다. 장의 관점이 필요하다.',
    };
  }

  if (has(text, ['라플라스', '전달함수', '극점', '영점', '보드'])) {
    return {
      core: '라플라스 해석은 미분방정식을 대수방정식으로 바꾸어 과도응답과 주파수응답을 함께 다루게 한다.',
      definition: '전달함수는 입력과 출력의 비를 $s$ 영역에서 표현한 것이며, 극점과 영점은 응답의 형태와 안정성을 결정한다.',
      formulas: ['$H(s)=\\dfrac{Y(s)}{X(s)}$', '$s=\\sigma+j\\omega$', '$20\\log_{10}|H(j\\omega)|$'],
      example: '1차 저역통과 회로는 차단주파수 이후 보드 크기선도가 대략 $-20\\,dB/dec$로 감소한다.',
      misconception: '$s$ 영역은 단순 계산 꼼수가 아니라 시간 변화와 주파수 성질을 한 좌표에서 보는 모델이다.',
    };
  }

  if (has(text, ['OP AMP', '연산증폭기', '증폭기', '필터'])) {
    return {
      core: 'OP AMP는 큰 이득과 피드백을 이용해 원하는 전압 관계를 만드는 회로 블록이다.',
      definition: '이상적인 OP AMP 근사는 입력 전류 0, 음귀환 시 두 입력 단자 전압이 거의 같다는 가상단락 조건을 사용한다.',
      formulas: ['$v_+\\approx v_-$', '$i_+\\approx i_-\\approx0$', '$A_v=-\\dfrac{R_f}{R_{in}}$'],
      example: '반전 증폭기에서 $R_f=10\\,k\\Omega$, $R_{in}=1\\,k\\Omega$이면 이상 이득은 $-10$이다.',
      misconception: '가상단락은 실제로 두 단자가 도선으로 연결되었다는 뜻이 아니다. 음귀환이 있을 때 전압 차가 매우 작아진다는 근사다.',
    };
  }

  if (has(text, ['3상', 'Y', 'Delta', '전력 시스템', '전기기기'])) {
    return {
      core: '3상 시스템은 위상이 120도씩 다른 세 전압을 이용해 전력을 안정적이고 효율적으로 전달한다.',
      definition: 'Y와 Delta 결선은 선간전압, 상전압, 선전류, 상전류의 관계가 다르므로 기준을 분명히 잡아야 한다.',
      formulas: ['$P_{3\\phi}=\\sqrt{3}V_L I_L \\cos\\phi$', '$V_L=\\sqrt{3}V_{ph}\\;\\text{(Y 결선)}$'],
      example: '평형 3상 부하에서는 한 상만 해석한 뒤 대칭 관계로 전체 전력을 구할 수 있다.',
      misconception: '3상은 단순히 선이 3개라는 뜻이 아니라 위상 관계가 정해진 세 전압원을 함께 쓰는 시스템이다.',
    };
  }

  if (subjectId === 'circuit-theory-framework') {
    return {
      core: '회로이론은 실제 전기 현상을 부품 모델과 연결 관계로 단순화해 예측 가능한 식으로 만드는 학문이다.',
      definition: '먼저 기준 전압과 전류 방향을 정하고, 부품 법칙과 KCL/KVL을 결합해 미지수를 구한다.',
      formulas: ['$v=Ri$', '$i=C\\dfrac{dv}{dt}$', '$v=L\\dfrac{di}{dt}$', '$\\sum i=0$, $\\sum v=0$'],
      example: '복잡해 보이는 회로도 노드와 가지를 표시하면 어떤 식을 세워야 하는지 훨씬 분명해진다.',
      misconception: '공식을 많이 외우는 것보다 기준 방향을 일관되게 잡고 식을 세우는 습관이 더 중요하다.',
    };
  }

  if (subjectId === 'elec-theory-framework') {
    return {
      core: '전기이론은 회로 안 숫자 뒤에 있는 장, 물질, 에너지의 원리를 설명한다.',
      definition: '전기장과 자기장은 공간에 분포하며, 물질의 성질과 경계 조건에 따라 전압, 전류, 힘, 에너지 전달이 달라진다.',
      formulas: ['$\\mathbf{F}=q\\mathbf{E}$', '$\\mathbf{B}=\\mu\\mathbf{H}$', '$\\mathbf{S}=\\mathbf{E}\\times\\mathbf{H}$'],
      example: '같은 전압이라도 절연체, 도체, 공기 간격이 달라지면 전기장 분포와 저장 에너지가 달라진다.',
      misconception: '장을 그림의 보조선 정도로 보면 안 된다. 장은 힘과 에너지 전달을 계산하는 실제 물리량이다.',
    };
  }

  return {
    core: '이 레슨은 전기공학의 기본 개념을 회로 해석과 실제 시스템으로 연결하는 발판이다.',
    definition: '용어의 정의, 단위, 기준 방향을 먼저 고정한 뒤 공식은 그 정의에서 나온 관계식으로 이해한다.',
    formulas: ['$V=IR$', '$P=VI$', '$W=Pt$'],
    example: '값을 대입하기 전에 단위가 서로 맞는지 확인하면 대부분의 초급 계산 실수를 줄일 수 있다.',
    misconception: '공식만 외우면 조건이 바뀐 문제에서 쉽게 흔들린다. 어떤 가정에서 성립하는 공식인지 함께 기억해야 한다.',
  };
}

function buildLessonContent(subjectId: string, subjectTitle: string, chapterTitle: string, lessonTitle: string) {
  const subject = bySubject[subjectId as keyof typeof bySubject];
  const guide = guideFor(subjectId, lessonTitle, chapterTitle);

  return `# ${lessonTitle}

## 1. 핵심 개념
**${guide.core}**

이 레슨은 ${subject.level} 과정의 일부입니다. 목표는 다음 관점을 중심에 두고 개념을 잡는 것입니다: ${subject.lens}. 이후 계산 문제에서 흔들리지 않는 해석 순서를 만드는 데 초점을 둡니다.

## 2. 정확한 정의
${guide.definition}

초심자는 먼저 “무엇을 기준으로 재는가?”를 확인해야 합니다. 전압은 기준점이 필요하고, 전류는 기준 방향이 필요하며, 에너지는 어디에서 어디로 전달되는지의 관점이 필요합니다.

## 3. 공식과 단위
${guide.formulas.map(formula => `- ${formula}`).join('\n')}

공식은 숫자 대입표가 아니라 물리량 사이의 관계입니다. 계산 전에는 단위가 맞는지, DC 정상상태인지, 시간에 따라 변하는 상황인지, 선형 근사가 가능한지부터 확인합니다.

## 4. 작은 예제
${guide.example}

풀이 순서는 다음처럼 잡으면 좋습니다.

1. 기준점과 기준 방향을 정한다.
2. 알고 있는 물리량과 단위를 적는다.
3. 적용 가능한 법칙을 고른다.
4. 계산 결과의 단위와 크기가 자연스러운지 확인한다.

## 5. 헷갈리기 쉬운 점
${guide.misconception}

> 한 줄 정리: ${subject.practice}
`;
}

export function enhanceFoundationCourses(curriculum: Subject[]): Subject[] {
  return curriculum.map(subject => {
    if (!TARGET_SUBJECTS.has(subject.id)) return subject;

    return {
      ...subject,
      chapters: subject.chapters.map(chapter => ({
        ...chapter,
        lessons: chapter.lessons.map(lesson => ({
          ...lesson,
          content: buildLessonContent(subject.id, subject.title, chapter.title, lesson.title),
        })),
      })),
    };
  });
}
