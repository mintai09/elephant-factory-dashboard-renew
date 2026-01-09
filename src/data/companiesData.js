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

// 각 기업의 Tier 2 KPI 데이터 (5개 보조 지표)
export const companiesTier2KPI = {
  'comento': {
    // KPI #4: 에너지 절감 효과 (E)
    energySaving: {
      monthly: 15800, // kWh
      breakdown: {
        pet: 650 * 13.9, // 9,035 kWh
        hdpe: 150 * 12.5, // 1,875 kWh
        mixedPlastic: 440 * 11.1 // 4,884 kWh
      },
      target: 15000,
      grade: '우수'
    },
    // KPI #5: 협력 네트워크 확장도 (S)
    partnerNetwork: {
      activePartners: 12, // 개 (최근 3개월)
      breakdown: {
        corporate: 5, // 민간 기업
        public: 3, // 공공기관
        education: 3, // 교육기관
        npo: 1 // 비영리단체
      },
      target: 10,
      grade: '우수'
    },
    // KPI #6: 자원 가치 보존액 (G)
    resourceValue: {
      monthlyValue: 620000, // 원 (1,240kg × 500원/kg)
      unitPrice: 500, // 원/kg (혼합 플라스틱 재활용 원료 시장가격)
      collected: 1240,
      breakdown: {
        plastic: 450000, // 플라스틱 재자원화
        toys: 170000 // 장난감 재사용
      },
      target: 500000,
      grade: '우수'
    },
    // KPI #7: 교육 도달 범위 (S)
    educationReach: {
      totalScore: 1500, // 점 (직접참여 120×10 + 간접참여 300×1)
      breakdown: {
        employees: 120, // 임직원
        partners: 80, // 협력사
        community: 100 // 지역사회
      },
      target: 1200,
      grade: '우수'
    },
    // KPI #8: 업사이클링 부가가치율 (G)
    upcyclingValue: {
      valueAddedRate: 420, // % ((제품 판매가 2,600 - 원료 가치 500) / 500 × 100)
      breakdown: {
        rawMaterialValue: 620000, // 원재료 가치
        finalProductValue: 3224000 // 최종 제품 가치
      },
      target: 400,
      grade: '우수'
    }
  },
  'sk-innovation': {
    energySaving: {
      monthly: 12500,
      breakdown: {
        pet: 420 * 13.9,
        hdpe: 180 * 12.5,
        mixedPlastic: 380 * 11.1
      },
      target: 15000,
      grade: '양호'
    },
    partnerNetwork: {
      activePartners: 9,
      breakdown: {
        corporate: 4,
        public: 3,
        education: 2,
        npo: 0
      },
      target: 10,
      grade: '양호'
    },
    resourceValue: {
      monthlyValue: 490000,
      unitPrice: 500,
      collected: 980,
      breakdown: {
        plastic: 360000,
        toys: 130000
      },
      target: 500000,
      grade: '양호'
    },
    educationReach: {
      totalScore: 1250,
      breakdown: {
        employees: 100,
        partners: 70,
        community: 80
      },
      target: 1200,
      grade: '우수'
    },
    upcyclingValue: {
      valueAddedRate: 400,
      breakdown: {
        rawMaterialValue: 490000,
        finalProductValue: 2450000
      },
      target: 400,
      grade: '우수'
    }
  },
  'kewespo': {
    energySaving: {
      monthly: 10800,
      breakdown: {
        pet: 350 * 13.9,
        hdpe: 130 * 12.5,
        mixedPlastic: 370 * 11.1
      },
      target: 15000,
      grade: '양호'
    },
    partnerNetwork: {
      activePartners: 8,
      breakdown: {
        corporate: 3,
        public: 3,
        education: 2,
        npo: 0
      },
      target: 10,
      grade: '양호'
    },
    resourceValue: {
      monthlyValue: 425000,
      unitPrice: 500,
      collected: 850,
      breakdown: {
        plastic: 310000,
        toys: 115000
      },
      target: 500000,
      grade: '양호'
    },
    educationReach: {
      totalScore: 1050,
      breakdown: {
        employees: 85,
        partners: 60,
        community: 70
      },
      target: 1200,
      grade: '양호'
    },
    upcyclingValue: {
      valueAddedRate: 380,
      breakdown: {
        rawMaterialValue: 425000,
        finalProductValue: 2040000
      },
      target: 400,
      grade: '양호'
    }
  },
  'posco': {
    energySaving: {
      monthly: 9200,
      breakdown: {
        pet: 280 * 13.9,
        hdpe: 120 * 12.5,
        mixedPlastic: 320 * 11.1
      },
      target: 15000,
      grade: '기본'
    },
    partnerNetwork: {
      activePartners: 6,
      breakdown: {
        corporate: 3,
        public: 2,
        education: 1,
        npo: 0
      },
      target: 10,
      grade: '기본'
    },
    resourceValue: {
      monthlyValue: 360000,
      unitPrice: 500,
      collected: 720,
      breakdown: {
        plastic: 260000,
        toys: 100000
      },
      target: 500000,
      grade: '기본'
    },
    educationReach: {
      totalScore: 850,
      breakdown: {
        employees: 70,
        partners: 50,
        community: 60
      },
      target: 1200,
      grade: '기본'
    },
    upcyclingValue: {
      valueAddedRate: 360,
      breakdown: {
        rawMaterialValue: 360000,
        finalProductValue: 1656000
      },
      target: 400,
      grade: '양호'
    }
  }
};

// 각 기업의 Tier 3 통합 KPI (ESG 임팩트 스코어)
// 새로운 공식: E(50점) + S(30점) + G(20점) = 총 100점
export const companiesTier3KPI = {
  'comento': {
    // E 점수 (50점 만점): 기본 참여 40점 + 실적 순위 가점 최대 10점
    eScore: 50, // 기본 40점 + 최상위 실적 10점 = 50점
    eBreakdown: {
      baseParticipation: 40, // 캠페인 참여 기본 점수
      performanceBonus: 10, // 수거량 1위 (최대 가점)
      note: '월 7.43 tonnes 수거 (전체 기업 중 1위)'
    },
    // S 점수 (30점 만점): 일자리 창출 15점 + 취약계층 지원 15점
    sScore: 28, // 일자리 14점 + 아동지원 14점 = 28점
    sBreakdown: {
      jobCreation: 14, // 코끼리공장 일자리 연결 (우수)
      vulnerableSupport: 14, // 장난감 기부 + 제품 구매로 아동 지원 (우수)
      note: '사회적 가치 200만원 창출'
    },
    // G 점수 (20점 만점): 예산 지원함 = 20점, 지원 안 함 = 0점
    gScore: 20, // 예산 지원함
    gBreakdown: {
      budgetSupport: 20, // 캠페인 예산 지원
      note: '코끼리공장 운영 예산 지원'
    },
    // ESG 임팩트 스코어 (100점 만점) = E(50점) + S(30점) + G(20점)
    totalScore: 98, // 50 + 28 + 20 = 98점
    grade: 'A+', // 90-100점 → A+ 등급
    gradeDescription: '탁월한 성과'
  },
  'sk-innovation': {
    // E 점수: 기본 40점 + 실적 가점 8점
    eScore: 48,
    eBreakdown: {
      baseParticipation: 40,
      performanceBonus: 8, // 수거량 2위
      note: '월 5.2 tonnes 수거'
    },
    // S 점수: 일자리 + 취약계층 지원
    sScore: 26,
    sBreakdown: {
      jobCreation: 13,
      vulnerableSupport: 13,
      note: '사회적 가치 170만원 창출'
    },
    // G 점수: 예산 지원함
    gScore: 20,
    gBreakdown: {
      budgetSupport: 20,
      note: '코끼리공장 운영 예산 지원'
    },
    // 총점: 48 + 26 + 20 = 94점
    totalScore: 94,
    grade: 'A+', // 90-100점 → A+ 등급
    gradeDescription: '탁월한 성과'
  },
  'kewespo': {
    // E 점수: 기본 40점 + 실적 가점 5점
    eScore: 45,
    eBreakdown: {
      baseParticipation: 40,
      performanceBonus: 5, // 수거량 3위
      note: '월 3.5 tonnes 수거'
    },
    // S 점수
    sScore: 23,
    sBreakdown: {
      jobCreation: 12,
      vulnerableSupport: 11,
      note: '사회적 가치 140만원 창출'
    },
    // G 점수: 예산 지원함
    gScore: 20,
    gBreakdown: {
      budgetSupport: 20,
      note: '코끼리공장 운영 예산 지원'
    },
    // 총점: 45 + 23 + 20 = 88점
    totalScore: 88,
    grade: 'A', // 80-89점 → A 등급
    gradeDescription: '우수'
  },
  'posco': {
    // E 점수: 기본 40점 + 실적 가점 3점
    eScore: 43,
    eBreakdown: {
      baseParticipation: 40,
      performanceBonus: 3, // 수거량 4위
      note: '월 2.1 tonnes 수거'
    },
    // S 점수
    sScore: 20,
    sBreakdown: {
      jobCreation: 10,
      vulnerableSupport: 10,
      note: '사회적 가치 110만원 창출'
    },
    // G 점수: 예산 지원함
    gScore: 20,
    gBreakdown: {
      budgetSupport: 20,
      note: '코끼리공장 운영 예산 지원'
    },
    // 총점: 43 + 20 + 20 = 83점
    totalScore: 83,
    grade: 'A', // 80-89점 → A 등급
    gradeDescription: '우수'
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
    totalJobCreation: 820,
    totalFunding: 34000000  // 누적 지원 금액 (4분기 × 약 850만원)
  },
  'sk-innovation': {
    totalParticipations: 5,
    totalParticipants: 1150,
    totalCollection: 3850,
    totalCO2Reduction: 23.2,
    totalJobCreation: 750,
    totalFunding: 36000000  // 누적 지원 금액 (5분기 × 약 720만원)
  },
  'kewespo': {
    totalParticipations: 3,
    totalParticipants: 580,
    totalCollection: 2400,
    totalCO2Reduction: 15.8,
    totalJobCreation: 480,
    totalFunding: 19500000  // 누적 지원 금액 (3분기 × 약 650만원)
  },
  'posco': {
    totalParticipations: 2,
    totalParticipants: 320,
    totalCollection: 1450,
    totalCO2Reduction: 9.1,
    totalJobCreation: 290,
    totalFunding: 11600000  // 누적 지원 금액 (2분기 × 약 580만원)
  }
};

// 각 기업의 시계열 데이터
export const companiesTimeSeries = {
  'comento': [
    { quarter: 'Q2\'24', collection: 800, participants: 150, co2: 5.8, funding: 7500000 },
    { quarter: 'Q3\'24', collection: 1100, participants: 280, co2: 8.2, funding: 14000000 },
    { quarter: 'Q4\'24', collection: 980, participants: 230, co2: 7.2, funding: 11500000 },
    { quarter: 'Q1\'25', collection: 1240, participants: 320, co2: 7.43, funding: 16000000 }
  ],
  'sk-innovation': [
    { quarter: 'Q1\'24', collection: 650, participants: 120, co2: 4.8, funding: 6000000 },
    { quarter: 'Q2\'24', collection: 720, participants: 180, co2: 5.3, funding: 9000000 },
    { quarter: 'Q3\'24', collection: 850, participants: 220, co2: 6.2, funding: 11000000 },
    { quarter: 'Q4\'24', collection: 900, participants: 250, co2: 6.6, funding: 12500000 },
    { quarter: 'Q1\'25', collection: 980, participants: 280, co2: 6.06, funding: 14000000 }
  ],
  'kewespo': [
    { quarter: 'Q3\'24', collection: 600, participants: 120, co2: 4.5, funding: 6000000 },
    { quarter: 'Q4\'24', collection: 720, participants: 160, co2: 5.2, funding: 8000000 },
    { quarter: 'Q1\'25', collection: 850, participants: 195, co2: 5.43, funding: 9750000 }
  ],
  'posco': [
    { quarter: 'Q4\'24', collection: 580, participants: 110, co2: 4.5, funding: 5500000 },
    { quarter: 'Q1\'25', collection: 720, participants: 160, co2: 4.58, funding: 8000000 }
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
    tier2KPI: companiesTier2KPI[companyId],  // 추가: Tier 2 KPI
    tier3KPI: companiesTier3KPI[companyId],  // 추가: Tier 3 KPI
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
