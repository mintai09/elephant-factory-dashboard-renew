import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import CompanyDetail from './CompanyDetail';

function DashboardWrapper() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // 관리자인 경우 전체 대시보드 표시
  if (userInfo.role === 'admin') {
    return <Dashboard />;
  }

  // 기업 사용자인 경우 해당 기업의 상세 페이지 표시
  // CompanyDetail 컴포넌트에 companyId를 props로 전달
  return <CompanyDetail isOwnCompany={true} fixedCompanyId={userInfo.companyId} />;
}

export default DashboardWrapper;
