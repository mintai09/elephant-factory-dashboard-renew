import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

function DataInsert() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const [formData, setFormData] = useState({
    // 기본 정보
    companyId: userInfo && userInfo.role === 'admin' ? '' : (userInfo ? userInfo.companyId : ''),
    campaignName: '',
    campaignPeriod: '',

    // 폐기물 수거량 (kg)
    wastePlasticPET: '',
    wastePlasticHDPE: '',
    toysReuse: '',
    toysUpcycling: '',
    toysRecycling: '',

    // 사회적 가치
    employeeCount: '',
    workHoursPerMonth: '',
    hourlyWage: '',
    educationParticipants: '',

    // 협력 네트워크
    partnersCorporate: '',
    partnersPublic: '',
    partnersEducation: '',
    partnersNPO: '',

    // 교육 도달 범위
    educationEmployees: '',
    educationPartners: '',
    educationCommunity: ''
  });

  const [success, setSuccess] = useState(false);

  const companies = [
    { id: 1, name: '코멘토' },
    { id: 2, name: 'SK Innovation' },
    { id: 3, name: '동서발전' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 로그인 체크 - 모든 hooks 이후에 실행
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // 데이터 계산
    const petKg = parseFloat(formData.wastePlasticPET) || 0;
    const hdpeKg = parseFloat(formData.wastePlasticHDPE) || 0;
    const toysReuse = parseFloat(formData.toysReuse) || 0;
    const toysUpcycle = parseFloat(formData.toysUpcycling) || 0;
    const toysRecycle = parseFloat(formData.toysRecycling) || 0;

    const employeeCount = parseInt(formData.employeeCount) || 0;
    const workHoursPerMonth = parseFloat(formData.workHoursPerMonth) || 0;
    const hourlyWage = parseFloat(formData.hourlyWage) || 0;
    const educationParticipants = parseInt(formData.educationParticipants) || 0;

    const partnersCorporate = parseInt(formData.partnersCorporate) || 0;
    const partnersPublic = parseInt(formData.partnersPublic) || 0;
    const partnersEducation = parseInt(formData.partnersEducation) || 0;
    const partnersNPO = parseInt(formData.partnersNPO) || 0;

    const educationEmployees = parseInt(formData.educationEmployees) || 0;
    const educationPartners = parseInt(formData.educationPartners) || 0;
    const educationCommunity = parseInt(formData.educationCommunity) || 0;

    // Tier 1 KPI 계산
    const plasticCO2 = (petKg * 2.29 * 2.5 + hdpeKg * 3.12 * 2.5) / 1000;
    const toysCO2 = (
      toysReuse * 2.75 * 3.0 +
      toysUpcycle * 2.75 * 2.5 +
      toysRecycle * 2.75 * 1.0
    ) / 1000;
    const totalCO2 = plasticCO2 + toysCO2;

    const totalCollected = petKg + hdpeKg + toysReuse + toysUpcycle + toysRecycle;
    const totalProduced = (petKg + hdpeKg) * 0.75 + toysReuse * 0.9 + toysUpcycle * 0.8;
    const conversionRate = totalCollected > 0 ? (totalProduced / totalCollected * 100) : 0;

    const jobValue = employeeCount * workHoursPerMonth * hourlyWage;
    const educationValue = educationParticipants * 30000;
    const socialValue = jobValue + educationValue;

    // Tier 2 KPI 계산
    const totalEnergySaving = petKg * 13.9 + hdpeKg * 12.5 + (toysReuse + toysUpcycle + toysRecycle) * 11.1;
    const totalPartners = partnersCorporate + partnersPublic + partnersEducation + partnersNPO;
    const totalResourceValue = (petKg + hdpeKg + toysReuse + toysUpcycle + toysRecycle) * 500;
    const educationScore = educationEmployees * 1.0 + educationPartners * 1.5 + educationCommunity * 2.0;
    const valueAddedRate = 420;

    // 저장할 데이터 구조
    const campaignData = {
      companyId: formData.companyId,
      campaignName: formData.campaignName,
      campaignPeriod: formData.campaignPeriod,
      tier1: {
        carbonReduction: {
          monthly: totalCO2,
          breakdown: {
            plastic: plasticCO2,
            toys: toysCO2
          }
        },
        circularResource: {
          conversionRate: conversionRate.toFixed(1),
          collected: totalCollected,
          produced: totalProduced
        },
        socialImpact: {
          totalValue: socialValue,
          jobValue: jobValue,
          educationValue: educationValue
        }
      },
      tier2: {
        energySaving: {
          monthlyValue: Math.round(totalEnergySaving)
        },
        partnerNetwork: {
          count: totalPartners,
          breakdown: {
            corporate: partnersCorporate,
            public: partnersPublic,
            education: partnersEducation,
            npo: partnersNPO
          }
        },
        resourceValue: {
          monthlyValue: Math.round(totalResourceValue)
        },
        educationReach: {
          totalScore: Math.round(educationScore),
          breakdown: {
            employees: educationEmployees,
            partners: educationPartners,
            community: educationCommunity
          }
        },
        upcyclingValue: {
          valueAddedRate: valueAddedRate
        }
      },
      rawData: formData
    };

    // 실제로는 서버에 POST 요청을 보냄
    console.log('저장할 데이터:', campaignData);

    setSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (success) {
    return (
      <div className="main-content">
        <div style={{
          maxWidth: '600px',
          margin: '4rem auto',
          padding: '3rem',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
            데이터가 성공적으로 저장되었습니다!
          </h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            대시보드 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="section">
        <h1 className="section-title">📊 ESG 캠페인 데이터 입력</h1>
        <p className="section-subtitle">
          캠페인 성과 데이터를 입력하여 ESG 대시보드에 반영하세요.
        </p>

        <form onSubmit={handleSubmit}>
          {/* 기본 정보 */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              기본 정보
            </h3>

            {userInfo.role === 'admin' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  기업 선택 <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                  required
                >
                  <option value="">기업을 선택하세요</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                캠페인 이름 <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleChange}
                placeholder="예: 수달 보호 캠페인"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                캠페인 기간
              </label>
              <input
                type="text"
                name="campaignPeriod"
                value={formData.campaignPeriod}
                onChange={handleChange}
                placeholder="예: 2025.03.01 ~ 2025.03.31"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          {/* 폐기물 수거량 */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
              폐기물 수거량 (kg)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  PET 플라스틱
                </label>
                <input
                  type="number"
                  name="wastePlasticPET"
                  value={formData.wastePlasticPET}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  HDPE 플라스틱
                </label>
                <input
                  type="number"
                  name="wastePlasticHDPE"
                  value={formData.wastePlasticHDPE}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  장난감 (재사용)
                </label>
                <input
                  type="number"
                  name="toysReuse"
                  value={formData.toysReuse}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  장난감 (업사이클링)
                </label>
                <input
                  type="number"
                  name="toysUpcycling"
                  value={formData.toysUpcycling}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  장난감 (일반재활용)
                </label>
                <input
                  type="number"
                  name="toysRecycling"
                  value={formData.toysRecycling}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 사회적 가치 */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              사회적 가치
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  노인 고용 인원
                </label>
                <input
                  type="number"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  월 근무시간
                </label>
                <input
                  type="number"
                  name="workHoursPerMonth"
                  value={formData.workHoursPerMonth}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  시간당 임금 (원)
                </label>
                <input
                  type="number"
                  name="hourlyWage"
                  value={formData.hourlyWage}
                  onChange={handleChange}
                  placeholder="10000"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  교육 직접 참여자
                </label>
                <input
                  type="number"
                  name="educationParticipants"
                  value={formData.educationParticipants}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 협력 네트워크 */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
              협력 네트워크 (개)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  민간 기업
                </label>
                <input
                  type="number"
                  name="partnersCorporate"
                  value={formData.partnersCorporate}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  공공기관
                </label>
                <input
                  type="number"
                  name="partnersPublic"
                  value={formData.partnersPublic}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  교육기관
                </label>
                <input
                  type="number"
                  name="partnersEducation"
                  value={formData.partnersEducation}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  비영리단체
                </label>
                <input
                  type="number"
                  name="partnersNPO"
                  value={formData.partnersNPO}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 교육 도달 범위 */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              교육 도달 범위 (명)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  임직원 대상
                </label>
                <input
                  type="number"
                  name="educationEmployees"
                  value={formData.educationEmployees}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  협력사 대상
                </label>
                <input
                  type="number"
                  name="educationPartners"
                  value={formData.educationPartners}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  지역사회 대상
                </label>
                <input
                  type="number"
                  name="educationCommunity"
                  value={formData.educationCommunity}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline"
              style={{ width: 'auto' }}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: 'auto' }}
            >
              데이터 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DataInsert;
