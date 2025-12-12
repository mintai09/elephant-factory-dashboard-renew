import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCompaniesSummary, companiesPerformance } from '../data/companiesData';

function HomePage() {
  const companies = getAllCompaniesSummary();

  // Calculate real totals from companiesData.js
  const totalParticipants = Object.values(companiesPerformance).reduce((sum, c) => sum + c.participants, 0);
  const totalCollection = Object.values(companiesPerformance).reduce((sum, c) => sum + c.collectionAmount, 0);
  const totalCO2 = Object.values(companiesPerformance).reduce((sum, c) => sum + c.co2Reduction, 0);
  const totalJobHours = Object.values(companiesPerformance).reduce((sum, c) => sum + (c.socialImpact?.jobCreationHours || 0), 0);
  const totalChildren = Object.values(companiesPerformance).reduce((sum, c) => sum + (c.socialImpact?.childrenBenefited || 0), 0);
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

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <h1 className="hero-title">
          ESG 임팩트, 이제는 측정하고 증명하십시오
        </h1>
        <p className="hero-subtitle">
          KCGS, MSCI 등 공식 평가 기준에 자동 매핑되는 코끼리공장 대시보드 솔루션.
          캠페인 성과를 주요 평가 지표와 실시간 연결하고, 내부 보고 시간을 획기적으로 단축하여
          ESG 등급 상승의 기반을 마련하세요.
        </p>

        {/* 실시간 성과 카운터 */}
        <div className="hero-stats">
          <div className="hero-stat-card">
            <div className="hero-stat-icon">👥</div>
            <div className="hero-stat-value">
              {totalParticipants.toLocaleString()}명
            </div>
            <div className="hero-stat-label">참여 임직원</div>
            <div className="hero-stat-growth">Q1 2025 실적</div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon">📦</div>
            <div className="hero-stat-value">
              {totalCollection.toLocaleString()}kg
            </div>
            <div className="hero-stat-label">총 수거량</div>
            <div className="hero-stat-growth">플라스틱 {plasticTotal}kg + 장난감 {toysTotal}kg</div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon">🌍</div>
            <div className="hero-stat-value">
              {totalCO2.toFixed(2)}톤
            </div>
            <div className="hero-stat-label">CO₂ 절감량</div>
            <div className="hero-stat-growth">kg당 평균 {(totalCO2 * 1000 / totalCollection).toFixed(2)}kg CO₂</div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon">👴</div>
            <div className="hero-stat-value">
              {totalJobHours.toLocaleString()}시간
            </div>
            <div className="hero-stat-label">노인 일자리</div>
            <div className="hero-stat-growth">아동 혜택 {totalChildren}명</div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '1.125rem', opacity: 0.95 }}>
          💡 이는 소나무 {conversions.trees.toLocaleString()}그루를 심은 효과와 같습니다
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* ESG 대시보드 소개 */}
        <section className="section">
          <h2 className="section-title">📊 ESG 대시보드 - 데이터 기반 책임 경영</h2>
          <p className="section-subtitle">
            성과를 눈에 보이게 만들어서 신뢰 확보. 30분 리포트 작업을 3분으로 단축.
          </p>

          <div className="card-grid">
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10B981' }}>
                📊 실시간 성과 확인
              </h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                캠페인 진행 중에도 즉시 확인 가능한 실시간 데이터 시각화
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3B82F6' }}>
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

        {/* 주요 성과 하이라이트 */}
        <section className="section">
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
                <li>노인 일자리 {totalJobHours.toLocaleString()}시간</li>
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

        {/* CTA 섹션 */}
        <section className="section">
          <div className="card" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            color: 'white',
            textAlign: 'center',
            padding: '3rem'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              데이터가 이끄는 투명하고 효과적인 ESG 경영을 시작하세요
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.95 }}>
              B → A 등급 상승, 우리 기업의 대시보드 성과를 미리 보세요
            </p>
            <Link to="/dashboard" className="btn" style={{
              backgroundColor: 'white',
              color: '#10B981',
              fontSize: '1.125rem',
              padding: '1rem 2rem'
            }}>
              ESG 대시보드 데모 체험하기 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
