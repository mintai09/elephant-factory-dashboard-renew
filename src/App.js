import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import KogongjangOverview from './components/KogongjangOverview';
import ProjectOverview from './components/ProjectOverview';
import Dashboard from './components/Dashboard';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import ESGSimulator from './components/ESGSimulator';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<KogongjangOverview />} />
          <Route path="/overview" element={<ProjectOverview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/company/:companyId" element={<CompanyDetail />} />
          <Route path="/simulator" element={<ESGSimulator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
