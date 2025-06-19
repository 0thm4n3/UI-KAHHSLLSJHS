import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Vulnerabilities from './pages/Vulnerabilities';
import Assets from './pages/Assets';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import Team from './pages/Team';

function App() {
  return (
    <div className="dark">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<MainLayout><h1>Settings</h1></MainLayout>} />
        <Route path="/help" element={<MainLayout><h1>Help & Support</h1></MainLayout>} />
      </Routes>
    </div>
  );
}

export default App;