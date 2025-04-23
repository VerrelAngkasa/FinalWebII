import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage.js';
import DashboardPage from './pages/DashboardPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/signup" element={<SignupPage />} />
        <Route path="/admin/logout" element={<LogoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Add other routes here */}
        
        {/* 404 Page Not Found */}

        <Route path="*" element={
          <div className="text-center mt-5">
            <h2>404 - Page Not Found</h2>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
