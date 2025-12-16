import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  getAllCompaniesSummary,
  companiesPerformance,
  companiesTimeSeries,
  companiesTier2KPI,
  companiesTier3KPI
} from '../data/companiesData';

function Dashboard() {
  const [sortBy, setSortBy] = useState('co2');
  const companies = getAllCompaniesSummary();

  // 전체 통합 데이터 계산
  const totalData = {
    participants: Object.values(companiesPerformance).reduce((sum, c) => sum + c.participants, 0),
    collection: Object.values(companiesPerformance).reduce((sum, c) => sum + c.collectionAmount, 0),
    co2: Object.values(companiesPerformance).reduce((sum, c) => sum + c.co2Reduction, 0),
    plasticTotal: Object.values(companiesPerformance).reduce((sum, c) => sum + c.wasteBreakdown.plastic, 0),
    toysTotal: Object.values(companiesPerformance).reduce((sum, c) => sum + c.wasteBreakdown.toys, 0),
    plasticCO2: Object.values(companiesPerformance).reduce((sum, c) => sum + c.co2Detail.plastic, 0),
    toysCO2: Object.values(companiesPerformance).reduce((sum, c) => sum + c.co2Detail.toys, 0)
  };

  // 정렬된 기업 목록
  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortBy === 'co2') return b.performance.co2Reduction - a.performance.co2Reduction;
    if (sortBy === 'collection') return b.performance.collectionAmount - a.performance.collectionAmount;
    return b.performance.participants - a.performance.participants;
  });

  // 평균 ESG 점수 계산
  const avgESGScore = Math.round(companies.reduce((sum, c) => sum + c.esgScore, 0) / companies.length);

  // ESG 등급 계산
  const getESGGrade = (score) => {
    if (score >= 80) return { grade: 'S (Superior)', color: '#10B981', desc: '탁월, 업계 최고 수준' };
    if (score >= 60) return { grade: 'A (Advanced)', color: '#3B82F6', desc: '우수, 선도적 활동' };
    if (score >= 40) return { grade: 'B (Basic)', color: '#F59E0B', desc: '양호, 기본 목표 달성' };
    return { grade: 'C (Caution)', color: '#EF4444', desc: '주의, 개선 필요' };
  };

  const esgGrade = getESGGrade(avgESGScore);

  // 폐기물 유형별 데이터 (차트용)
  const wasteTypeData = [
    {
      type: '폐플라스틱',
      수거량: totalData.plasticTotal,
      'CO₂ 저감': parseFloat(totalData.plasticCO2.toFixed(2))
    },
    {
      type: '장난감',
      수거량: totalData.toysTotal,
      'CO₂ 저감': parseFloat(totalData.toysCO2.toFixed(2))
    }
  ];

  // 기업별 비교 데이터 (차트용)
  const companyComparisonData = sortedCompanies.map(c => ({
    name: c.name,
    폐플라스틱: c.performance.wasteBreakdown.plastic,
    장난감: c.performance.wasteBreakdown.toys,
    'CO₂': c.performance.co2Reduction
  }));

  return (
    <div className="main-content">
      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 className="section-title">📊 ESG 임팩트 대시보드</h1>
            <p className="section-subtitle">
              전체 기업의 ESG 성과를 실시간으로 시각화하고, 폐기물 유형별 기여도를 분석합니다
            </p>
          </div>

          {/* 데이터 내보내기 버튼 (UI 데모) */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => alert('PDF 보고서 다운로드 기능 (데모)\n\n실제 구현 시:\n- 전체 대시보드 내용을 PDF로 변환\n- 기업 로고 및 브랜딩 포함\n- 자동 생성된 분석 코멘트 추가')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📄 PDF 다운로드
            </button>
            <button
              onClick={() => alert('Excel 데이터 내보내기 (데모)\n\n실제 구현 시:\n- 모든 수치 데이터를 Excel 형식으로 변환\n- 차트 및 그래프 포함\n- 피벗 테이블 분석용 시트 자동 생성')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📊 Excel 내보내기
            </button>
            <button
              onClick={() => alert('이미지로 저장 (데모)\n\n실제 구현 시:\n- 대시보드 전체 또는 선택 영역을 PNG 이미지로 저장\n- 프레젠테이션 및 보고서 삽입용')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              🖼️ PNG 저장
            </button>
          </div>
        </div>

        {/* 산업군 필터 UI (데모) */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#F9FAFB',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          border: '2px solid #E5E7EB'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ fontSize: '1rem', color: '#374151' }}>🔍 산업군별 필터</strong>
            <span style={{ fontSize: '0.875rem', color: '#6B7280', marginLeft: '1rem' }}>
              (데모 기능 - 실제 구현 시 산업군별 성과 비교 가능)
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              전체
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#6B7280',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              IT/테크
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#6B7280',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              에너지
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#6B7280',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              제조업
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#6B7280',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              금융
            </button>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.75rem' }}>
            💡 산업군 선택 시 해당 업종 평균 대비 성과를 비교할 수 있습니다
          </p>
        </div>

        {/* Tier 3: 통합 ESG 임팩트 스코어 */}
        <div className="section">
          <h2 className="section-title">🎯 ESG 임팩트 스코어 (Tier 3)</h2>
          <div className="card" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>전체 기업 통합 ESG 평균 스코어</div>
            <div style={{ fontSize: '4rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {avgESGScore}점
            </div>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              <span className="badge" style={{
                backgroundColor: 'white',
                color: esgGrade.color,
                fontSize: '1.5rem',
                padding: '0.5rem 1.5rem'
              }}>
                {esgGrade.grade}
              </span>
            </div>
            <div style={{ fontSize: '1.125rem', opacity: 0.95 }}>
              {esgGrade.desc}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>참여 기업</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {companies.length}개
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>총 참여 인원</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {totalData.participants.toLocaleString()}명
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>총 수거량</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {totalData.collection.toLocaleString()}kg
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>총 CO₂ 저감</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                  {totalData.co2.toFixed(1)}톤
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 폐기물 유형별 분석 */}
        <div className="section">
          <h2 className="section-title">🗑️ 폐기물 유형별 성과 분석</h2>

          <div className="card-grid">
            {/* 폐플라스틱 */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
              borderLeft: '4px solid #10B981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🧶</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>폐플라스틱 섬유 업사이클링</h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    조끼, 장갑, 에코백 등 제작
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>총 수거량</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                  {totalData.plasticTotal.toLocaleString()}kg
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                  전체의 {Math.round(totalData.plasticTotal / totalData.collection * 100)}%
                </div>
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  CO₂ 저감 기여
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
                  {totalData.plasticCO2.toFixed(2)} tonnes
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  전체 CO₂의 {Math.round(totalData.plasticCO2 / totalData.co2 * 100)}%
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                <div>✓ UF 계수 2.5 적용</div>
                <div>✓ PET 병, HDPE 용기</div>
              </div>
            </div>

            {/* 장난감 */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              borderLeft: '4px solid #F59E0B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🧸</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>장난감 순환 경로</h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    재사용, 업사이클링, 재활용
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>총 수거량</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
                  {totalData.toysTotal.toLocaleString()}kg
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                  전체의 {Math.round(totalData.toysTotal / totalData.collection * 100)}%
                </div>
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  CO₂ 저감 기여
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>
                  {totalData.toysCO2.toFixed(2)} tonnes
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  전체 CO₂의 {Math.round(totalData.toysCO2 / totalData.co2 * 100)}%
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                <div>✓ 재사용 (RBF 3.0)</div>
                <div>✓ 업사이클링 (UF 2.5)</div>
                <div>✓ 재활용 (기본 1.0)</div>
              </div>
            </div>
          </div>

          {/* 폐기물 유형별 차트 */}
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>폐기물 유형별 비교</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis yAxisId="left" label={{ value: '수거량 (kg)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'CO₂ 저감 (tonnes)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="수거량" fill="#10B981" />
                <Bar yAxisId="right" dataKey="CO₂ 저감" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 기업별 성과 순위 */}
        <div className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title">🏆 기업별 성과 순위</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #E5E7EB'
              }}
            >
              <option value="co2">CO₂ 저감량</option>
              <option value="collection">총 수거량</option>
              <option value="participants">참여 인원</option>
            </select>
          </div>

          <div className="card">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>순위</th>
                    <th>기업명</th>
                    <th>폐플라스틱 (kg)</th>
                    <th>장난감 (kg)</th>
                    <th>총 수거량 (kg)</th>
                    <th>CO₂ 저감 (tonnes)</th>
                    <th>참여 인원</th>
                    <th>ESG 점수</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCompanies.map((company, index) => (
                    <tr key={company.id}>
                      <td>
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && (index + 1)}
                      </td>
                      <td style={{ fontWeight: '600' }}>
                        <Link to={`/company/${company.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {company.logo} {company.name}
                        </Link>
                      </td>
                      <td>{company.performance.wasteBreakdown.plastic.toLocaleString()}</td>
                      <td>{company.performance.wasteBreakdown.toys.toLocaleString()}</td>
                      <td style={{ fontWeight: '600' }}>
                        {company.performance.collectionAmount.toLocaleString()}
                      </td>
                      <td style={{ color: '#10B981', fontWeight: '600' }}>
                        {company.performance.co2Reduction.toFixed(2)}
                      </td>
                      <td>{company.performance.participants.toLocaleString()}명</td>
                      <td>
                        <span className={`badge badge-${company.esgScore >= 85 ? 'success' : company.esgScore >= 75 ? 'info' : 'warning'}`}>
                          {company.esgScore}점
                        </span>
                      </td>
                      <td>
                        <Link to={`/company/${company.id}`} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                          상세보기
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 기업별 폐기물 구성 비교 */}
        <div className="section">
          <h2 className="section-title">📊 기업별 폐기물 구성 비교</h2>
          <div className="card">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={companyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" label={{ value: '수거량 (kg)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'CO₂ (tonnes)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="폐플라스틱" stackId="a" fill="#10B981" />
                <Bar yAxisId="left" dataKey="장난감" stackId="a" fill="#F59E0B" />
                <Bar yAxisId="right" dataKey="CO₂" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 시계열 추이 분석 */}
        <div className="section">
          <h2 className="section-title">📈 전체 기업 통합 시계열 추이</h2>
          <div className="card">
            {Object.keys(companiesTimeSeries).map((companyId) => {
              const company = companies.find(c => c.id === companyId);
              if (!company) return null;

              return (
                <div key={companyId} style={{ marginBottom: '3rem' }}>
                  <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{company.logo}</span>
                    <span>{company.name}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                      참여 {company.totalParticipations}회
                    </span>
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={companiesTimeSeries[companyId]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="collection" stroke="#10B981" strokeWidth={2} name="수거량 (kg)" />
                      <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#F59E0B" strokeWidth={2} name="CO₂ (tonnes)" />
                      <Line yAxisId="left" type="monotone" dataKey="participants" stroke="#3B82F6" strokeWidth={2} name="참여자 (명)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </div>

        {/* 환산 지표 */}
        <div className="section">
          <h2 className="section-title">🌍 환경 임팩트 환산</h2>
          <div className="card" style={{
            background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌲</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                  {Math.round(totalData.co2 * 1000 / 22).toLocaleString()}그루
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                  소나무가 1년간 흡수하는 CO₂와 동일
                </div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚗</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                  {(totalData.co2 / 4.6).toFixed(1)}대
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                  승용차 1년 운행 중단 효과
                </div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧊</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                  {Math.round(totalData.co2 * 1000 * 0.00744).toLocaleString()}m²
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                  북극 빙하 보존 면적
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2 보조 KPI */}
        <div className="section">
          <h2 className="section-title">📊 Tier 2 보조 KPI (5개 지표)</h2>
          <p className="section-subtitle">
            분기별 측정 지표로 상세 분석 및 ESG 평가 대응에 활용됩니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {sortedCompanies.map(company => {
              const tier2 = companiesTier2KPI[company.id];
              return (
                <div key={company.id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>{company.logo}</span>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{company.name}</h3>
                      <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>{company.industry}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {/* KPI #4: 에너지 절감 */}
                    <div style={{ padding: '0.75rem', backgroundColor: '#F0FDF4', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#065F46', marginBottom: '0.25rem' }}>⚡ 에너지 절감 (E)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10B981' }}>
                        {tier2.energySaving.monthly.toLocaleString()} kWh
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>등급: {tier2.energySaving.grade}</div>
                    </div>

                    {/* KPI #5: 협력 네트워크 */}
                    <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#1E40AF', marginBottom: '0.25rem' }}>🤝 협력 네트워크 (S)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                        {tier2.partnerNetwork.activePartners}개 기관
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>등급: {tier2.partnerNetwork.grade}</div>
                    </div>

                    {/* KPI #6: 자원 가치 */}
                    <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#78350F', marginBottom: '0.25rem' }}>💰 자원 가치 (G)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F59E0B' }}>
                        {tier2.resourceValue.monthly.toLocaleString()}원
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>등급: {tier2.resourceValue.grade}</div>
                    </div>

                    {/* KPI #7: 교육 도달 */}
                    <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#1E40AF', marginBottom: '0.25rem' }}>📚 교육 도달 (S)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                        {tier2.educationReach.score.toLocaleString()}점
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>등급: {tier2.educationReach.grade}</div>
                    </div>

                    {/* KPI #8: 업사이클링 부가가치 */}
                    <div style={{ padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '0.375rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#78350F', marginBottom: '0.25rem' }}>📈 부가가치율 (G)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#F59E0B' }}>
                        {tier2.upcyclingValue.rate}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>등급: {tier2.upcyclingValue.grade}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier 3 통합 KPI (ESG 임팩트 스코어) */}
        <div className="section">
          <h2 className="section-title">🏆 Tier 3 통합 KPI - ESG 임팩트 스코어</h2>
          <p className="section-subtitle">
            연간 평가 지표로 대외 공시 및 투자 유치에 활용됩니다. E(50%) + S(30%) + G(20%) 가중 평균
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {sortedCompanies.map(company => {
              const tier3 = companiesTier3KPI[company.id];
              const getGradeColor = (grade) => {
                if (grade === 'S') return '#10B981';
                if (grade === 'A') return '#3B82F6';
                if (grade === 'B') return '#059669';
                return '#F59E0B';
              };

              return (
                <div key={company.id} className="card" style={{ padding: '1.5rem' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '2.5rem', marginRight: '1rem' }}>{company.logo}</span>
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{company.name}</h3>
                        <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>{company.industry}</div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '700',
                      color: getGradeColor(tier3.grade)
                    }}>
                      {tier3.grade}
                    </div>
                  </div>

                  {/* Total Score */}
                  <div style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    backgroundColor: '#F9FAFB',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>ESG 임팩트 스코어</div>
                    <div style={{ fontSize: '3rem', fontWeight: '700', color: getGradeColor(tier3.grade) }}>
                      {tier3.totalScore}점
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
                      {tier3.gradeDescription}
                    </div>
                  </div>

                  {/* E, S, G Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* E Score */}
                    <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#065F46' }}>환경 (E)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>{tier3.eScore}점</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        탄소저감 {tier3.eBreakdown.carbonReduction}점 | 에너지절감 {tier3.eBreakdown.energySaving}점 | 순환성 {tier3.eBreakdown.circularity}점
                      </div>
                    </div>

                    {/* S Score */}
                    <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1E40AF' }}>사회 (S)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3B82F6' }}>{tier3.sScore}점</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        교육참여 {tier3.sBreakdown.education}점 | 협력기관 {tier3.sBreakdown.partnership}점
                      </div>
                    </div>

                    {/* G Score */}
                    <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#78350F' }}>경제 (G)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#F59E0B' }}>{tier3.gScore}점</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        자원가치 {tier3.gBreakdown.resourceValue}점 | 부가가치 {tier3.gBreakdown.upcyclingValue}점
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 데이터 내보내기 */}
        <div className="section">
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>📥 데이터 내보내기</h3>
            <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
              다양한 형식으로 보고서를 다운로드하여 내부 보고 및 공시에 활용하세요
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">📊 Excel 다운로드</button>
              <button className="btn btn-secondary">📄 PDF 리포트</button>
              <button className="btn btn-outline">🖼 이미지 저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
