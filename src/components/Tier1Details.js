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
            🌍 1. 탄소 저감 기여도 (E)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            폐플라스틱 및 장난감 수거를 통해 소각을 방지함으로써 저감한 탄소량을 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#10B981' }}>측정 공식</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.125rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827'
            }}>
              탄소 저감량 = Σ(폐기물 수거량ᵢ × 소각 배출계수ᵢ)
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#10B981' }}>
            ♻️ 2. 순환 자원 기여도 (E)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            폐기물을 재사용 또는 업사이클링하여 자원 순환에 기여한 정도를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#10B981' }}>측정 공식</h3>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.125rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem',
              color: '#111827'
            }}>
              순환 자원량 = 재사용량 + 업사이클링량
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
            🤝 3. 사회적 임팩트 지수 (S)
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1rem' }}>
            노인 일자리 창출 및 아동 교육 지원을 통한 사회적 가치를 측정합니다.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#3B82F6' }}>측정 지표</h3>
            <ul style={{ lineHeight: '2', color: '#374151', paddingLeft: '1.5rem' }}>
              <li>노인 일자리 창출 인원</li>
              <li>교육 프로그램 참여 아동 수</li>
              <li>취약계층 지원 범위</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tier1Details;
