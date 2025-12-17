import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🐘</span>
          <span>코끼리공장</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">코끼리공장 개요</Link>
          </li>
          <li>
            <Link to="/overview">ESG 성과 지표 설명</Link>
          </li>
          <li>
            <Link to="/dashboard">ESG 대시보드</Link>
          </li>
          {userInfo && userInfo.role === 'admin' && (
            <li>
              <Link to="/companies">기업별 성과</Link>
            </li>
          )}
          <li>
            <Link to="/simulator">ESG 시뮬레이션</Link>
          </li>
          {userInfo && (
            <li>
              <Link to="/data-insert">데이터 입력</Link>
            </li>
          )}
          {userInfo ? (
            <>
              <li style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                {userInfo.companyName} ({userInfo.username})
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    font: 'inherit',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
