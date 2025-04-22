import React, { useState } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import AdminForm from '../components/AdminForm';
import * as adminService from '../services/AdminService'; // Asumsikan kamu sudah punya service ini

const AdminPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await adminService.loginAdmin(formData);  // Calls the login API path
        setNotification({ message: 'Login successful!', variant: 'success' });
      } else {
        await adminService.signupAdmin(formData); // Calls the signup API path
        setNotification({ message: 'Signup successful! You can now log in.', variant: 'success' });
      }
    } catch (error) {
      setNotification({ message: error.message || 'An error occurred', variant: 'danger' });
    }
  };

  const handleLogout = async () => {
    try {
      await adminService.logoutAdmin();
      setNotification({ message: 'Logout successful!', variant: 'info' });
    } catch (error) {
      setNotification({ message: error.message || 'An error occurred', variant: 'danger' });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">{isLogin ? 'Login Admin' : 'Signup Admin'}</h2>

          {notification && (
            <Alert variant={notification.variant} onClose={() => setNotification(null)} dismissible>
              {notification.message}
            </Alert>
          )}

          <AdminForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLogin={isLogin}
          />

          <div className="d-flex justify-content-between mt-3">
            <Button variant="outline-secondary" onClick={() => setIsLogin((prev) => !prev)}>
              Switch to {isLogin ? 'Signup' : 'Login'}
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;