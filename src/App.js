import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProjectOverview from './components/ProjectOverview';
import Dashboard from './components/Dashboard';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<ProjectOverview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/company/:companyId" element={<CompanyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
