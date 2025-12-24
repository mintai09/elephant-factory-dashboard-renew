import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProjectOverview() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div style={{
        position: 'relative',
        backgroundImage: 'url(./sub_header_02_01.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0'
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}></div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          padding: '3rem 2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>ESG 성과 지표 설명</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, lineHeight: '1.8' }}>
            코끼리공장 ESG 캠페인의 측정 가능한 성과 지표 체계
          </p>
        </div>
      </div>

      <div className="main-content">
      <div className="section">

        {/* 1. Mission & Vision */}
        <div className="card animate-on-scroll" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">🎯 우리의 미션</h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1.5rem' }}>
            코끼리공장은 <strong>순환 경제를 통한 폐기물 문제 해결</strong>을 핵심 존재 목적으로 하는 사회적 기업입니다.
            기업의 ESG 캠페인 성과를 <strong>측정 가능한 데이터</strong>로 변환하여, KCGS, MSCI 등
            공식 평가 기준에 자동 매핑되는 대시보드 솔루션을 제공합니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', borderLeft: '4px solid #10B981' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#10B981' }}>🌍 환경 (E)</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                폐플라스틱과 장난감을 수거하여 업사이클링 제품으로 전환, 탄소 저감 및 순환 자원 기여
              </p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', borderLeft: '4px solid #3B82F6' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3B82F6' }}>🤝 사회 (S)</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                노인 일자리 창출, 취약계층 아동 교육 지원을 통한 사회적 가치 창출
              </p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '4px solid #6B7280' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#6B7280' }}>📋 지배구조 (G)</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                투명한 성과 공유, 자원 가치 보존, 업사이클링 부가가치 창출
              </p>
            </div>
          </div>
        </div>

        {/* 2. 3-Tier KPI Structure */}
        <div className="card animate-on-scroll" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">📊 3-Tier KPI 체계 구조</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            코끼리공장은 3단계 계층 구조의 KPI 시스템으로 성과를 측정하고 관리합니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Tier 1 */}
            <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '6px solid #10B981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#10B981', margin: 0 }}>
                  🔑 Tier 1: 핵심 KPI (3개)
                </h3>
                <Link to="/tier1-details" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  상세보기 →
                </Link>
              </div>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                매월 측정, 경영진 보고용
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.25rem', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: '#111827' }}>
                    탄소 저감 기여도 (E)
                  </div>
                </div>
                <div style={{ padding: '1.25rem', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: '#111827' }}>
                    순환 자원 기여도 (E)
                  </div>
                </div>
                <div style={{ padding: '1.25rem', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '500', color: '#111827' }}>
                    사회적 임팩트 지수 (S)
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '6px solid #3B82F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#3B82F6', margin: 0 }}>
                  📊 Tier 2: <strong style={{ fontWeight: '700' }}>보조 KPI</strong> (5개)
                </h3>
                <Link to="/tier2-details" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  상세보기 →
                </Link>
              </div>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                분기별 측정, 상세 분석용
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', fontSize: '0.95rem', color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  에너지 절감 효과 (E)
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', fontSize: '0.95rem', color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  협력 네트워크 확장도 (S)
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', fontSize: '0.95rem', color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  자원 가치 보존액 (G)
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', fontSize: '0.95rem', color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  교육 도달 범위 (S)
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', fontSize: '0.95rem', color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  업사이클링 부가가치율 (G)
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '6px solid #6B7280' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#6B7280' }}>
                🏆 Tier 3: 통합 KPI (1개)
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                연간 평가, 대외 공시용
              </p>
              <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.375rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <strong style={{ fontSize: '1.125rem', color: '#111827' }}>ESG 임팩트 스코어</strong>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  = (E 점수 × 0.5) + (S 점수 × 0.3) + (G 점수 × 0.2)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ESG Impact Score Grading */}
        <div className="card animate-on-scroll" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">🏆 등급 체계</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            ESG 임팩트 스코어에 따른 평가 등급 및 가중치 배분
          </p>

          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', color: '#111827' }}>가중치 배분 논리</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.375rem', borderLeft: '4px solid #10B981' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>50%</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>환경 (E)</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  순환 경제를 통한 폐기물 문제 해결이 코끼리공장의 핵심 존재 목적
                </div>
              </div>
              <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.375rem', borderLeft: '4px solid #3B82F6' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6', marginBottom: '0.5rem' }}>30%</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>사회 (S)</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  사회적 기업으로서 취약계층 지원 및 일자리 창출이 중요한 미션
                </div>
              </div>
              <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', borderLeft: '4px solid #6B7280' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280', marginBottom: '0.5rem' }}>20%</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>지배구조 (G)</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  투명한 운영과 부가가치 창출을 통한 재무적 지속 가능성
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#111827' }}>성과 등급표</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>등급</th>
                <th>점수 범위</th>
                <th>의미</th>
                <th>권장 조치</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#F0FDF4' }}>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10B981' }}>A+ (Outstanding)</td>
                <td style={{ fontWeight: '600' }}>90-100점</td>
                <td>탁월한 성과</td>
                <td>우수 사례 공유, 대외 홍보 활용</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10B981' }}>A (Excellent)</td>
                <td style={{ fontWeight: '600' }}>80-89점</td>
                <td>우수</td>
                <td>지속 유지 및 일부 개선 영역 발굴</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#3B82F6' }}>B (Good)</td>
                <td style={{ fontWeight: '600' }}>70-79점</td>
                <td>양호</td>
                <td>주요 KPI 개선 전략 수립</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#3B82F6' }}>C (Satisfactory)</td>
                <td style={{ fontWeight: '600' }}>60-69점</td>
                <td>보통</td>
                <td>Tier 2 보조 KPI 집중 개선</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#DC2626' }}>D (Needs Improvement)</td>
                <td style={{ fontWeight: '600' }}>40-59점</td>
                <td>개선 필요</td>
                <td>캠페인 전략 전면 재검토</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#DC2626' }}>F (Deficient)</td>
                <td style={{ fontWeight: '600' }}>0-39점</td>
                <td>미흡</td>
                <td>데이터 수집 및 관리 시스템 문제 해결</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Environmental Conversion Indicators */}
        <div className="card animate-on-scroll" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">🌳 환산 지표</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            CO₂ 저감량을 일상적인 지표로 변환하여 성과를 직관적으로 이해할 수 있도록 합니다.
          </p>

          <table className="data-table">
            <thead>
              <tr>
                <th>환산 지표</th>
                <th>환산 계수 (1kg CO₂ 기준)</th>
                <th>과학적 근거</th>
                <th>출처</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600' }}>🌲 나무 그루 수</td>
                <td style={{ fontSize: '1.125rem', color: '#10B981', fontWeight: '600' }}>0.113 그루/년</td>
                <td>성숙한 나무 1그루가 1년간 약 22 kg CO₂ 흡수</td>
                <td>미국 농무부 (USDA)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>🚗 자동차 운행 감축</td>
                <td style={{ fontSize: '1.125rem', color: '#3B82F6', fontWeight: '600' }}>0.000539 car-years</td>
                <td>승용차 1대의 연간 배출량 약 4.6 tonnes CO₂</td>
                <td>미국 환경보호국 (EPA)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>🧊 북극 해빙 보존</td>
                <td style={{ fontSize: '1.125rem', color: '#06B6D4', fontWeight: '600' }}>0.00744 m²</td>
                <td>CO₂ 1톤 배출 시 북극 해빙 약 3 m² 감소</td>
                <td>기후 변화 관련 과학 연구</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', borderLeft: '4px solid #10B981' }}>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#10B981' }}>
              홍보 메시지 예시
            </h4>
            <ul style={{ lineHeight: '2', color: '#374151', paddingLeft: '1.5rem' }}>
              <li>"장난감 1톤 순환은 소나무 <strong>113그루</strong>가 1년간 흡수하는 탄소와 같습니다."</li>
              <li>"장난감 1톤 순환은 승용차 한 대를 약 <strong>2개월간</strong> 운행 중단시킨 효과와 같습니다."</li>
              <li>"장난감 1톤 순환으로 북극곰 서식지 빙하 약 <strong>7.44 m²</strong>를 보존했습니다."</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProjectOverview;
