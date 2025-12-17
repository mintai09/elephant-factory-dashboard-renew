import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import KogongjangOverview from './components/KogongjangOverview';
import ProjectOverview from './components/ProjectOverview';
import DashboardWrapper from './components/DashboardWrapper';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import ESGSimulator from './components/ESGSimulator';
import Login from './components/Login';
import Signup from './components/Signup';
import DataInsert from './components/DataInsert';

function AppContent() {
  const location = useLocation();
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<KogongjangOverview />} />
        <Route path="/overview" element={<ProjectOverview />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/company/:companyId" element={<CompanyDetail />} />
        <Route path="/simulator" element={<ESGSimulator />} />
        <Route path="/data-insert" element={<DataInsert />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
