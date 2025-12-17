import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getCompanyData } from '../data/companiesData';

function CompanyDetail({ fixedCompanyId }) {
  const { companyId: urlCompanyId } = useParams();
  const companyId = fixedCompanyId || urlCompanyId;
  const data = getCompanyData(companyId);

  // 로그인 사용자 정보 확인
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const isAdmin = userInfo && userInfo.role === 'admin';

  // 기업 데이터가 없으면 에러 메시지 표시
  if (!data) {
    return (
      <div className="main-content">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>❌ 기업을 찾을 수 없습니다</h2>
          <p style={{ color: '#6B7280', margin: '1rem 0 2rem' }}>
            요청하신 기업의 데이터를 찾을 수 없습니다.
          </p>
          {isAdmin && (
            <Link to="/companies" className="btn btn-primary">
              기업 목록으로 돌아가기
            </Link>
          )}
        </div>
      </div>
    );
  }

  const { info, performance, kpi, tier2KPI, tier3KPI, campaigns, cumulative, timeSeries, esgScores, media } = data;

  return (
    <div className="main-content">
      {/* 뒤로가기 버튼 - 관리자만 표시 */}
      {isAdmin && (
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/companies" className="btn btn-outline">
            ← 기업 목록으로 돌아가기
          </Link>
        </div>
      )}

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

      {/* Tier 2 보조 KPI */}
      {tier2KPI && (
        <div className="section">
          <h2 className="section-title">📊 Tier 2 보조 KPI (5개 지표)</h2>
          <p className="section-subtitle">
            분기별 측정 지표로 상세 분석 및 ESG 평가 대응에 활용됩니다.
          </p>

          {/* KPI #4: 에너지 절감 효과 */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>⚡</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    KPI #4. 에너지 절감 효과 (E)
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    제품 생산 과정에서 절감되는 에너지량
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  월 절감량
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                  {tier2KPI.energySaving.monthly.toLocaleString()} kWh
                </div>
                <div className={`badge badge-${tier2KPI.energySaving.grade === '우수' ? 'success' : 'info'}`} style={{ marginTop: '0.5rem' }}>
                  {tier2KPI.energySaving.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>PET 병</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10B981' }}>
                  {tier2KPI.energySaving.breakdown.pet.toLocaleString()} kWh
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>HDPE 용기</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10B981' }}>
                  {tier2KPI.energySaving.breakdown.hdpe.toLocaleString()} kWh
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>혼합 플라스틱</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10B981' }}>
                  {tier2KPI.energySaving.breakdown.mixedPlastic.toLocaleString()} kWh
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              <strong>목표:</strong> 월 {tier2KPI.energySaving.target.toLocaleString()} kWh 이상 |
              <strong style={{ marginLeft: '1rem' }}>Tier 3 기여도:</strong> E 점수의 20%
            </div>
          </div>

          {/* KPI #5: 협력 네트워크 확장도 */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🤝</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    KPI #5. 협력 네트워크 확장도 (S)
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    최근 3개월 내 활동 협력 기관 수
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  활동 협력기관
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                  {tier2KPI.partnerNetwork.activePartners}개
                </div>
                <div className={`badge badge-${tier2KPI.partnerNetwork.grade === '우수' ? 'success' : 'info'}`} style={{ marginTop: '0.5rem' }}>
                  {tier2KPI.partnerNetwork.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>
                  {tier2KPI.partnerNetwork.breakdown.corporate}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>민간 기업</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>
                  {tier2KPI.partnerNetwork.breakdown.public}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>공공기관</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>
                  {tier2KPI.partnerNetwork.breakdown.education}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>교육기관</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>
                  {tier2KPI.partnerNetwork.breakdown.npo}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>비영리단체</div>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              <strong>목표:</strong> {tier2KPI.partnerNetwork.target}개 이상 |
              <strong style={{ marginLeft: '1rem' }}>Tier 3 기여도:</strong> S 점수의 50%
            </div>
          </div>

          {/* KPI #6: 자원 가치 보존액 */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>💰</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    KPI #6. 자원 가치 보존액 (G)
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    순환 자원으로 전환된 경제적 가치
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  월 보존액
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>
                  {(tier2KPI.resourceValue.monthlyValue / 10000).toLocaleString()}만원
                </div>
                <div className={`badge badge-${tier2KPI.resourceValue.grade === '우수' ? 'success' : 'warning'}`} style={{ marginTop: '0.5rem' }}>
                  {tier2KPI.resourceValue.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>플라스틱 재자원화</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#F59E0B' }}>
                  {(tier2KPI.resourceValue.breakdown.plastic / 10000).toLocaleString()}만원
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>장난감 재사용</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#F59E0B' }}>
                  {(tier2KPI.resourceValue.breakdown.toys / 10000).toLocaleString()}만원
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              <strong>목표:</strong> 월 {(tier2KPI.resourceValue.target / 10000).toLocaleString()}만원 이상 |
              <strong style={{ marginLeft: '1rem' }}>Tier 3 기여도:</strong> G 점수의 60%
            </div>
          </div>

          {/* KPI #7: 교육 도달 범위 */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>📚</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    KPI #7. 교육 도달 범위 (S)
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    교육 프로그램 참여 인원 가중 점수
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  가중 점수
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                  {tier2KPI.educationReach.totalScore}점
                </div>
                <div className={`badge badge-${tier2KPI.educationReach.grade === '우수' ? 'success' : 'info'}`} style={{ marginTop: '0.5rem' }}>
                  {tier2KPI.educationReach.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>임직원</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                  {tier2KPI.educationReach.breakdown.employees}명
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>× 1.0배</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>협력사</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                  {tier2KPI.educationReach.breakdown.partners}명
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>× 1.5배</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>지역사회</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                  {tier2KPI.educationReach.breakdown.community}명
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>× 2.0배</div>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              <strong>목표:</strong> {tier2KPI.educationReach.target}점 이상 |
              <strong style={{ marginLeft: '1rem' }}>Tier 3 기여도:</strong> S 점수의 50%
            </div>
          </div>

          {/* KPI #8: 업사이클링 부가가치율 */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🔄</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    KPI #8. 업사이클링 부가가치율 (G)
                  </h3>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                    원재료 대비 최종 제품 가치 상승률
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                  부가가치율
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
                  {tier2KPI.upcyclingValue.valueAddedRate}%
                </div>
                <div className={`badge badge-${tier2KPI.upcyclingValue.grade === '우수' ? 'success' : 'warning'}`} style={{ marginTop: '0.5rem' }}>
                  {tier2KPI.upcyclingValue.grade}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>원재료 가치</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#6B7280' }}>
                  {(tier2KPI.upcyclingValue.breakdown.rawMaterialValue / 10000).toLocaleString()}만원
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>최종 제품 가치</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#F59E0B' }}>
                  {(tier2KPI.upcyclingValue.breakdown.finalProductValue / 10000).toLocaleString()}만원
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              <strong>목표:</strong> {tier2KPI.upcyclingValue.target}% 이상 |
              <strong style={{ marginLeft: '1rem' }}>Tier 3 기여도:</strong> G 점수의 40%
            </div>
          </div>
        </div>
      )}

      {/* Tier 3 통합 KPI */}
      {tier3KPI && (
        <div className="section">
          <h2 className="section-title">🏆 Tier 3 통합 KPI - ESG 임팩트 스코어</h2>
          <p className="section-subtitle">
            연간 평가 지표로 대외 공시 및 투자 유치에 활용됩니다. E(50%) + S(30%) + G(20%) 가중 평균
          </p>

          <div className="card" style={{ marginBottom: '2rem' }}>
            {/* 총점 및 등급 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem',
              background: tier3KPI.grade === 'S' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' :
                          tier3KPI.grade === 'A' ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' :
                          'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              borderRadius: '1rem',
              color: 'white',
              marginBottom: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.5rem' }}>ESG 임팩트 스코어</div>
                <div style={{ fontSize: '4rem', fontWeight: '700' }}>{tier3KPI.totalScore}점</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '1rem 2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '1rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '3rem', fontWeight: '700' }}>{tier3KPI.grade}</div>
                  <div style={{ fontSize: '1rem', opacity: 0.9 }}>{tier3KPI.gradeDescription}</div>
                </div>
              </div>
            </div>

            {/* E, S, G 상세 점수 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* E 점수 */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#F0FDF4',
                borderRadius: '1rem',
                borderLeft: '4px solid #10B981'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#10B981' }}>🌍 E (환경)</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                    {tier3KPI.eScore}점
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                  가중치: 50% | 목표: 85점 이상
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>탄소 저감 (50%)</span>
                    <strong style={{ color: '#10B981' }}>{tier3KPI.eBreakdown.carbonReduction}점</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>에너지 절감 (20%)</span>
                    <strong style={{ color: '#10B981' }}>{tier3KPI.eBreakdown.energySaving}점</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>순환성 (30%)</span>
                    <strong style={{ color: '#10B981' }}>{tier3KPI.eBreakdown.circularity}점</strong>
                  </div>
                </div>
              </div>

              {/* S 점수 */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '1rem',
                borderLeft: '4px solid #3B82F6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#3B82F6' }}>🤝 S (사회)</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3B82F6' }}>
                    {tier3KPI.sScore}점
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                  가중치: 30% | 목표: 80점 이상
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>교육 참여 (50%)</span>
                    <strong style={{ color: '#3B82F6' }}>{tier3KPI.sBreakdown.education}점</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>협력 기관 (50%)</span>
                    <strong style={{ color: '#3B82F6' }}>{tier3KPI.sBreakdown.partnership}점</strong>
                  </div>
                </div>
              </div>

              {/* G 점수 */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#FEF3C7',
                borderRadius: '1rem',
                borderLeft: '4px solid #F59E0B'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#F59E0B' }}>💼 G (경제)</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
                    {tier3KPI.gScore}점
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                  가중치: 20% | 목표: 75점 이상
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>자원 가치 (60%)</span>
                    <strong style={{ color: '#F59E0B' }}>{tier3KPI.gBreakdown.resourceValue}점</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                    <span>부가가치율 (40%)</span>
                    <strong style={{ color: '#F59E0B' }}>{tier3KPI.gBreakdown.upcyclingValue}점</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 점수 계산식 */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: '#F9FAFB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.8'
            }}>
              <strong>📐 ESG 임팩트 스코어 계산식:</strong>
              <div style={{ marginTop: '0.5rem', fontFamily: 'monospace', color: '#374151' }}>
                총점 = (E점수 × 0.5) + (S점수 × 0.3) + (G점수 × 0.2)
              </div>
              <div style={{ marginTop: '0.5rem', fontFamily: 'monospace', color: '#374151' }}>
                = ({tier3KPI.eScore} × 0.5) + ({tier3KPI.sScore} × 0.3) + ({tier3KPI.gScore} × 0.2) = {tier3KPI.totalScore}점
              </div>
              <div style={{ marginTop: '1rem', color: '#6B7280' }}>
                <strong>등급 기준:</strong> S (80-100점) | A (60-80점) | B (40-60점) | C (20-40점) | D (0-20점)
              </div>
            </div>
          </div>
        </div>
      )}

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
