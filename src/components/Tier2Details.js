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
            ⚡ KPI #4: 에너지 절감 효과 (E)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            재활용 및 업사이클링 과정에서 절감된 에너지량을 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#10B981' }}>측정 공식</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827',
              lineHeight: '1.8'
            }}>
              에너지 절감 = Σ(제품 생산량 × 에너지 절감 계수)
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#065F46', lineHeight: '1.6' }}>
              <strong>설명:</strong> 신규 제품 생산 대비 재활용/업사이클링으로 절감된 에너지를 kWh 단위로 측정합니다.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
            🤝 KPI #5: 협력 네트워크 확장도 (S)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            최근 3개월 내 실제 활동에 기여한 협력 기관의 수를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#3B82F6' }}>측정 기준</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827',
              lineHeight: '1.8'
            }}>
              활성 협력 기관 수(개)
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#1E40AF', lineHeight: '1.6' }}>
              <strong>중요:</strong> 최근 3개월 내 실제 활동 기여 수만을 산출합니다. 단순 MOU 체결은 제외됩니다.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#6B7280' }}>
            💰 KPI #6: 자원 가치 보존액 (G)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            폐기물 재활용을 통해 보존된 자원의 경제적 가치를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#6B7280' }}>측정 공식</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827',
              lineHeight: '1.8'
            }}>
              보존액 = Σ(수거량 × 재활용 원료 시장가격)
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#4B5563', lineHeight: '1.6' }}>
              <strong>설명:</strong> 수거된 폐기물이 재활용 원료로서 갖는 시장 가치를 금액으로 환산합니다.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
            📚 KPI #7: 교육 도달범위 (S)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            환경 교육 프로그램의 효과를 직간접 참여자 수로 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#3B82F6' }}>측정 공식</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827',
              lineHeight: '1.8'
            }}>
              교육 효과 지수 = (직접 참여 × 10) + (간접 참여 × 1)
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#1E40AF', lineHeight: '1.6' }}>
              <strong>구성:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><strong>직접 참여:</strong> 교육 프로그램에 직접 참석한 인원 (가중치 10)</li>
                <li><strong>간접 참여:</strong> 캠페인 홍보물, SNS 등을 통해 노출된 인원 (가중치 1)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#6B7280' }}>
            📈 KPI #8: 업사이클링 부가가치율 (G)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            업사이클링을 통해 창출된 부가가치의 비율을 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#6B7280' }}>측정 공식</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827',
              lineHeight: '1.8'
            }}>
              부가가치율(%) = [(제품 판매가 - 원료 가치) / 원료 가치] × 100
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#4B5563', lineHeight: '1.6' }}>
              <strong>설명:</strong> 폐기물을 제품으로 전환하는 과정에서 얼마나 많은 경제적 가치가 추가되었는지를 백분율로 나타냅니다.
              <br /><br />
              <strong>예시:</strong> 원료 가치 10만원인 폐플라스틱으로 30만원짜리 제품 제작 시<br />
              → 부가가치율 = (30 - 10) / 10 × 100 = 200%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tier2Details;
