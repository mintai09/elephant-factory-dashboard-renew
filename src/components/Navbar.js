import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div
        className={`nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <span className="logo-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="12" r="4" />
                <path d="M12 12h4.5a3.5 3.5 0 0 1 0 7H12" />
                <path d="M6 12H4a2 2 0 0 0-2 2v5" />
                <circle cx="15.5" cy="7" r="3.5" />
              </svg>
            </span>
            <span>코끼리공장</span>
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>홈</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>개요</Link>
            </li>
            <li>
              <Link to="/overview" onClick={() => setMobileMenuOpen(false)}>성과지표</Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>대시보드</Link>
            </li>
            {userInfo && userInfo.role === 'admin' && (
              <li>
                <Link to="/companies" onClick={() => setMobileMenuOpen(false)}>기업별성과</Link>
              </li>
            )}
            <li>
              <Link to="/simulator" onClick={() => setMobileMenuOpen(false)}>시뮬레이션</Link>
            </li>
            {userInfo && (
              <li>
                <Link to="/data-insert" onClick={() => setMobileMenuOpen(false)}>데이터입력</Link>
              </li>
            )}
            {userInfo ? (
              <>
                <li style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.875rem' }}>
                  {userInfo.username}
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
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
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
