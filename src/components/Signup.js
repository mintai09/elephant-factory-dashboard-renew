import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    companyId: '',
    email: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const companies = [
    { id: 'comento', name: '코멘토' },
    { id: 'sk-innovation', name: 'SK이노베이션' },
    { id: 'kewespo', name: '동서발전' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.username || !formData.password || !formData.passwordConfirm || !formData.companyId) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 성공 (실제로는 서버에 전송)
    setSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  if (success) {
    return (
      <div className="main-content">
        <div style={{
          maxWidth: '500px',
          margin: '4rem auto',
          padding: '3rem',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
            회원가입이 완료되었습니다!
          </h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            로그인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div style={{
        maxWidth: '600px',
        margin: '4rem auto',
        padding: '3rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* 로고 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐘</div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--color-primary)',
            marginBottom: '0.5rem'
          }}>
            코끼리공장
          </h1>
          <p style={{ color: 'var(--color-text-light)' }}>
            ESG 대시보드 회원가입
          </p>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              소속 기업 <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                backgroundColor: 'white'
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@company.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              아이디 <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              비밀번호 <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="최소 6자 이상"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              비밀번호 확인 <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              marginBottom: '1rem'
            }}
          >
            회원가입
          </button>
        </form>

        {/* 로그인 링크 */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--color-border)'
        }}>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
            이미 계정이 있으신가요?
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-outline"
            style={{
              width: '100%'
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
