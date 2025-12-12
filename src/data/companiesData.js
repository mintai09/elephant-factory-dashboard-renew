// 여러 기업의 데이터 (코멘토, SK이노베이션, 동서발전, POSCO)
// 폐기물 유형: 1) 폐플라스틱 (PET, HDPE) → 섬유 업사이클링 (조끼, 장갑)
//            2) 장난감 (혼합 플라스틱) → 재사용, 업사이클링, 재활용

// 기업 기본 정보
export const companies = [
  {
    id: 'comento',
    name: '코멘토',
    industry: 'IT/기술',
    logo: '💼',
    firstParticipation: '2024.03.15',
    totalParticipations: 4,
    contact: {
      name: '김영희',
      phone: '010-1234-5678',
      email: 'younghee.kim@comento.kr'
    }
  },
  {
    id: 'sk-innovation',
    name: 'SK이노베이션',
    industry: '에너지/화학',
    logo: '⚡',
    firstParticipation: '2024.01.10',
    totalParticipations: 5,
    contact: {
      name: '박민수',
      phone: '010-2345-6789',
      email: 'minsu.park@sk.com'
    }
  },
  {
    id: 'kewespo',
    name: '동서발전',
    industry: '발전/에너지',
    logo: '🔋',
    firstParticipation: '2024.02.20',
    totalParticipations: 3,
    contact: {
      name: '이지은',
      phone: '010-3456-7890',
      email: 'jieun.lee@kewespo.co.kr'
    }
  },
  {
    id: 'posco',
    name: 'POSCO',
    industry: '철강/제조',
    logo: '🏭',
    firstParticipation: '2024.04.05',
    totalParticipations: 2,
    contact: {
      name: '최현우',
      phone: '010-4567-8901',
      email: 'hyunwoo.choi@posco.com'
    }
  }
];

// 각 기업의 2025 Q1 폐기물 수거 및 처리 데이터
export const companiesWasteData = {
  'comento': {
    // 폐플라스틱: 페트병, HDPE 용기 (사무실, 카페)
    wastePlastic: {
      total: 800,  // kg
      pet: 650,    // kg - PET 병
      hdpe: 150,   // kg - HDPE 용기
      fiberUpcycling: 800,  // 100% 섬유 업사이클링 (조끼, 장갑)
      co2Coefficients: {
        pet: 2.29,    // kg CO₂/kg
        hdpe: 3.12,   // kg CO₂/kg
        ufFactor: 2.5 // Upcycling Factor
      }
    },
    // 장난감: 복합 플라스틱
    toys: {
      total: 440,  // kg
      reuse: 110,       // 25% - 수리 후 기부
      upcycling: 242,   // 55% - 키트, 액세서리 등
      recycling: 88,    // 20% - 일반 재활용
      co2Coefficient: 2.75,  // kg CO₂/kg (혼합 플라스틱)
      factors: {
        rbf: 3.0,  // Reuse Benefit Factor
        uf: 2.5,   // Upcycling Factor
        base: 1.0  // 일반 재활용
      }
    }
  },
  'sk-innovation': {
    wastePlastic: {
      total: 600,
      pet: 420,
      hdpe: 180,
      fiberUpcycling: 600,
      co2Coefficients: {
        pet: 2.29,
        hdpe: 3.12,
        ufFactor: 2.5
      }
    },
    toys: {
      total: 380,
      reuse: 76,      // 20%
      upcycling: 228,  // 60% - 제조업 특성상 업사이클링 비율 높음
      recycling: 76,   // 20%
      co2Coefficient: 2.75,
      factors: {
        rbf: 3.0,
        uf: 2.5,
        base: 1.0
      }
    }
  },
  'kewespo': {
    wastePlastic: {
      total: 480,
      pet: 350,
      hdpe: 130,
      fiberUpcycling: 480,
      co2Coefficients: {
        pet: 2.29,
        hdpe: 3.12,
        ufFactor: 2.5
      }
    },
    toys: {
      total: 370,
      reuse: 92.5,    // 25%
      upcycling: 185,  // 50%
      recycling: 92.5, // 25%
      co2Coefficient: 2.75,
      factors: {
        rbf: 3.0,
        uf: 2.5,
        base: 1.0
      }
    }
  },
  'posco': {
    wastePlastic: {
      total: 400,
      pet: 280,
      hdpe: 120,
      fiberUpcycling: 400,
      co2Coefficients: {
        pet: 2.29,
        hdpe: 3.12,
        ufFactor: 2.5
      }
    },
    toys: {
      total: 320,
      reuse: 64,      // 20%
      upcycling: 160,  // 50%
      recycling: 96,   // 30% - 신규 참여, 재활용 비율 높음
      co2Coefficient: 2.75,
      factors: {
        rbf: 3.0,
        uf: 2.5,
        base: 1.0
      }
    }
  }
};

// CO₂ 저감량 계산 헬퍼 함수
function calculateCO2Reduction(wasteData) {
  const { wastePlastic, toys } = wasteData;

  // 1. 폐플라스틱 섬유 업사이클링
  const plasticCO2 = (
    wastePlastic.pet * wastePlastic.co2Coefficients.pet * wastePlastic.co2Coefficients.ufFactor +
    wastePlastic.hdpe * wastePlastic.co2Coefficients.hdpe * wastePlastic.co2Coefficients.ufFactor
  ) / 1000; // tonnes로 변환

  // 2. 장난감 순환 경로별
  const toysCO2 = (
    toys.reuse * toys.co2Coefficient * toys.factors.rbf +
    toys.upcycling * toys.co2Coefficient * toys.factors.uf +
    toys.recycling * toys.co2Coefficient * toys.factors.base
  ) / 1000; // tonnes로 변환

  return {
    plastic: parseFloat(plasticCO2.toFixed(2)),
    toys: parseFloat(toysCO2.toFixed(2)),
    total: parseFloat((plasticCO2 + toysCO2).toFixed(2))
  };
}

// 각 기업의 2025 Q1 성과 데이터 (계산된 값 포함)
export const companiesPerformance = {
  'comento': {
    participants: 320,
    collectionAmount: 1240,  // 800 + 440
    wasteBreakdown: {
      plastic: 800,
      toys: 440
    },
    co2Reduction: calculateCO2Reduction(companiesWasteData['comento']).total,
    co2Detail: calculateCO2Reduction(companiesWasteData['comento']),
    jobCreation: 240,
    childrenSupported: 180,
    participationRate: 28,
    ranking: { participants: 1, collection: 1, co2: 1 }
  },
  'sk-innovation': {
    participants: 280,
    collectionAmount: 980,  // 600 + 380
    wasteBreakdown: {
      plastic: 600,
      toys: 380
    },
    co2Reduction: calculateCO2Reduction(companiesWasteData['sk-innovation']).total,
    co2Detail: calculateCO2Reduction(companiesWasteData['sk-innovation']),
    jobCreation: 200,
    childrenSupported: 150,
    participationRate: 24,
    ranking: { participants: 2, collection: 2, co2: 2 }
  },
  'kewespo': {
    participants: 195,
    collectionAmount: 850,  // 480 + 370
    wasteBreakdown: {
      plastic: 480,
      toys: 370
    },
    co2Reduction: calculateCO2Reduction(companiesWasteData['kewespo']).total,
    co2Detail: calculateCO2Reduction(companiesWasteData['kewespo']),
    jobCreation: 180,
    childrenSupported: 120,
    participationRate: 22,
    ranking: { participants: 3, collection: 3, co2: 3 }
  },
  'posco': {
    participants: 160,
    collectionAmount: 720,  // 400 + 320
    wasteBreakdown: {
      plastic: 400,
      toys: 320
    },
    co2Reduction: calculateCO2Reduction(companiesWasteData['posco']).total,
    co2Detail: calculateCO2Reduction(companiesWasteData['posco']),
    jobCreation: 150,
    childrenSupported: 95,
    participationRate: 20,
    ranking: { participants: 4, collection: 4, co2: 4 }
  }
};

// 각 기업의 Tier 1 KPI 데이터
export const companiesKPI = {
  'comento': {
    carbonReduction: {
      monthly: calculateCO2Reduction(companiesWasteData['comento']).total,
      breakdown: calculateCO2Reduction(companiesWasteData['comento']),
      target: 3.0,
      achieved: Math.round((calculateCO2Reduction(companiesWasteData['comento']).total / 3.0) * 100),
      grade: calculateCO2Reduction(companiesWasteData['comento']).total >= 3.0 ? '우수' :
             calculateCO2Reduction(companiesWasteData['comento']).total >= 1.5 ? '양호' : '기본',
      wasteDetail: {
        plastic: {
          total: companiesWasteData['comento'].wastePlastic.total,
          pet: companiesWasteData['comento'].wastePlastic.pet,
          hdpe: companiesWasteData['comento'].wastePlastic.hdpe,
          processing: '섬유 업사이클링 (조끼, 장갑)'
        },
        toys: {
          total: companiesWasteData['comento'].toys.total,
          reuse: companiesWasteData['comento'].toys.reuse,
          upcycling: companiesWasteData['comento'].toys.upcycling,
          recycling: companiesWasteData['comento'].toys.recycling
        }
      }
    },
    circularResource: {
      conversionRate: 82,
      collected: 1240,
      produced: 1017,
      target: 80,
      grade: '우수'
    },
    socialImpact: {
      monthlyValue: 8500000,
      jobs: 15,
      education: 120,
      target: 8000000,
      grade: '우수'
    }
  },
  'sk-innovation': {
    carbonReduction: {
      monthly: calculateCO2Reduction(companiesWasteData['sk-innovation']).total,
      breakdown: calculateCO2Reduction(companiesWasteData['sk-innovation']),
      target: 3.0,
      achieved: Math.round((calculateCO2Reduction(companiesWasteData['sk-innovation']).total / 3.0) * 100),
      grade: calculateCO2Reduction(companiesWasteData['sk-innovation']).total >= 3.0 ? '우수' :
             calculateCO2Reduction(companiesWasteData['sk-innovation']).total >= 1.5 ? '양호' : '기본',
      wasteDetail: {
        plastic: {
          total: companiesWasteData['sk-innovation'].wastePlastic.total,
          pet: companiesWasteData['sk-innovation'].wastePlastic.pet,
          hdpe: companiesWasteData['sk-innovation'].wastePlastic.hdpe,
          processing: '섬유 업사이클링 (작업복, 방한장갑)'
        },
        toys: {
          total: companiesWasteData['sk-innovation'].toys.total,
          reuse: companiesWasteData['sk-innovation'].toys.reuse,
          upcycling: companiesWasteData['sk-innovation'].toys.upcycling,
          recycling: companiesWasteData['sk-innovation'].toys.recycling
        }
      }
    },
    circularResource: {
      conversionRate: 78,
      collected: 980,
      produced: 764,
      target: 80,
      grade: '양호'
    },
    socialImpact: {
      monthlyValue: 7200000,
      jobs: 12,
      education: 100,
      target: 8000000,
      grade: '양호'
    }
  },
  'kewespo': {
    carbonReduction: {
      monthly: calculateCO2Reduction(companiesWasteData['kewespo']).total,
      breakdown: calculateCO2Reduction(companiesWasteData['kewespo']),
      target: 3.0,
      achieved: Math.round((calculateCO2Reduction(companiesWasteData['kewespo']).total / 3.0) * 100),
      grade: calculateCO2Reduction(companiesWasteData['kewespo']).total >= 3.0 ? '우수' :
             calculateCO2Reduction(companiesWasteData['kewespo']).total >= 1.5 ? '양호' : '기본',
      wasteDetail: {
        plastic: {
          total: companiesWasteData['kewespo'].wastePlastic.total,
          pet: companiesWasteData['kewespo'].wastePlastic.pet,
          hdpe: companiesWasteData['kewespo'].wastePlastic.hdpe,
          processing: '섬유 업사이클링 (에코백, 조끼)'
        },
        toys: {
          total: companiesWasteData['kewespo'].toys.total,
          reuse: companiesWasteData['kewespo'].toys.reuse,
          upcycling: companiesWasteData['kewespo'].toys.upcycling,
          recycling: companiesWasteData['kewespo'].toys.recycling
        }
      }
    },
    circularResource: {
      conversionRate: 75,
      collected: 850,
      produced: 638,
      target: 80,
      grade: '양호'
    },
    socialImpact: {
      monthlyValue: 6500000,
      jobs: 10,
      education: 85,
      target: 8000000,
      grade: '기본'
    }
  },
  'posco': {
    carbonReduction: {
      monthly: calculateCO2Reduction(companiesWasteData['posco']).total,
      breakdown: calculateCO2Reduction(companiesWasteData['posco']),
      target: 3.0,
      achieved: Math.round((calculateCO2Reduction(companiesWasteData['posco']).total / 3.0) * 100),
      grade: calculateCO2Reduction(companiesWasteData['posco']).total >= 3.0 ? '우수' :
             calculateCO2Reduction(companiesWasteData['posco']).total >= 1.5 ? '양호' : '기본',
      wasteDetail: {
        plastic: {
          total: companiesWasteData['posco'].wastePlastic.total,
          pet: companiesWasteData['posco'].wastePlastic.pet,
          hdpe: companiesWasteData['posco'].wastePlastic.hdpe,
          processing: '섬유 업사이클링 (장갑, 담요)'
        },
        toys: {
          total: companiesWasteData['posco'].toys.total,
          reuse: companiesWasteData['posco'].toys.reuse,
          upcycling: companiesWasteData['posco'].toys.upcycling,
          recycling: companiesWasteData['posco'].toys.recycling
        }
      }
    },
    circularResource: {
      conversionRate: 72,
      collected: 720,
      produced: 518,
      target: 80,
      grade: '기본'
    },
    socialImpact: {
      monthlyValue: 5800000,
      jobs: 9,
      education: 70,
      target: 8000000,
      grade: '기본'
    }
  }
};

// 각 기업의 캠페인 참여 내역
export const companiesCampaigns = {
  'comento': [
    {
      id: 1,
      name: '수달 보호 캠페인',
      period: '2025.03.01 ~ 2025.03.31',
      participants: 120,
      collectionAmount: 480,
      wasteBreakdown: {
        plastic: { pet: 250, hdpe: 50 },  // 총 300kg
        toys: { reuse: 45, upcycling: 99, recycling: 36 }  // 총 180kg
      },
      co2Reduction: 2.88  // 계산된 값
    },
    {
      id: 2,
      name: '장난감 나눔 캠페인',
      period: '2025.04.01 ~ 2025.04.30',
      participants: 110,
      collectionAmount: 420,
      wasteBreakdown: {
        plastic: { pet: 220, hdpe: 50 },
        toys: { reuse: 37.5, upcycling: 82.5, recycling: 30 }
      },
      co2Reduction: 2.52
    },
    {
      id: 3,
      name: '헌 책 수거 캠페인',
      period: '2025.05.01 ~ 2025.05.31',
      participants: 90,
      collectionAmount: 340,
      wasteBreakdown: {
        plastic: { pet: 180, hdpe: 50 },
        toys: { reuse: 27.5, upcycling: 60.5, recycling: 22 }
      },
      co2Reduction: 2.03
    }
  ],
  'sk-innovation': [
    {
      id: 1,
      name: '수달 보호 캠페인',
      period: '2025.03.01 ~ 2025.03.31',
      participants: 100,
      collectionAmount: 380,
      wasteBreakdown: {
        plastic: { pet: 180, hdpe: 60 },
        toys: { reuse: 28, upcycling: 84, recycling: 28 }
      },
      co2Reduction: 2.35
    },
    {
      id: 2,
      name: '장난감 나눔 캠페인',
      period: '2025.04.01 ~ 2025.04.30',
      participants: 95,
      collectionAmount: 350,
      wasteBreakdown: {
        plastic: { pet: 150, hdpe: 65 },
        toys: { reuse: 27, upcycling: 81, recycling: 27 }
      },
      co2Reduction: 2.17
    },
    {
      id: 3,
      name: '헌 책 수거 캠페인',
      period: '2025.05.01 ~ 2025.05.31',
      participants: 85,
      collectionAmount: 250,
      wasteBreakdown: {
        plastic: { pet: 90, hdpe: 55 },
        toys: { reuse: 21, upcycling: 63, recycling: 21 }
      },
      co2Reduction: 1.54
    }
  ],
  'kewespo': [
    {
      id: 1,
      name: '수달 보호 캠페인',
      period: '2025.03.01 ~ 2025.03.31',
      participants: 75,
      collectionAmount: 320,
      wasteBreakdown: {
        plastic: { pet: 130, hdpe: 50 },
        toys: { reuse: 35, upcycling: 70, recycling: 35 }
      },
      co2Reduction: 2.04
    },
    {
      id: 2,
      name: '장난감 나눔 캠페인',
      period: '2025.04.01 ~ 2025.04.30',
      participants: 65,
      collectionAmount: 280,
      wasteBreakdown: {
        plastic: { pet: 120, hdpe: 40 },
        toys: { reuse: 30, upcycling: 60, recycling: 30 }
      },
      co2Reduction: 1.79
    },
    {
      id: 3,
      name: '헌 책 수거 캠페인',
      period: '2025.05.01 ~ 2025.05.31',
      participants: 55,
      collectionAmount: 250,
      wasteBreakdown: {
        plastic: { pet: 100, hdpe: 40 },
        toys: { reuse: 27.5, upcycling: 55, recycling: 27.5 }
      },
      co2Reduction: 1.6
    }
  ],
  'posco': [
    {
      id: 1,
      name: '수달 보호 캠페인',
      period: '2025.03.01 ~ 2025.03.31',
      participants: 60,
      collectionAmount: 280,
      wasteBreakdown: {
        plastic: { pet: 100, hdpe: 50 },
        toys: { reuse: 26, upcycling: 65, recycling: 39 }
      },
      co2Reduction: 1.78
    },
    {
      id: 2,
      name: '장난감 나눔 캠페인',
      period: '2025.04.01 ~ 2025.04.30',
      participants: 55,
      collectionAmount: 240,
      wasteBreakdown: {
        plastic: { pet: 90, hdpe: 40 },
        toys: { reuse: 22, upcycling: 55, recycling: 33 }
      },
      co2Reduction: 1.53
    },
    {
      id: 3,
      name: '헌 책 수거 캠페인',
      period: '2025.05.01 ~ 2025.05.31',
      participants: 45,
      collectionAmount: 200,
      wasteBreakdown: {
        plastic: { pet: 90, hdpe: 30 },
        toys: { reuse: 16, upcycling: 40, recycling: 24 }
      },
      co2Reduction: 1.27
    }
  ]
};

// 각 기업의 누적 성과
export const companiesCumulative = {
  'comento': {
    totalParticipations: 4,
    totalParticipants: 980,
    totalCollection: 4120,
    totalCO2Reduction: 24.6,  // 정확한 계산 적용
    totalJobCreation: 820
  },
  'sk-innovation': {
    totalParticipations: 5,
    totalParticipants: 1150,
    totalCollection: 3850,
    totalCO2Reduction: 23.2,
    totalJobCreation: 750
  },
  'kewespo': {
    totalParticipations: 3,
    totalParticipants: 580,
    totalCollection: 2400,
    totalCO2Reduction: 15.8,
    totalJobCreation: 480
  },
  'posco': {
    totalParticipations: 2,
    totalParticipants: 320,
    totalCollection: 1450,
    totalCO2Reduction: 9.1,
    totalJobCreation: 290
  }
};

// 각 기업의 시계열 데이터
export const companiesTimeSeries = {
  'comento': [
    { quarter: 'Q2\'24', collection: 800, participants: 150, co2: 5.8 },
    { quarter: 'Q3\'24', collection: 1100, participants: 280, co2: 8.2 },
    { quarter: 'Q4\'24', collection: 980, participants: 230, co2: 7.2 },
    { quarter: 'Q1\'25', collection: 1240, participants: 320, co2: 7.43 }
  ],
  'sk-innovation': [
    { quarter: 'Q1\'24', collection: 650, participants: 120, co2: 4.8 },
    { quarter: 'Q2\'24', collection: 720, participants: 180, co2: 5.3 },
    { quarter: 'Q3\'24', collection: 850, participants: 220, co2: 6.2 },
    { quarter: 'Q4\'24', collection: 900, participants: 250, co2: 6.6 },
    { quarter: 'Q1\'25', collection: 980, participants: 280, co2: 6.06 }
  ],
  'kewespo': [
    { quarter: 'Q3\'24', collection: 600, participants: 120, co2: 4.5 },
    { quarter: 'Q4\'24', collection: 720, participants: 160, co2: 5.2 },
    { quarter: 'Q1\'25', collection: 850, participants: 195, co2: 5.43 }
  ],
  'posco': [
    { quarter: 'Q4\'24', collection: 580, participants: 110, co2: 4.5 },
    { quarter: 'Q1\'25', collection: 720, participants: 160, co2: 4.58 }
  ]
};

// 각 기업의 ESG 점수
export const companiesESGScores = {
  'comento': {
    environmental: 88,
    social: 95,
    governance: 82,
    overall: 89
  },
  'sk-innovation': {
    environmental: 85,
    social: 88,
    governance: 80,
    overall: 85
  },
  'kewespo': {
    environmental: 78,
    social: 82,
    governance: 76,
    overall: 79
  },
  'posco': {
    environmental: 72,
    social: 75,
    governance: 74,
    overall: 73
  }
};

// 각 기업의 언론 보도
export const companiesMedia = {
  'comento': [
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
  ],
  'sk-innovation': [
    {
      id: 1,
      title: 'SK이노베이션, 순환경제 실천으로 ESG 경영 강화',
      source: '서울경제',
      date: '2025.03.20',
      url: 'https://example.com/article3'
    },
    {
      id: 2,
      title: '에너지 기업의 사회적 책임, SK이노베이션 사례',
      source: '동아일보',
      date: '2025.04.15',
      url: 'https://example.com/article4'
    }
  ],
  'kewespo': [
    {
      id: 1,
      title: '동서발전, 환경 캠페인으로 지역사회 기여',
      source: '에너지경제',
      date: '2025.03.25',
      url: 'https://example.com/article5'
    }
  ],
  'posco': [
    {
      id: 1,
      title: 'POSCO, ESG 경영 강화로 지속가능성 향상',
      source: '철강신문',
      date: '2025.04.10',
      url: 'https://example.com/article6'
    }
  ]
};

// 특정 기업 데이터 가져오기 헬퍼 함수
export const getCompanyData = (companyId) => {
  const company = companies.find(c => c.id === companyId);
  if (!company) return null;

  return {
    info: company,
    performance: companiesPerformance[companyId],
    kpi: companiesKPI[companyId],
    campaigns: companiesCampaigns[companyId],
    cumulative: companiesCumulative[companyId],
    timeSeries: companiesTimeSeries[companyId],
    esgScores: companiesESGScores[companyId],
    media: companiesMedia[companyId],
    wasteData: companiesWasteData[companyId]  // 추가: 상세 폐기물 데이터
  };
};

// 모든 기업 요약 데이터 (카드용)
export const getAllCompaniesSummary = () => {
  return companies.map(company => ({
    ...company,
    performance: companiesPerformance[company.id],
    kpi: companiesKPI[company.id],
    esgScore: companiesESGScores[company.id].overall,
    wasteData: companiesWasteData[company.id]
  }));
};
