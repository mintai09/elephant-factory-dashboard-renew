import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCompaniesSummary, companiesPerformance } from '../data/companiesData';

function HomePage() {
  const companies = getAllCompaniesSummary();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    `${process.env.PUBLIC_URL}/home_1.jpg`,
    `${process.env.PUBLIC_URL}/home_2.jpg`,
    `${process.env.PUBLIC_URL}/home_3.jpg`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

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

  // Calculate real totals from companiesData.js
  const totalCollection = Object.values(companiesPerformance).reduce((sum, c) => sum + c.collectionAmount, 0);
  const totalCO2 = Object.values(companiesPerformance).reduce((sum, c) => sum + c.co2Reduction, 0);
  const totalJobCreation = Object.values(companiesPerformance).reduce((sum, c) => sum + (c.jobCreation || 0), 0);
  const totalChildren = Object.values(companiesPerformance).reduce((sum, c) => sum + (c.childrenSupported || 0), 0);
  const plasticTotal = Object.values(companiesPerformance).reduce((sum, c) => sum + c.wasteBreakdown.plastic, 0);
  const toysTotal = Object.values(companiesPerformance).reduce((sum, c) => sum + c.wasteBreakdown.toys, 0);

  // Calculate environmental conversions
  const conversions = {
    trees: Math.round(totalCO2 * 1000 / 22),
    cars: (totalCO2 / 4.6).toFixed(1),
    arcticIce: Math.round(totalCO2 * 1000 * 0.00744)
  };

  // Calculate average recycling rate (circular resource conversion)
  const avgRecyclingRate = companies.reduce((sum, c) => sum + c.kpi.circularResource.conversionRate, 0) / companies.length;

  // Calculate average participation rate
  const avgParticipationRate = companies.reduce((sum, c) => sum + c.performance.participationRate, 0) / companies.length;

  // Calculate ESG Impact Score (Tier 3)
  const avgEScore = companies.reduce((sum, c) => sum + (c.kpi.eScore || 85), 0) / companies.length;
  const avgSScore = companies.reduce((sum, c) => sum + (c.kpi.sScore || 92), 0) / companies.length;
  const avgGScore = companies.reduce((sum, c) => sum + (c.kpi.gScore || 78), 0) / companies.length;
  // ESG Impact Score calculated but not used in current view
  // const esgImpactScore = (avgEScore * 0.5 + avgSScore * 0.3 + avgGScore * 0.2).toFixed(1);

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="hero-section" style={{
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Images with Fade Animation */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: currentImageIndex === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: 0
            }}
          />
        ))}
        {/* Content Overlay */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '4rem 2rem',
          width: '100%',
          height: '100%'
        }}>
          <h1 className="hero-title">
            데이터 기반 책임 경영으로 측정 가능한 임팩트 창출
          </h1>
          <p className="hero-subtitle">
            KCGS, MSCI, GRI 등 공식 ESG 평가 기준에 자동 매핑되는 코끼리공장 대시보드를 제공합니다.
          </p>

          {/* 메인 임팩트 강조 - 소나무 그루수 */}
          <div className="main-impact-card" style={{
            marginTop: '3rem',
            padding: '2.5rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '1rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600', opacity: 0.95 }}>
              🌲 우리의 ESG 임팩트
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1 }}>
              🌲 소나무 {conversions.trees.toLocaleString()}그루
            </div>
            <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>
              를 심은 효과와 같습니다
            </div>
          </div>

          {/* 주요 성과 지표 카드 */}
          <div className="metrics-grid" style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* 플라스틱 수거량 */}
            <div className="metric-card" style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>♻️</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {plasticTotal.toLocaleString()}kg
              </div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: '600', opacity: 0.9 }}>
                플라스틱 수거량
              </div>
            </div>

            {/* 장난감 수거량 */}
            <div className="metric-card" style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧸</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {toysTotal.toLocaleString()}kg
              </div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: '600', opacity: 0.9 }}>
                장난감 수거량
              </div>
            </div>

            {/* CO2 절감량 */}
            <div className="metric-card" style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌍</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {totalCO2.toFixed(2)}톤
              </div>
              <div style={{ fontSize: '1rem', color: 'white', fontWeight: '600', opacity: 0.9 }}>
                CO₂ 절감량
              </div>
            </div>
          </div>

          {/* Primary CTA - 데모 요청 버튼 */}
          <div className="cta-buttons" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/dashboard"
              className="btn btn-primary"
              style={{
                fontSize: '1.25rem',
                padding: '1rem 2.5rem',
                backgroundColor: 'white',
                color: '#10B981',
                fontWeight: '700',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                border: 'none',
                borderRadius: '0.5rem'
              }}
            >
              🚀 B→A 등급 상승! 우리 기업 대시보드 성과 미리보기
            </Link>
            <button
              onClick={() => alert('데모 신청이 접수되었습니다! 담당자가 곧 연락드리겠습니다.')}
              className="btn"
              style={{
                fontSize: '1.125rem',
                padding: '1rem 2rem',
                backgroundColor: 'white',
                color: '#10B981',
                border: 'none',
                fontWeight: '700',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                borderRadius: '0.5rem'
              }}
            >
              📧 데모 요청하기
            </button>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* ESG 대시보드 소개 */}
        <section className="section animate-on-scroll">
          <h2 className="section-title">📊 ESG 대시보드 - 데이터 기반 책임 경영</h2>
          <p className="section-subtitle">
            성과를 눈에 보이게 만들어서 신뢰 확보. 30분 리포트 작업을 3분으로 단축.
          </p>

          <div className="card-grid">
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#374151' }}>
                📊 실시간 성과 확인
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                캠페인 진행 중에도 즉시 확인 가능한 실시간 데이터 시각화
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10B981' }}>
                📈 ESG 기준 자동 매핑
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                KCGS, MSCI 항목 자동 연결로 공신력 있는 성과 보고
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#F59E0B' }}>
                🔄 데이터 재사용
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                분기별/연간 누적 데이터 자동 집계로 보고서 제작 간소화
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/dashboard" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              📊 ESG 대시보드 보기
            </Link>
            <Link to="/companies" className="btn btn-outline">
              🏢 기업별 성과 보기
            </Link>
          </div>
        </section>

        {/* 파트너 성공 사례 섹션 */}
        <section className="section animate-on-scroll">
          <h2 className="section-title">🏆 파트너 성공 사례</h2>
          <p className="section-subtitle">
            코끼리공장 대시보드로 실제 ESG 등급을 상승시킨 파트너사들의 이야기
          </p>

          <div className="card-grid">
            {/* B기업 ESG 등급 상승 사례 */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
              borderLeft: '6px solid #10B981'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: '600', marginBottom: '0.5rem' }}>
                    SUCCESS STORY
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#065F46', marginBottom: '0.5rem' }}>
                    B기업 → ESG B등급에서 A등급으로 상승!
                  </h3>
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '700',
                  fontSize: '1.25rem'
                }}>
                  B→A
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                  📊 1년간의 성과
                </div>
                <ul style={{ color: '#6B7280', lineHeight: '2', listStyle: 'none', padding: 0 }}>
                  <li>✅ 탄소배출 2.8톤 저감 (전년 대비 +45%)</li>
                  <li>✅ 업사이클 제품 판매 150% 증가</li>
                  <li>✅ ESG 평가 B등급 → A등급 달성</li>
                  <li>✅ 투자 유치 및 브랜드 이미지 개선</li>
                </ul>
              </div>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #10B981'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: '600', marginBottom: '0.5rem' }}>
                  💬 B기업 CSR 팀장 인터뷰
                </div>
                <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#065F46', lineHeight: '1.6' }}>
                  "코끼리공장 덕분에 ESG 평가 B등급에서 A등급으로 상승했습니다!<br/>
                  임원 보고할 때 자료가 정말 탄탄해서 신뢰도가 높아졌어요."
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Link to="/companies" style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  우리 기업도 데이터로 ESG 성과 높이기 →
                </Link>
              </div>
            </div>

            {/* A기업 업계 최고 성과 사례 */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
              borderLeft: '6px solid #10B981'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#10B981', fontWeight: '600', marginBottom: '0.5rem' }}>
                    BEST PERFORMANCE
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#374151', marginBottom: '0.5rem' }}>
                    코멘토 - 12개 참여사 중 여러 지표 1위 달성
                  </h3>
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '700',
                  fontSize: '1.25rem'
                }}>
                  🥇
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
                  🏆 업계 최고 수준 성과
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#374151' }}>1,240kg</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>폐자원 수거량 1위</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>7.70톤</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>CO₂ 절감량 1위</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#F9FAFB',
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
                fontWeight: '600',
                color: '#374151',
                fontSize: '1.125rem'
              }}>
                💡 코끼리공장을 통해 업계 최고 수준의 ESG 성과 달성 가능
              </div>
            </div>
          </div>
        </section>

        {/* 주요 성과 하이라이트 */}
        <section className="section animate-on-scroll">
          <h2 className="section-title">🎯 2025 Q1 주요 성과</h2>
          <p className="section-subtitle">
            측정 가능한 임팩트로 ESG 등급 상승의 기반을 마련했습니다
          </p>

          <div className="card-grid">
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌱</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                환경 (E)
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '85%' }}>
                  85%
                </div>
              </div>
              <ul style={{ marginTop: '1rem', color: '#6B7280', lineHeight: '1.8' }}>
                <li>총 수거량 {totalCollection.toLocaleString()}kg</li>
                <li>순환자원 전환율 {avgRecyclingRate.toFixed(1)}%</li>
                <li>탄소 절감 {totalCO2.toFixed(2)}톤</li>
              </ul>
            </div>

            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤝</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                사회 (S)
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '92%' }}>
                  92%
                </div>
              </div>
              <ul style={{ marginTop: '1rem', color: '#6B7280', lineHeight: '1.8' }}>
                <li>노인 일자리 {totalJobCreation.toLocaleString()}명</li>
                <li>취약계층 아동 {totalChildren}명</li>
                <li>참여율 평균 {avgParticipationRate.toFixed(1)}%</li>
              </ul>
            </div>

            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                지배구조 (G)
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '78%' }}>
                  78%
                </div>
              </div>
              <ul style={{ marginTop: '1rem', color: '#6B7280', lineHeight: '1.8' }}>
                <li>사회적기업 인증 100%</li>
                <li>정기 보고 12회/년</li>
                <li>투명한 성과 공유</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ESG 캠페인 동참하기 CTA */}
        <section className="section">
          <div className="card" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            textAlign: 'center',
            padding: '3rem',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
              우리 기업도 ESG 캠페인에 동참하고 싶다면?
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', opacity: 0.95, lineHeight: '1.8' }}>
              지속 가능한 미래를 함께 만들어갈 파트너를 찾습니다.<br/>
              측정 가능한 임팩트로 ESG 등급 상승의 기반을 마련하세요.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://kogongjang.com/theme/kogong/html/formmail/inquiry_01.php"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: 'white',
                  color: '#10B981',
                  fontSize: '1.25rem',
                  padding: '1.25rem 2.5rem',
                  textDecoration: 'none',
                  fontWeight: '700',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'inline-block',
                  borderRadius: '0.5rem'
                }}
              >
                🚀 ESG 캠페인 동참하기
              </a>
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '2rem', opacity: 0.85 }}>
              💡 문의사항이 있으시면 언제든지 연락주세요. 맞춤형 ESG 솔루션을 제안해 드립니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
