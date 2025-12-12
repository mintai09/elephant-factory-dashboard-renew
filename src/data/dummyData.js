// 코끼리공장 x 코멘토 더미 데이터

export const companyData = {
  id: 'comento',
  name: '코멘토',
  industry: 'IT/기술',
  firstParticipation: '2024.03.15',
  totalParticipations: 4,
  contact: {
    name: '김영희',
    phone: '010-1234-5678',
    email: 'younghee.kim@comento.kr'
  }
};

// 2025 Q1 성과 데이터
export const q1Performance = {
  participants: 320,
  collectionAmount: 1240, // kg
  co2Reduction: 2.8, // tonnes
  jobCreation: 240, // 시간
  childrenSupported: 180,
  participationRate: 28, // %
  ranking: {
    participants: 1,
    collection: 1,
    co2: 1,
    totalCompanies: 12
  }
};

// 캠페인별 데이터
export const campaigns = [
  {
    id: 1,
    name: '수달 보호 캠페인',
    period: '2025.03.01 ~ 2025.03.31',
    participants: 120,
    collectionAmount: 480, // kg
    co2Reduction: 1.1 // tonnes
  },
  {
    id: 2,
    name: '장난감 나눔 캠페인',
    period: '2025.04.01 ~ 2025.04.30',
    participants: 110,
    collectionAmount: 420, // kg
    co2Reduction: 0.9 // tonnes
  },
  {
    id: 3,
    name: '헌 책 수거 캠페인',
    period: '2025.05.01 ~ 2025.05.31',
    participants: 90,
    collectionAmount: 340, // kg
    co2Reduction: 0.8 // tonnes
  }
];

// 누적 성과 (전체 기간)
export const cumulativePerformance = {
  totalParticipations: 4,
  totalParticipants: 980,
  totalCollection: 4120, // kg
  totalCO2Reduction: 9.3, // tonnes
  totalJobCreation: 820 // 시간
};

// 시계열 데이터 (분기별 추이)
export const timeSeriesData = [
  { quarter: 'Q2\'24', collection: 800, participants: 150, co2: 1.8 },
  { quarter: 'Q3\'24', collection: 1100, participants: 280, co2: 2.5 },
  { quarter: 'Q4\'24', collection: 980, participants: 230, co2: 2.2 },
  { quarter: 'Q1\'25', collection: 1240, participants: 320, co2: 2.8 }
];

// ESG 점수
export const esgScores = {
  environmental: 88,
  social: 95,
  governance: 82,
  overall: 89
};

// ESG 상세 기여도
export const esgContributions = {
  environmental: {
    wasteReduction: 1240, // kg
    recyclingRate: 94, // %
    co2Reduction: 2.8, // tonnes
    percentageOfTotal: 14.8 // %
  },
  social: {
    jobCreation: 240, // 시간
    jobPercentage: 20, // % of total
    childrenSupported: 180,
    childrenPercentage: 19, // % of total
    participationRate: 28, // %
    industryAverage: 18 // %
  },
  governance: {
    reportingRate: 100, // %
    reportsSubmitted: 4,
    reportsRequired: 4
  }
};

// 언론 보도
export const mediaReports = [
  {
    id: 1,
    title: '코멘토, 환경캠페인으로 ESG 실천',
    source: '매일경제',
    date: '2025.03.15',
    url: 'https://example.com/article1'
  },
  {
    id: 2,
    title: 'IT업계 ESG 우수사례, 코멘토 주목',
    source: '한국일보',
    date: '2025.04.22',
    url: 'https://example.com/article2'
  }
];

// 전체 기업 순위 데이터
export const companyRankings = [
  { rank: 1, name: '코멘토', collection: 1240, participants: 320, co2: 2.8 },
  { rank: 2, name: 'B기업', collection: 980, participants: 280, co2: 2.2 },
  { rank: 3, name: 'C기업', collection: 850, participants: 195, co2: 1.9 },
  { rank: 4, name: 'D기업', collection: 720, participants: 160, co2: 1.6 },
  { rank: 5, name: 'E기업', collection: 680, participants: 145, co2: 1.5 },
  { rank: 6, name: 'F기업', collection: 620, participants: 130, co2: 1.4 },
  { rank: 7, name: 'G기업', collection: 580, participants: 120, co2: 1.3 },
  { rank: 8, name: 'H기업', collection: 540, participants: 110, co2: 1.2 },
  { rank: 9, name: 'I기업', collection: 480, participants: 95, co2: 1.1 },
  { rank: 10, name: 'J기업', collection: 420, participants: 85, co2: 0.9 },
  { rank: 11, name: 'K기업', collection: 380, participants: 75, co2: 0.8 },
  { rank: 12, name: 'L기업', collection: 320, participants: 65, co2: 0.7 }
];

// 전체 캠페인 성과 (전체 기업 통합)
export const totalCampaignPerformance = [
  {
    name: '수달 보호 캠페인',
    collection: 3200,
    participants: 420
  },
  {
    name: '장난감 나눔 캠페인',
    collection: 2800,
    participants: 480
  },
  {
    name: '헌 책 수거 캠페인',
    collection: 2400,
    participants: 340
  }
];

// 환산 지표 계산 함수
export const calculateConversions = (co2Tonnes) => {
  const treesPerTonne = 113; // 1톤 CO2 = 소나무 113그루 1년 흡수량
  const carKmPerTonne = 5000; // 1톤 CO2 = 승용차 약 5000km 운행

  return {
    trees: Math.round(co2Tonnes * treesPerTonne),
    carKm: Math.round(co2Tonnes * carKmPerTonne)
  };
};

// KPI 데이터 (3-Tier 구조)
export const kpiData = {
  // Tier 1: 핵심 KPI (3개)
  tier1: {
    carbonReduction: {
      monthly: 2.6, // tonnes CO2-eq
      target: 3.0,
      achieved: 87, // %
      grade: '우수'
    },
    circularResource: {
      conversionRate: 82, // %
      collected: 1000, // kg
      produced: 820, // kg
      target: 80,
      grade: '우수'
    },
    socialImpact: {
      monthlyValue: 8500000, // 원
      jobs: 15, // 명
      education: 120, // 명
      target: 8000000,
      grade: '우수'
    }
  },

  // Tier 2: 보조 KPI (5개)
  tier2: {
    energySaving: {
      kWh: 10200,
      households: 34 // 4인 가구 기준
    },
    partnerNetwork: {
      count: 10,
      target: 10,
      breakdown: {
        corporate: 5,
        public: 2,
        education: 2,
        nonprofit: 1
      }
    },
    resourceValue: {
      amount: 730000, // 원
      description: '매립/소각 대신 경제적 가치 창출'
    },
    educationReach: {
      score: 1500, // (직접 × 10) + (간접 × 1)
      direct: 120,
      indirect: 300
    },
    upcyclingValue: {
      rate: 320, // %
      productPrice: 15000,
      materialCost: 5000
    }
  },

  // Tier 3: 통합 KPI (1개)
  tier3: {
    esgImpactScore: {
      total: 89, // 100점 만점
      grade: 'A', // A등급 (60-80점)
      breakdown: {
        E: 88, // 50% 가중치
        S: 95, // 30% 가중치
        G: 82  // 20% 가중치
      },
      gradeDescription: '우수, 선도적 활동',
      target: '지속가능경영 보고서 발간 및 제3자 검증 추진 기반'
    }
  }
};

// 메인 홈페이지용 전체 통계
export const overallStats = {
  totalCompanies: 12,
  totalParticipants: 1240,
  totalCollection: 8400, // kg
  totalCO2Reduction: 12.6, // tonnes
  jobCreationHours: 1200,
  childrenSupported: 940,
  mediaReports: 8,
  quarterGrowth: 18 // % 전분기 대비
};
