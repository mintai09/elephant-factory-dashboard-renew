import React from 'react';
import { Link } from 'react-router-dom';

function Tier2Details() {
  return (
    <div className="main-content">
      <div className="section">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/overview" className="btn btn-outline">
            ← 돌아가기
          </Link>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '3rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tier 2: 보조 KPI 상세</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, lineHeight: '1.8' }}>
            분기별 측정되는 5가지 보조 성과 지표
          </p>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#10B981' }}>
            ⚡ 1. 에너지 절감 효과 (E)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            재활용 및 업사이클링 과정에서 절감된 에너지량을 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
            <p style={{ color: '#6B7280' }}>측정 단위: kWh (킬로와트시)</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
            🤝 2. 협력 네트워크 확장도 (S)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            캠페인에 참여한 기업, 단체, 파트너사의 수와 협력 범위를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
            <p style={{ color: '#6B7280' }}>측정 지표: 참여 파트너 수, 협력 유형, 지역 범위</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#6B7280' }}>
            💰 3. 자원 가치 보존액 (G)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            폐기물을 재활용함으로써 보존된 자원의 경제적 가치를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
            <p style={{ color: '#6B7280' }}>측정 단위: 원 (KRW)</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
            📚 4. 교육 도달 범위 (S)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            환경 교육 프로그램의 참여자 수와 교육 범위를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
            <ul style={{ lineHeight: '2', color: '#6B7280', paddingLeft: '1.5rem' }}>
              <li>임직원 교육 인원</li>
              <li>협력사 교육 인원</li>
              <li>지역사회 교육 인원</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#6B7280' }}>
            🔄 5. 업사이클링 부가가치율 (G)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            원료 대비 업사이클링 제품의 가치 증가율을 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.125rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827'
            }}>
              부가가치율 = (제품 판매가 - 원료비) / 원료비 × 100%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tier2Details;
