import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import SIMPage from './pages/SIMPage';
import STNKPage from './pages/STNKPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/data/sim" element={<SIMPage />} />
        <Route path="/data/stnk" element={<STNKPage />} />

        {/* Redirect root to /admin */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* 404 Page */}
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
