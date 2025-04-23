import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Proses logout, hapus token, dsb.
    localStorage.removeItem('token'); // atau lainnya
    navigate('/admin/login');
  }, [navigate]);

  return null;
};

export default LogoutPage;
