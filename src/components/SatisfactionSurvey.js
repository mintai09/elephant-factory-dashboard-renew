import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SatisfactionSurvey() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    overallSatisfaction: 0,
    programEffectiveness: 0,
    participationEase: 0,
    communicationQuality: 0,
    recommendations: '',
    improvements: ''
  });

  const handleRatingClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 만족도 조사 데이터를 localStorage에 저장 (실제로는 서버로 전송)
    const surveyData = {
      ...formData,
      timestamp: new Date().toISOString(),
      userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
    };

    // 기존 설문 데이터 가져오기
    const existingSurveys = JSON.parse(localStorage.getItem('satisfactionSurveys') || '[]');
    existingSurveys.push(surveyData);
    localStorage.setItem('satisfactionSurveys', JSON.stringify(existingSurveys));

    setSubmitted(true);

    // 3초 후 대시보드로 이동
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const StarRating = ({ field, value, label }) => {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.75rem',
          fontWeight: '600',
          fontSize: '1rem',
          color: '#374151'
        }}>
          {label}
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(field, star)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '2rem',
                transition: 'all 0.2s',
                transform: value >= star ? 'scale(1.1)' : 'scale(1)',
                padding: '0.25rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = value >= star ? 'scale(1.1)' : 'scale(1)'}
            >
              <span style={{ color: value >= star ? '#F59E0B' : '#D1D5DB' }}>★</span>
            </button>
          ))}
          <span style={{ marginLeft: '1rem', color: '#6B7280', fontSize: '0.875rem' }}>
            {value > 0 ? `${value}점` : '선택 안함'}
          </span>
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1F2937' }}>
            감사합니다!
          </h2>
          <p style={{ color: '#6B7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            소중한 의견을 주셔서 감사합니다.<br />
            더 나은 서비스를 위해 노력하겠습니다.
          </p>
          <div style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#667eea',
            color: 'white',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            잠시 후 대시보드로 이동합니다...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="page-header" style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0',
        color: 'white'
      }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '3rem 2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
            📋 만족도 조사
          </h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            프로그램 개선을 위해 여러분의 소중한 의견을 들려주세요
          </p>
        </div>
      </div>

      <div className="main-content">
        <div className="section">
          <form onSubmit={handleSubmit} style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
                color: '#1F2937',
                fontWeight: '700'
              }}>
                만족도 평가
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                각 항목에 대해 별점을 선택해주세요 (1점: 매우 불만족, 5점: 매우 만족)
              </p>
            </div>

            <StarRating
              field="overallSatisfaction"
              value={formData.overallSatisfaction}
              label="1. 코끼리공장 프로그램에 대한 전반적인 만족도는 어떠신가요?"
            />

            <StarRating
              field="programEffectiveness"
              value={formData.programEffectiveness}
              label="2. 폐플라스틱/장난감 수거 프로그램이 환경 보호에 효과적이라고 생각하시나요?"
            />

            <StarRating
              field="participationEase"
              value={formData.participationEase}
              label="3. 프로그램 참여가 쉽고 편리했나요?"
            />

            <StarRating
              field="communicationQuality"
              value={formData.communicationQuality}
              label="4. 프로그램 관련 정보 전달 및 소통이 원활했나요?"
            />

            <div style={{ marginBottom: '2rem', marginTop: '3rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                fontSize: '1rem',
                color: '#374151'
              }}>
                5. 다른 사람에게 이 프로그램을 추천하시겠습니까? (선택)
              </label>
              <textarea
                value={formData.recommendations}
                onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                placeholder="추천하시는 이유나 주저하시는 이유를 자유롭게 작성해주세요..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                fontSize: '1rem',
                color: '#374151'
              }}>
                6. 개선이 필요한 부분이나 건의사항이 있으신가요? (선택)
              </label>
              <textarea
                value={formData.improvements}
                onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                placeholder="프로그램 개선을 위한 의견을 자유롭게 작성해주세요..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  fontSize: '0.9375rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '2px solid #F3F4F6'
            }}>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '0.875rem 2rem',
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={formData.overallSatisfaction === 0}
                style={{
                  padding: '0.875rem 2.5rem',
                  background: formData.overallSatisfaction === 0
                    ? '#D1D5DB'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: formData.overallSatisfaction === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: '700',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  boxShadow: formData.overallSatisfaction === 0
                    ? 'none'
                    : '0 4px 12px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  if (formData.overallSatisfaction > 0) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.overallSatisfaction > 0) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                제출하기
              </button>
            </div>

            {formData.overallSatisfaction === 0 && (
              <p style={{
                textAlign: 'center',
                color: '#EF4444',
                fontSize: '0.875rem',
                marginTop: '1rem'
              }}>
                * 전반적인 만족도는 필수 항목입니다
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SatisfactionSurvey;
