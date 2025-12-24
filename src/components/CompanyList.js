import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getAllCompaniesSummary } from '../data/companiesData';

function CompanyList() {
  // 로그인 확인 및 권한 체크
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  // 로그인하지 않았거나 관리자가 아닌 경우 홈으로 리다이렉트
  if (!userInfo || userInfo.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const companies = getAllCompaniesSummary();

  const getGradeBadgeClass = (grade) => {
    if (grade === '우수') return 'badge-success';
    if (grade === '양호') return 'badge-info';
    return 'badge-warning';
  };

  const getGradeColor = (grade) => {
    if (grade === '우수') return '#10B981';
    if (grade === '양호') return '#3B82F6';
    return '#F59E0B';
  };

  return (
    <div>
      {/* Header with background image */}
      <div style={{
        position: 'relative',
        backgroundImage: 'url(./CompanyList_head.png)',
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
        <div style={{ position: 'relative', zIndex: 2, color: 'white', textAlign: 'center', padding: '3rem 2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
            🏢 기업별 성과
          </h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            각 기업의 ESG 캠페인 참여 성과를 확인하세요. 카드를 클릭하면 상세 성과를 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="main-content">
      <div className="section">

        {/* 기업 카드 그리드 */}
        <div className="card-grid">
          {companies.map((company) => (
            <Link
              key={company.id}
              to={`/company/${company.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                {/* 기업 헤더 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '3rem' }}>{company.logo}</div>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                        {company.name}
                      </h3>
                      <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        {company.industry}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                      ESG 스코어
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: company.esgScore >= 85 ? '#10B981' : company.esgScore >= 75 ? '#3B82F6' : '#F59E0B'
                    }}>
                      {company.esgScore}점
                    </div>
                  </div>
                </div>

                {/* Tier 1 KPI 요약 */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#6B7280',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    핵심 KPI (Tier 1)
                  </h4>

                  {/* KPI #1: 탄소 저감 */}
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem',
                    borderLeft: `4px solid ${getGradeColor(company.kpi.carbonReduction.grade)}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        🌍 탄소 저감 기여도
                      </div>
                      <span className={`badge ${getGradeBadgeClass(company.kpi.carbonReduction.grade)}`}>
                        {company.kpi.carbonReduction.grade}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                        {company.kpi.carbonReduction.monthly}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        tonnes CO₂-eq/월
                      </div>
                    </div>

                    {/* 폐기물 유형별 구성 */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '0.375rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                          🧶 폐플라스틱
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#10B981' }}>
                          {company.performance.wasteBreakdown.plastic}kg
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#6B7280' }}>
                          {company.kpi.carbonReduction.breakdown.plastic}t CO₂
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                          🧸 장난감
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#F59E0B' }}>
                          {company.performance.wasteBreakdown.toys}kg
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#6B7280' }}>
                          {company.kpi.carbonReduction.breakdown.toys}t CO₂
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.5rem' }}>
                      <div className="progress-bar-container" style={{ height: '0.5rem' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${Math.min(company.kpi.carbonReduction.achieved, 100)}%`,
                            fontSize: '0'
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                        목표 달성률: {company.kpi.carbonReduction.achieved}%
                      </div>
                    </div>
                  </div>

                  {/* KPI #2: 순환 자원 */}
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem',
                    borderLeft: `4px solid ${getGradeColor(company.kpi.circularResource.grade)}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        ♻️ 순환 자원 기여도
                      </div>
                      <span className={`badge ${getGradeBadgeClass(company.kpi.circularResource.grade)}`}>
                        {company.kpi.circularResource.grade}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                        {company.kpi.circularResource.conversionRate}%
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        전환율
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
                      수거 {company.kpi.circularResource.collected}kg → 제품 {company.kpi.circularResource.produced}kg
                    </div>
                  </div>

                  {/* KPI #3: 사회적 임팩트 */}
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '0.5rem',
                    borderLeft: `4px solid ${getGradeColor(company.kpi.socialImpact.grade)}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        🤝 사회적 임팩트 지수
                      </div>
                      <span className={`badge ${getGradeBadgeClass(company.kpi.socialImpact.grade)}`}>
                        {company.kpi.socialImpact.grade}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#3B82F6' }}>
                        {(company.kpi.socialImpact.monthlyValue / 10000).toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        만원/월
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
                      일자리 {company.kpi.socialImpact.jobs}명 / 교육 {company.kpi.socialImpact.education}명
                    </div>
                  </div>
                </div>

                {/* 주요 성과 요약 */}
                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                    fontSize: '0.875rem'
                  }}>
                    <div>
                      <div style={{ color: '#6B7280', marginBottom: '0.25rem' }}>참여 임직원</div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                        {company.performance.participants}명
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#6B7280', marginBottom: '0.25rem' }}>총 수거량</div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                        {company.performance.collectionAmount}kg
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#6B7280', marginBottom: '0.25rem' }}>CO₂ 절감</div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                        {company.performance.co2Reduction}톤
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#6B7280', marginBottom: '0.25rem' }}>참여율</div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                        {company.performance.participationRate}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* 상세보기 버튼 */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <div className="btn btn-primary" style={{ width: '100%' }}>
                    상세 성과 보기 →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 전체 통계 요약 */}
        <div className="section" style={{ marginTop: '3rem' }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              📊 전체 기업 통합 성과 (2025 Q1)
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  참여 기업
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {companies.length}개
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  총 참여 임직원
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {companies.reduce((sum, c) => sum + c.performance.participants, 0).toLocaleString()}명
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  총 수거량
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {companies.reduce((sum, c) => sum + c.performance.collectionAmount, 0).toLocaleString()}kg
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  총 CO₂ 절감
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {companies.reduce((sum, c) => sum + c.performance.co2Reduction, 0).toFixed(1)}톤
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CompanyList;
