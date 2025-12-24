import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const accentRoutes = [
  { match: (path) => path === '/', color: '#0EA5E9' }, // 홈
  { match: (path) => path.startsWith('/about'), color: '#0F766E' }, // 소개
  { match: (path) => path.startsWith('/overview'), color: '#F97316' }, // 개요
  {
    match: (path) =>
      path.startsWith('/dashboard') ||
      path.startsWith('/tier1') ||
      path.startsWith('/tier2'),
    color: '#22C55E' // 성과지표
  },
  { match: (path) => path.startsWith('/companies') || path.startsWith('/company'), color: '#06B6D4' }, // 기업
  { match: (path) => path.startsWith('/simulator'), color: '#EC4899' }, // 시뮬레이터
  { match: (path) => path.startsWith('/data-insert'), color: '#2563EB' } // 데이터 입력
];

const lightenColor = (hex, amt = 28) => {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return hex;
  const num = parseInt(normalized, 16);
  const clamp = (value) => Math.min(255, Math.max(0, value));
  const r = clamp((num >> 16) + amt);
  const g = clamp(((num >> 8) & 0x00ff) + amt);
  const b = clamp((num & 0x0000ff) + amt);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const accentColor = accentRoutes.find((route) => route.match(location.pathname))?.color || '#0F766E';
  const accentSoft = lightenColor(accentColor);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: '홈' },
    { to: '/about', label: '소개' },
    { to: '/overview', label: '개요' },
    { to: '/dashboard', label: '성과지표' },
    { to: '/simulator', label: '시뮬레이터' }
  ];

  if (userInfo && userInfo.role === 'admin') {
    navItems.splice(4, 0, { to: '/companies', label: '기업 목록' });
  }

  if (userInfo) {
    navItems.push({ to: '/data-insert', label: '데이터 입력' });
  }

  return (
    <>
      <div
        className={`nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className="navbar" style={{ '--nav-accent': accentColor, '--nav-accent-soft': accentSoft }}>
        <div className="navbar-container">
          <Link to="/" className="logo" aria-label="코끼리공장 홈">
            <img
              src="/k_logo_mo3.png"
              alt="코끼리 공장"
              style={{ height: '40px', width: 'auto' }}
            />
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link ${isActive(to) ? 'active' : ''}`}
                  aria-current={isActive(to) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {userInfo ? (
              <>
                <li className="nav-username">{userInfo.username}</li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="nav-link nav-logout"
                  >
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
