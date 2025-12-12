import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
            <Link to="/overview">프로젝트 개요</Link>
          </li>
          <li>
            <Link to="/dashboard">ESG 대시보드</Link>
          </li>
          <li>
            <Link to="/companies">기업별 성과</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
