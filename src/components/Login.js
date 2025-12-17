import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // 하드코딩된 계정 정보
  const accounts = {
    'comento': { password: 'comento2025', role: 'company', companyId: 1, companyName: '코멘토' },
    'sk-innovation': { password: 'sk2025', role: 'company', companyId: 2, companyName: 'SK Innovation' },
    'dongseobaljeon': { password: 'dongse02025', role: 'company', companyId: 3, companyName: '동서발전' },
    'admin': { password: 'elephant2025', role: 'admin', companyId: null, companyName: '코끼리공장' }
  };

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

    const account = accounts[formData.username];

    if (!account) {
      setError('존재하지 않는 계정입니다.');
      return;
    }

    if (account.password !== formData.password) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 로그인 성공 - localStorage에 사용자 정보 저장
    const userInfo = {
      username: formData.username,
      role: account.role,
      companyId: account.companyId,
      companyName: account.companyName
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // 대시보드로 이동
    navigate('/dashboard');
  };

  return (
    <div className="main-content">
      <div style={{
        maxWidth: '500px',
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
            ESG 대시보드 로그인
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--color-text-dark)'
            }}>
              아이디
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
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
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
            로그인
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--color-border)'
        }}>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
            계정이 없으신가요?
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="btn btn-outline"
            style={{
              width: '100%'
            }}
          >
            회원가입
          </button>
        </div>

        {/* 테스트 계정 안내 */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'var(--color-bg-light)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--color-text-light)'
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-dark)' }}>
            테스트 계정:
          </strong>
          <div>기업: comento / comento2025</div>
          <div>기업: sk-innovation / sk2025</div>
          <div>기업: dongseobaljeon / dongse02025</div>
          <div>관리자: admin / elephant2025</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
