import React from 'react';

function ProjectOverview() {
  return (
    <div className="main-content">
      <div className="section">
        {/* Hero Section */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '3rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐘</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>코끼리공장</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.95, lineHeight: '1.8' }}>
            기업 ESG 캠페인 지속 참여를 위한 성과 측정 지표
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">🎯 우리의 미션</h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151', marginBottom: '1.5rem' }}>
            코끼리공장은 <strong>순환 경제를 통한 폐기물 문제 해결</strong>을 핵심 존재 목적으로 하는 사회적 기업입니다.
            기업의 ESG 캠페인 성과를 <strong>측정 가능한 데이터</strong>로 변환하여, KCGS, MSCI 등
            공식 평가 기준에 자동 매핑되는 대시보드 솔루션을 제공합니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', borderLeft: '4px solid #10B981' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#10B981' }}>🌍 환경 (E)</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                폐플라스틱과 장난감을 수거하여 업사이클링 제품으로 전환, 탄소 저감 및 순환 자원 기여
              </p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', borderLeft: '4px solid #3B82F6' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3B82F6' }}>🤝 사회 (S)</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                노인 일자리 창출, 취약계층 아동 교육 지원을 통한 사회적 가치 창출
              </p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem', borderLeft: '4px solid #F59E0B' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#F59E0B' }}>📋 지배구조 (G)</h3>
              <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
                투명한 성과 공유, 자원 가치 보존, 업사이클링 부가가치 창출
              </p>
            </div>
          </div>
        </div>

        {/* 3-Tier KPI Structure */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">📊 3-Tier KPI 체계 구조</h2>
          <p className="section-subtitle">
            코끼리공장은 3단계 계층 구조의 KPI 시스템으로 성과를 측정하고 관리합니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            {/* Tier 1 */}
            <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '6px solid #10B981' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#10B981' }}>
                🔑 Tier 1: 핵심 KPI (3개)
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                → 매월 측정, 경영진 보고용
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  <strong>KPI #1:</strong> 탄소 저감 기여도 (E)
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  <strong>KPI #2:</strong> 순환 자원 기여도 (E)
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  <strong>KPI #3:</strong> 사회적 임팩트 지수 (S)
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '6px solid #3B82F6' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#3B82F6' }}>
                📊 Tier 2: 보조 KPI (5개)
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                → 분기별 측정, 상세 분석용
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  KPI #4: 에너지 절감 효과 (E)
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  KPI #5: 협력 네트워크 확장도 (S)
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  KPI #6: 자원 가치 보존액 (G)
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  KPI #7: 교육 도달 범위 (S)
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                  KPI #8: 업사이클링 부가가치율 (G)
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', borderLeft: '6px solid #F59E0B' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#F59E0B' }}>
                🏆 Tier 3: 통합 KPI (1개)
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                → 연간 평가, 대외 공시용
              </p>
              <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.375rem', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.125rem' }}>ESG 임팩트 스코어</strong>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  = (E 점수 × 0.5) + (S 점수 × 0.3) + (G 점수 × 0.2)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 1 KPI Detailed Formulas */}
        <div className="section">
          <h2 className="section-title">🔬 Tier 1 핵심 KPI 공식 및 과학적 근거</h2>

          {/* KPI #1: Carbon Reduction */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10B981' }}>
              🌍 KPI #1. 탄소 저감 기여도 (Carbon Reduction Contribution)
            </h3>

            <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>측정 지표</h4>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10B981' }}>
                월간 탄소 저감량 (tonnes CO₂-eq)
              </p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>기본 산출식</h4>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '1.125rem',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                marginBottom: '1rem'
              }}>
                탄소 저감량 = Σ(폐기물 수거량ᵢ × 소각 배출계수ᵢ)
              </div>
              <p style={{ color: '#6B7280', lineHeight: '1.8' }}>
                폐기물을 재활용/업사이클링하지 않고 소각할 경우 발생하는 CO₂ 배출량을 기준으로 계산합니다.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>소각 배출계수 (IPCC 2006 기준)</h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>폐기물 유형</th>
                    <th>배출계수</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>PET</strong></td>
                    <td style={{ color: '#10B981', fontWeight: '600' }}>2.29 kg CO₂/kg</td>
                    <td>폴리에틸렌 테레프탈레이트 (페트병)</td>
                  </tr>
                  <tr>
                    <td><strong>HDPE</strong></td>
                    <td style={{ color: '#10B981', fontWeight: '600' }}>3.12 kg CO₂/kg</td>
                    <td>고밀도 폴리에틸렌 (용기류)</td>
                  </tr>
                  <tr>
                    <td><strong>혼합 플라스틱</strong></td>
                    <td style={{ color: '#F59E0B', fontWeight: '600' }}>2.75 kg CO₂/kg</td>
                    <td>장난감 등 복합 플라스틱</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* RBF and UF Factors */}
            <div style={{ padding: '1.5rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#F59E0B' }}>
                ⚡ RBF 및 UF 보정 계수 (순환 경제 가중치)
              </h4>

              <div style={{ marginBottom: '1.5rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>계수명</th>
                      <th>값</th>
                      <th>정의 및 목적</th>
                      <th>근거</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: '600', color: '#DC2626' }}>
                        RBF<br/>(Reuse Benefit Factor)
                      </td>
                      <td style={{ fontSize: '1.5rem', fontWeight: '700', color: '#DC2626' }}>3.0</td>
                      <td>
                        재사용(수리/기부)되는 장난감에 대한 탄소 절감 가중치.
                        신제품 생산을 완전히 대체하여 에너지 투입을 대폭 줄임.
                      </td>
                      <td>
                        재사용은 신제품 생산 대비 3~5배의 환경 효과.
                        보수적으로 3.0 적용.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: '600', color: '#059669' }}>
                        UF<br/>(Upcycling Factor)
                      </td>
                      <td style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>2.5</td>
                      <td>
                        고품질 재생원료나 업사이클 제품(섬유 원료, 교육 키트 등)으로
                        전환할 때 부여하는 가중치.
                      </td>
                      <td>
                        단순 재활용보다 높고(더 많은 버진 소재 대체),
                        재사용보다는 낮은 중간 수준의 환경 가치.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem' }}>
                <h5 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                  최종 산출식 (가중치 적용):
                </h5>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: '1.8',
                  color: '#374151'
                }}>
                  총 CO₂ 저감량 = Σ(순환 경로별 폐기물량 × 기본 CO₂ 저감량 × 보정계수)
                  <br/><br/>
                  예시: 1톤의 장난감 중 재사용 20%, 업사이클링 50%, 재활용 30%인 경우:
                  <br/>
                  총 CO₂ 저감 가중치 = (0.2 × 3.0) + (0.5 × 2.5) + (0.3 × 1.0)
                  <br/>
                  = 0.60 + 1.25 + 0.30 = <strong style={{ color: '#10B981' }}>2.15</strong> (기본 재활용 대비 2.15배 효과)
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>과학적 근거</h4>
              <ul style={{ lineHeight: '1.8', color: '#374151' }}>
                <li><strong>IPCC 2006 GL Volume 5</strong> - 폐기물 소각 배출계수</li>
                <li><strong>『국가 온실가스 인벤토리 보고서』</strong> (환경부, 2024)</li>
                <li><strong>Ellen MacArthur Foundation</strong> - 순환경제 가치 측정 방법론</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#DBEAFE', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>ESG 평가 연계</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <strong>KCGS:</strong> 환경경영 → 기후변화 대응
                </div>
                <div>
                  <strong>CDP:</strong> C4 (목표 및 성과), C6 (Scope 3)
                </div>
                <div>
                  <strong>GRI:</strong> 305-5 (배출 감축량)
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>목표 설정</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>기본</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#F59E0B' }}>1.5 tonnes</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>월 이상</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>우수</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3B82F6' }}>3.0 tonnes</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>월 이상</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.375rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>탁월</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>5.0 tonnes</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>월 이상</div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI #2: Circular Resource */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10B981' }}>
              ♻️ KPI #2. 순환 자원 기여도 (Circular Resource Contribution)
            </h3>

            <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>측정 지표</h4>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#10B981' }}>
                폐기물 전환율 (%)
              </p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>산출식</h4>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '1.125rem',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.375rem'
              }}>
                전환율 = (업사이클링 제품 생산량 / 총 수거 폐기물량) × 100
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>과학적 근거</h4>
              <ul style={{ lineHeight: '1.8', color: '#374151' }}>
                <li><strong>Ellen MacArthur Foundation</strong> - "The New Plastics Economy" (2016)</li>
                <li><strong>GRI 306-4</strong> - 폐기 이외로 전환된 폐기물</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>목표 설정</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>기본</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#F59E0B' }}>70%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>우수</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3B82F6' }}>80%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>탁월</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>85%</div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI #3: Social Impact */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3B82F6' }}>
              🤝 KPI #3. 사회적 임팩트 지수 (Social Impact Index)
            </h3>

            <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>측정 지표</h4>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3B82F6' }}>
                사회적 가치 창출액 (원)
              </p>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>산출식</h4>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                lineHeight: '1.8'
              }}>
                사회적 가치 = (노인 일자리 창출 가치) + (교육 참여 가치)
                <br/><br/>
                1) 일자리 가치 = 고용 인원 × 월 근무시간 × 시간당 임금
                <br/>
                2) 교육 가치 = 직접 참여자 × 30,000원
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>과학적 근거</h4>
              <ul style={{ lineHeight: '1.8', color: '#374151' }}>
                <li><strong>한국사회적기업진흥원</strong> - "사회적 가치 측정 가이드라인" (2021)</li>
                <li><strong>고용노동부</strong> - "노인 일자리 사업 성과 측정 매뉴얼" (2023)</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>목표 설정</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>기본</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#F59E0B' }}>500만원</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>월 이상</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>우수</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#3B82F6' }}>800만원</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>월 이상</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>탁월</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10B981' }}>1,200만원</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>월 이상</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Conversion Indicators */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="section-title">🌳 환산 지표 (쉽게 알아볼 수 있는 지표)</h2>
          <p className="section-subtitle">
            CO₂ 저감량을 일상적인 지표로 변환하여 성과를 직관적으로 이해할 수 있도록 합니다.
          </p>

          <table className="data-table" style={{ marginTop: '1.5rem' }}>
            <thead>
              <tr>
                <th>환산 지표</th>
                <th>환산 계수 (1kg CO₂ 기준)</th>
                <th>과학적 근거</th>
                <th>출처</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600' }}>🌲 나무 그루 수</td>
                <td style={{ fontSize: '1.125rem', color: '#10B981' }}>0.113 그루/년</td>
                <td>성숙한 나무 1그루가 1년간 약 22 kg CO₂ 흡수</td>
                <td>미국 농무부 (USDA)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>🚗 자동차 운행 감축</td>
                <td style={{ fontSize: '1.125rem', color: '#3B82F6' }}>0.000539 car-years</td>
                <td>승용차 1대의 연간 배출량 약 4.6 tonnes CO₂</td>
                <td>미국 환경보호국 (EPA)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>🧊 북극 해빙 보존</td>
                <td style={{ fontSize: '1.125rem', color: '#06B6D4' }}>0.00744 m²</td>
                <td>CO₂ 1톤 배출 시 북극 해빙 약 3 m² 감소</td>
                <td>기후 변화 관련 과학 연구</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: '#10B981' }}>
              홍보 메시지 예시 (누적 임팩트 강조)
            </h4>
            <ul style={{ lineHeight: '2', color: '#374151' }}>
              <li>"장난감 1톤 순환은 소나무 <strong>113그루</strong>가 1년간 흡수하는 탄소와 같습니다."</li>
              <li>"장난감 1톤 순환은 승용차 한 대를 약 <strong>2개월간</strong> 운행 중단시킨 효과와 같습니다."</li>
              <li>"장난감 1톤 순환으로 북극곰 서식지 빙하 약 <strong>7.44 m²</strong>를 보존했습니다."</li>
            </ul>
          </div>
        </div>

        {/* ESG Impact Score Grading */}
        <div className="card">
          <h2 className="section-title">🏆 Tier 3: ESG 임팩트 스코어 등급 체계</h2>

          <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>가중치 배분 논리</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.375rem', borderLeft: '4px solid #10B981' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem' }}>50%</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>환경 (E)</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  순환 경제를 통한 폐기물 문제 해결이 코끼리공장의 핵심 존재 목적
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '0.375rem', borderLeft: '4px solid #3B82F6' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6', marginBottom: '0.5rem' }}>30%</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>사회 (S)</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  사회적 기업으로서의 정체성과 취약 계층 고용, 환경 교육의 중요성
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#FEF3C7', borderRadius: '0.375rem', borderLeft: '4px solid #F59E0B' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B', marginBottom: '0.5rem' }}>20%</div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>경제 (G)</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.6' }}>
                  E와 S 활동의 기반이 되는 재무적 지속가능성과 순환 경제 기여도
                </div>
              </div>
            </div>
          </div>

          <table className="data-table" style={{ marginBottom: '1.5rem' }}>
            <thead>
              <tr>
                <th>등급</th>
                <th>점수 범위</th>
                <th>평가 의미</th>
                <th>전략적 목표 및 활용</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#F0FDF4' }}>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#10B981' }}>S (Superior)</td>
                <td style={{ fontWeight: '600' }}>80-100점</td>
                <td>탁월, 업계 최고 수준</td>
                <td>순환성 지수 80% 이상 유지, 글로벌 모범 사례 제시</td>
              </tr>
              <tr style={{ backgroundColor: '#EFF6FF' }}>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#3B82F6' }}>A (Advanced)</td>
                <td style={{ fontWeight: '600' }}>60-80점</td>
                <td>우수, 선도적 활동</td>
                <td>지속가능경영 보고서 발간 및 제3자 검증 추진 기반</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#059669' }}>B (Basic)</td>
                <td style={{ fontWeight: '600' }}>40-60점</td>
                <td>양호, 기본 목표 달성</td>
                <td>KPI 데이터의 안정적인 측정 및 보고 정착</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#F59E0B' }}>C (Caution)</td>
                <td style={{ fontWeight: '600' }}>20-40점</td>
                <td>주의, 개선 필요</td>
                <td>핵심 활동(E, S)에 대한 프로세스 및 목표 재검토</td>
              </tr>
              <tr>
                <td style={{ fontSize: '1.125rem', fontWeight: '700', color: '#DC2626' }}>D (Deficient)</td>
                <td style={{ fontWeight: '600' }}>0-20점</td>
                <td>미흡, 전면 재검토</td>
                <td>데이터 수집 및 관리 시스템의 문제점 해결</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectOverview;
