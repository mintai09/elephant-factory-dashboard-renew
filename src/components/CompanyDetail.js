import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getCompanyData } from '../data/companiesData';

function CompanyDetail() {
  const { companyId } = useParams();
  const data = getCompanyData(companyId);

  // 기업 데이터가 없으면 에러 메시지 표시
  if (!data) {
    return (
      <div className="main-content">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>❌ 기업을 찾을 수 없습니다</h2>
          <p style={{ color: '#6B7280', margin: '1rem 0 2rem' }}>
            요청하신 기업의 데이터를 찾을 수 없습니다.
          </p>
          <Link to="/companies" className="btn btn-primary">
            기업 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { info, performance, kpi, campaigns, cumulative, timeSeries, esgScores, media } = data;

  return (
    <div className="main-content">
      {/* 뒤로가기 버튼 */}
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/companies" className="btn btn-outline">
          ← 기업 목록으로 돌아가기
        </Link>
      </div>

      {/* 기업 헤더 */}
      <div className="section">
        <div className="card" style={{
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem' }}>{info.logo}</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {info.name}
              </h1>
              <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                {info.industry}
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>최초 참여</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {info.firstParticipation}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>누적 참여</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {info.totalParticipations}회
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>담당자</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {info.contact.name}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>ESG 스코어</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {esgScores.overall}점
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2025 Q1 성과 요약 */}
      <div className="section">
        <h2 className="section-title">📊 2025 Q1 성과 요약</h2>
        <div className="card-grid">
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              참여 임직원
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
              {performance.participants}명
            </div>
            <div className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              🥇 {performance.ranking.participants}위/12개
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              수거량
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
              {performance.collectionAmount.toLocaleString()}kg
            </div>
            <div className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              🥇 {performance.ranking.collection}위/12개
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              CO₂ 절감량
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
              {performance.co2Reduction}톤
            </div>
            <div className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              🥇 {performance.ranking.co2}위/12개
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👴</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              일자리 창출
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
              {performance.jobCreation}시간
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎁</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              수혜 아동
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
              {performance.childrenSupported}명
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>
              참여율
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
              {performance.participationRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Tier 1 핵심 KPI */}
      <div className="section">
        <h2 className="section-title">🔑 핵심 KPI (Tier 1)</h2>

        {/* KPI #1: 탄소 저감 기여도 - 상세 정보 */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>🌍</div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                  탄소 저감 기여도
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  폐기물 순환을 통한 CO₂ 절감 효과
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                총 CO₂ 저감량
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {kpi.carbonReduction.monthly} tonnes
              </div>
              <div className={`badge badge-${kpi.carbonReduction.grade === '우수' ? 'success' : kpi.carbonReduction.grade === '양호' ? 'info' : 'warning'}`} style={{ marginTop: '0.5rem' }}>
                {kpi.carbonReduction.grade}
              </div>
            </div>
          </div>

          {/* 목표 달성률 */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>목표 달성률</span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                {kpi.carbonReduction.achieved}% (목표 {kpi.carbonReduction.target} tonnes)
              </span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${Math.min(kpi.carbonReduction.achieved, 100)}%` }}>
                {kpi.carbonReduction.achieved}%
              </div>
            </div>
          </div>

          {/* CO₂ 저감 기여도 분석 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* 폐플라스틱 섬유 업사이클링 */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#F0FDF4',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #10B981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧶</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>폐플라스틱 섬유 업사이클링</h4>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
                  {kpi.carbonReduction.breakdown.plastic} tonnes CO₂
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  총 {kpi.carbonReduction.wasteDetail.plastic.total}kg 수거
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• PET 병:</strong> {kpi.carbonReduction.wasteDetail.plastic.pet}kg
                  <span style={{ color: '#6B7280' }}> (2.29 × 2.5 UF)</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• HDPE 용기:</strong> {kpi.carbonReduction.wasteDetail.plastic.hdpe}kg
                  <span style={{ color: '#6B7280' }}> (3.12 × 2.5 UF)</span>
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.8125rem'
                }}>
                  <strong>📦 제작 제품:</strong> {kpi.carbonReduction.wasteDetail.plastic.processing}
                </div>
              </div>
            </div>

            {/* 장난감 순환 경로 */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#FEF3C7',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #F59E0B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🧸</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>장난감 순환 경로</h4>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>
                  {kpi.carbonReduction.breakdown.toys} tonnes CO₂
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  총 {kpi.carbonReduction.wasteDetail.toys.total}kg 수거
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• 재사용:</strong> {kpi.carbonReduction.wasteDetail.toys.reuse}kg
                  <span style={{ color: '#6B7280' }}> (2.75 × 3.0 RBF)</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• 업사이클링:</strong> {kpi.carbonReduction.wasteDetail.toys.upcycling}kg
                  <span style={{ color: '#6B7280' }}> (2.75 × 2.5 UF)</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>• 재활용:</strong> {kpi.carbonReduction.wasteDetail.toys.recycling}kg
                  <span style={{ color: '#6B7280' }}> (2.75 × 1.0)</span>
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.8125rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#10B981' }}>
                      {Math.round(kpi.carbonReduction.wasteDetail.toys.reuse / kpi.carbonReduction.wasteDetail.toys.total * 100)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>재사용</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#3B82F6' }}>
                      {Math.round(kpi.carbonReduction.wasteDetail.toys.upcycling / kpi.carbonReduction.wasteDetail.toys.total * 100)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>업사이클</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#6B7280' }}>
                      {Math.round(kpi.carbonReduction.wasteDetail.toys.recycling / kpi.carbonReduction.wasteDetail.toys.total * 100)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>재활용</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 환산 지표 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '0.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌲</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                {Math.round(kpi.carbonReduction.monthly * 1000 / 22)}그루
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                소나무 1년 흡수량
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚗</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                {(kpi.carbonReduction.monthly / 4.6).toFixed(1)}대
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                승용차 1년 운행 중단
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧊</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#10B981' }}>
                {Math.round(kpi.carbonReduction.monthly * 1000 * 0.00744)}m²
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                북극 빙하 보존
              </div>
            </div>
          </div>
        </div>

        {/* KPI #2, #3 */}
        <div className="card-grid">

          {/* KPI #2: 순환 자원 */}
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>♻️</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              순환 자원 기여도
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>
              {kpi.circularResource.conversionRate}%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
              수거 {kpi.circularResource.collected}kg → 제품 {kpi.circularResource.produced}kg
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div className="badge badge-success">
                {kpi.circularResource.grade}
              </div>
            </div>
          </div>

          {/* KPI #3: 사회적 임팩트 */}
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              사회적 임팩트 지수
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6', marginBottom: '0.5rem' }}>
              {(kpi.socialImpact.monthlyValue / 10000).toLocaleString()}만원
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem' }}>
              일자리 {kpi.socialImpact.jobs}명 / 교육 {kpi.socialImpact.education}명
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div className="badge badge-success">
                {kpi.socialImpact.grade}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 참여 캠페인 내역 */}
      <div className="section">
        <h2 className="section-title">📅 참여 캠페인 내역</h2>
        <div className="card-grid">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#10B981' }}>
                {campaign.name}
              </h3>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                {campaign.period}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>참여자</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{campaign.participants}명</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>수거량</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{campaign.collectionAmount}kg</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>CO₂</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{campaign.co2Reduction}톤</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 누적 성과 (전체 기간) */}
      <div className="section">
        <h2 className="section-title">📊 누적 성과 (전체 기간)</h2>
        <div className="card">
          <div className="card-grid">
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 참여 횟수
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalParticipations}회
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 참여 인원
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalParticipants.toLocaleString()}명
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 수거량
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalCollection.toLocaleString()}kg
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 CO₂ 절감
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                {cumulative.totalCO2Reduction}톤
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                총 일자리 창출
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                {cumulative.totalJobCreation}시간
              </div>
            </div>
          </div>

          {timeSeries && timeSeries.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>📈 분기별 추이</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="collection" stroke="#10B981" strokeWidth={2} name="수거량 (kg)" />
                  <Line type="monotone" dataKey="participants" stroke="#3B82F6" strokeWidth={2} name="참여자 (명)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ESG 점수 */}
      <div className="section">
        <h2 className="section-title">🎯 ESG 종합 평가</h2>
        <div className="card-grid">
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10B981' }}>
              [E] 환경
            </h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${esgScores.environmental}%` }}>
                {esgScores.environmental}%
              </div>
            </div>
            <div style={{ marginTop: '1rem', color: '#6B7280' }}>
              <div>✓ 폐기물 감축 및 재활용</div>
              <div>✓ 탄소 저감 기여</div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3B82F6' }}>
              [S] 사회
            </h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${esgScores.social}%` }}>
                {esgScores.social}%
              </div>
            </div>
            <div style={{ marginTop: '1rem', color: '#6B7280' }}>
              <div>✓ 사회공헌 활동</div>
              <div>✓ 지역사회 관계</div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#F59E0B' }}>
              [G] 지배구조
            </h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${esgScores.governance}%` }}>
                {esgScores.governance}%
              </div>
            </div>
            <div style={{ marginTop: '1rem', color: '#6B7280' }}>
              <div>✓ 투명한 파트너십</div>
              <div>✓ 윤리경영</div>
            </div>
          </div>
        </div>
      </div>

      {/* 관련 언론 보도 */}
      {media && media.length > 0 && (
        <div className="section">
          <h2 className="section-title">📰 관련 언론 보도</h2>
          <div className="card">
            {media.map((report) => (
              <div
                key={report.id}
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid #E5E7EB'
                }}
              >
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  {report.title}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  <span>{report.source}</span>
                  <span>|</span>
                  <span>{report.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 데이터 내보내기 */}
      <div className="section">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>📥 데이터 내보내기</h3>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
            {info.name}의 성과 데이터를 다양한 형식으로 다운로드하여 활용하세요
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">📊 Excel 다운로드</button>
            <button className="btn btn-secondary">📄 PDF 리포트</button>
            <button className="btn btn-outline">📧 이메일 발송</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
