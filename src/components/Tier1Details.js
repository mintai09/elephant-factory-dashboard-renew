import React from 'react';
import { Link } from 'react-router-dom';

function Tier1Details() {
  return (
    <div className="main-content">
      <div className="section">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/overview" className="btn btn-outline">
            ← 돌아가기
          </Link>
        </div>

        <div className="card" style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '3rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔑</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tier 1: 핵심 KPI 상세</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, lineHeight: '1.8' }}>
            매월 측정되는 3가지 핵심 성과 지표
          </p>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#10B981' }}>
            🌍 KPI #1: 탄소 저감 기여도 (E)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            폐플라스틱 및 장난감 수거를 통해 소각을 방지함으로써 저감한 탄소량을 측정합니다.
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
              탄소 저감량 = Σ(폐기물 수거량ᵢ × 소각 배출계수ᵢ)
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#065F46', lineHeight: '1.6' }}>
              <strong>배출계수:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>폐플라스틱 소각: 약 3.14 kg CO₂/kg</li>
                <li>폐장난감 소각: 약 2.5 kg CO₂/kg</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#10B981' }}>
            ♻️ KPI #2: 순환 자원 전환율 (E)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            수거한 폐기물 중 실제로 제품으로 전환된 비율을 측정합니다.
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
              순환 자원 전환율(%) = (제품 생산량 / 수거량) × 100
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#065F46', lineHeight: '1.6' }}>
              <strong>설명:</strong> 수거된 폐기물이 업사이클링 제품으로 얼마나 효율적으로 전환되었는지를 나타냅니다.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
            🤝 KPI #3: 사회적 임팩트 가치 (S)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            일자리 창출 및 취약계층 지원을 통한 사회적 가치를 금액으로 환산하여 측정합니다.
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
              사회적 가치(만원) = (일자리 창출 인원 × 급여) + (아동 지원 × 교육비)
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#1E40AF', lineHeight: '1.6' }}>
              <strong>구성 요소:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><strong>일자리 창출:</strong> 노인 일자리 연계 인원 및 임금</li>
                <li><strong>교육 지원:</strong> 취약계층 아동 교육 프로그램 참여 인원 및 비용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tier1Details;
