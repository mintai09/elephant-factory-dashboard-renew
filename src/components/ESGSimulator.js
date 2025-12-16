import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ESGSimulator() {
  const [formData, setFormData] = useState({
    // 기업 기본 정보
    companyName: '',
    industry: '',

    // Tier 1 KPI
    wastePlasticPET: '',
    wastePlasticHDPE: '',
    toysReuse: '',
    toysUpcycling: '',
    toysRecycling: '',

    // Tier 2 KPI
    energySavingPET: '',
    energySavingHDPE: '',
    energySavingMixed: '',
    partnersCorporate: '',
    partnersPublic: '',
    partnersEducation: '',
    partnersNPO: '',
    resourceValuePlastic: '',
    resourceValueToys: '',
    educationEmployees: '',
    educationPartners: '',
    educationCommunity: '',
    rawMaterialValue: '',
    finalProductValue: ''
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateResults = (e) => {
    e.preventDefault();

    // Tier 1 KPI 계산
    const petKg = parseFloat(formData.wastePlasticPET) || 0;
    const hdpeKg = parseFloat(formData.wastePlasticHDPE) || 0;
    const toysReuse = parseFloat(formData.toysReuse) || 0;
    const toysUpcycle = parseFloat(formData.toysUpcycling) || 0;
    const toysRecycle = parseFloat(formData.toysRecycling) || 0;

    // CO2 저감 계산
    const plasticCO2 = (petKg * 2.29 * 2.5 + hdpeKg * 3.12 * 2.5) / 1000;
    const toysCO2 = (toysReuse * 2.75 * 3.0 + toysUpcycle * 2.75 * 2.5 + toysRecycle * 2.75 * 1.0) / 1000;
    const totalCO2 = plasticCO2 + toysCO2;

    // 순환 자원 기여도
    const totalCollected = petKg + hdpeKg + toysReuse + toysUpcycle + toysRecycle;
    const totalProduced = (petKg + hdpeKg) * 0.75 + toysReuse * 0.9 + toysUpcycle * 0.8;
    const conversionRate = totalCollected > 0 ? (totalProduced / totalCollected * 100) : 0;

    // Tier 2 KPI 계산
    const energySaving = (
      parseFloat(formData.energySavingPET) || 0 +
      parseFloat(formData.energySavingHDPE) || 0 +
      parseFloat(formData.energySavingMixed) || 0
    );

    const totalPartners = (
      parseInt(formData.partnersCorporate) || 0 +
      parseInt(formData.partnersPublic) || 0 +
      parseInt(formData.partnersEducation) || 0 +
      parseInt(formData.partnersNPO) || 0
    );

    const resourceValue = (
      parseFloat(formData.resourceValuePlastic) || 0 +
      parseFloat(formData.resourceValueToys) || 0
    );

    const educationScore = (
      (parseInt(formData.educationEmployees) || 0) * 1.0 +
      (parseInt(formData.educationPartners) || 0) * 1.5 +
      (parseInt(formData.educationCommunity) || 0) * 2.0
    );

    const rawValue = parseFloat(formData.rawMaterialValue) || 1;
    const finalValue = parseFloat(formData.finalProductValue) || 0;
    const valueAddedRate = rawValue > 0 ? ((finalValue - rawValue) / rawValue * 100) : 0;

    // Tier 3 ESG 점수 계산
    // E 점수 = (탄소절감 × 0.5) + (에너지절감 × 0.2) + (순환성 × 0.3)
    const carbonScore = Math.min((totalCO2 / 3.5) * 100, 100);
    const energyScore = Math.min((energySaving / 15000) * 100, 100);
    const circularityScore = Math.min((conversionRate / 75) * 100, 100);
    const eScore = Math.round(carbonScore * 0.5 + energyScore * 0.2 + circularityScore * 0.3);

    // S 점수 = (교육참여 × 0.5) + (협력기관 × 0.5)
    const educationScoreNorm = Math.min((educationScore / 1200) * 100, 100);
    const partnerScoreNorm = Math.min((totalPartners / 10) * 100, 100);
    const sScore = Math.round(educationScoreNorm * 0.5 + partnerScoreNorm * 0.5);

    // G 점수 = (자원가치 × 0.6) + (부가가치 × 0.4)
    const resourceScoreNorm = Math.min((resourceValue / 500000) * 100, 100);
    const valueAddedScoreNorm = Math.min((valueAddedRate / 400) * 100, 100);
    const gScore = Math.round(resourceScoreNorm * 0.6 + valueAddedScoreNorm * 0.4);

    // 총점 = (E × 0.5) + (S × 0.3) + (G × 0.2)
    const totalScore = Math.round(eScore * 0.5 + sScore * 0.3 + gScore * 0.2);

    // 등급 결정
    let grade = 'D';
    let gradeDescription = '기초, 개선 필요';
    if (totalScore >= 80) {
      grade = 'S';
      gradeDescription = '탁월, 업계 최고 수준';
    } else if (totalScore >= 60) {
      grade = 'A';
      gradeDescription = '우수, 선도적 활동';
    } else if (totalScore >= 40) {
      grade = 'B';
      gradeDescription = '양호, 평균 이상';
    } else if (totalScore >= 20) {
      grade = 'C';
      gradeDescription = '보통, 지속적 관리 필요';
    }

    setResults({
      tier1: {
        carbonReduction: totalCO2.toFixed(2),
        plasticCO2: plasticCO2.toFixed(2),
        toysCO2: toysCO2.toFixed(2),
        conversionRate: conversionRate.toFixed(1),
        totalCollected: totalCollected.toFixed(0),
        totalProduced: totalProduced.toFixed(0)
      },
      tier2: {
        energySaving: energySaving.toFixed(0),
        totalPartners: totalPartners,
        resourceValue: resourceValue.toFixed(0),
        educationScore: educationScore.toFixed(0),
        valueAddedRate: valueAddedRate.toFixed(1)
      },
      tier3: {
        eScore,
        sScore,
        gScore,
        totalScore,
        grade,
        gradeDescription
      }
    });
  };

  const getGradeColor = (grade) => {
    if (grade === 'S') return '#10B981';
    if (grade === 'A') return '#3B82F6';
    if (grade === 'B') return '#059669';
    if (grade === 'C') return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="section">
        <div className="card" style={{
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            🎯 ESG 시뮬레이션
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            귀사의 ESG 활동 데이터를 입력하여 예상 성과와 등급을 확인하세요
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: results ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        {/* Input Form */}
        <div className="section">
          <h2 className="section-title">📝 데이터 입력</h2>

          <form onSubmit={calculateResults}>
            {/* 기본 정보 */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10B981' }}>
                기업 기본 정보
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    기업명
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="예: 코멘토"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    업종
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="예: 에듀테크"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tier 1 데이터 */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10B981' }}>
                Tier 1: 폐기물 수거량 (kg)
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    PET 병 (kg)
                  </label>
                  <input
                    type="number"
                    name="wastePlasticPET"
                    value={formData.wastePlasticPET}
                    onChange={handleChange}
                    placeholder="650"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    HDPE 용기 (kg)
                  </label>
                  <input
                    type="number"
                    name="wastePlasticHDPE"
                    value={formData.wastePlasticHDPE}
                    onChange={handleChange}
                    placeholder="150"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    장난감 재사용 (kg)
                  </label>
                  <input
                    type="number"
                    name="toysReuse"
                    value={formData.toysReuse}
                    onChange={handleChange}
                    placeholder="210"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    장난감 업사이클링 (kg)
                  </label>
                  <input
                    type="number"
                    name="toysUpcycling"
                    value={formData.toysUpcycling}
                    onChange={handleChange}
                    placeholder="140"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    장난감 재활용 (kg)
                  </label>
                  <input
                    type="number"
                    name="toysRecycling"
                    value={formData.toysRecycling}
                    onChange={handleChange}
                    placeholder="90"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tier 2 데이터 */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#3B82F6' }}>
                Tier 2: 보조 지표
              </h3>

              <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#10B981' }}>
                에너지 절감 (kWh)
              </h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="number"
                  name="energySavingPET"
                  value={formData.energySavingPET}
                  onChange={handleChange}
                  placeholder="PET 에너지 절감량 (예: 9035)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="energySavingHDPE"
                  value={formData.energySavingHDPE}
                  onChange={handleChange}
                  placeholder="HDPE 에너지 절감량 (예: 1875)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="energySavingMixed"
                  value={formData.energySavingMixed}
                  onChange={handleChange}
                  placeholder="혼합 플라스틱 에너지 절감량 (예: 4884)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#3B82F6' }}>
                협력 네트워크 (개)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="number"
                  name="partnersCorporate"
                  value={formData.partnersCorporate}
                  onChange={handleChange}
                  placeholder="민간 기업 (예: 5)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="partnersPublic"
                  value={formData.partnersPublic}
                  onChange={handleChange}
                  placeholder="공공기관 (예: 3)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="partnersEducation"
                  value={formData.partnersEducation}
                  onChange={handleChange}
                  placeholder="교육기관 (예: 3)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="partnersNPO"
                  value={formData.partnersNPO}
                  onChange={handleChange}
                  placeholder="비영리단체 (예: 1)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#F59E0B' }}>
                자원 가치 (원)
              </h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="number"
                  name="resourceValuePlastic"
                  value={formData.resourceValuePlastic}
                  onChange={handleChange}
                  placeholder="플라스틱 재자원화 가치 (예: 450000)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="resourceValueToys"
                  value={formData.resourceValueToys}
                  onChange={handleChange}
                  placeholder="장난감 재사용 가치 (예: 170000)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#3B82F6' }}>
                교육 도달 범위 (명)
              </h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="number"
                  name="educationEmployees"
                  value={formData.educationEmployees}
                  onChange={handleChange}
                  placeholder="임직원 참여 (예: 120)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="educationPartners"
                  value={formData.educationPartners}
                  onChange={handleChange}
                  placeholder="협력사 참여 (예: 80)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="educationCommunity"
                  value={formData.educationCommunity}
                  onChange={handleChange}
                  placeholder="지역사회 참여 (예: 100)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#F59E0B' }}>
                업사이클링 부가가치 (원)
              </h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="number"
                  name="rawMaterialValue"
                  value={formData.rawMaterialValue}
                  onChange={handleChange}
                  placeholder="원재료 가치 (예: 620000)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  name="finalProductValue"
                  value={formData.finalProductValue}
                  onChange={handleChange}
                  placeholder="최종 제품 가치 (예: 3224000)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}
            >
              🎯 ESG 성과 시뮬레이션 실행
            </button>
          </form>
        </div>

        {/* Results */}
        {results && (
          <div className="section">
            <h2 className="section-title">📊 시뮬레이션 결과</h2>

            {/* Tier 3 종합 결과 */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{
                padding: '2rem',
                background: `linear-gradient(135deg, ${getGradeColor(results.tier3.grade)} 0%, ${getGradeColor(results.tier3.grade)}CC 100%)`,
                borderRadius: '1rem',
                color: 'white',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  {formData.companyName || '귀사'}의 ESG 임팩트 스코어
                </div>
                <div style={{ fontSize: '4rem', fontWeight: '700', marginBottom: '1rem' }}>
                  {results.tier3.totalScore}점
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{results.tier3.grade}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{results.tier3.gradeDescription}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F0FDF4',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                    E (환경)
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
                    {results.tier3.eScore}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>가중치 50%</div>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                    S (사회)
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>
                    {results.tier3.sScore}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>가중치 30%</div>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#FEF3C7',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                    G (경제)
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>
                    {results.tier3.gScore}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>가중치 20%</div>
                </div>
              </div>
            </div>

            {/* Tier 1 결과 */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10B981' }}>
                Tier 1 핵심 KPI
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>탄소 저감 기여도</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
                    {results.tier1.carbonReduction} tonnes CO₂
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
                    플라스틱: {results.tier1.plasticCO2}t | 장난감: {results.tier1.toysCO2}t
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>순환 자원 기여도</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>
                    {results.tier1.conversionRate}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem' }}>
                    수거 {results.tier1.totalCollected}kg → 제품 {results.tier1.totalProduced}kg
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 2 결과 */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#3B82F6' }}>
                Tier 2 보조 KPI
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem' }}>
                  <span>⚡ 에너지 절감 효과</span>
                  <strong style={{ color: '#10B981' }}>{results.tier2.energySaving} kWh</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                  <span>🤝 협력 네트워크</span>
                  <strong style={{ color: '#3B82F6' }}>{results.tier2.totalPartners}개</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                  <span>💰 자원 가치 보존액</span>
                  <strong style={{ color: '#F59E0B' }}>{parseInt(results.tier2.resourceValue).toLocaleString()}원</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem' }}>
                  <span>📚 교육 도달 범위</span>
                  <strong style={{ color: '#3B82F6' }}>{results.tier2.educationScore}점</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#FEF3C7', borderRadius: '0.5rem' }}>
                  <span>🔄 업사이클링 부가가치율</span>
                  <strong style={{ color: '#F59E0B' }}>{results.tier2.valueAddedRate}%</strong>
                </div>
              </div>
            </div>

            {/* 환산 지표 */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#10B981' }}>
                🌳 환산 지표
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌲</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>
                    {Math.round(parseFloat(results.tier1.carbonReduction) * 1000 / 22)}그루
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    소나무 1년 흡수량
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚗</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>
                    {(parseFloat(results.tier1.carbonReduction) / 4.6).toFixed(1)}대
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    승용차 1년 운행 중단
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧊</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>
                    {Math.round(parseFloat(results.tier1.carbonReduction) * 1000 * 0.00744)}m²
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
                    북극 빙하 보존
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 뒤로가기 */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/" className="btn btn-outline">
          ← 대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default ESGSimulator;
