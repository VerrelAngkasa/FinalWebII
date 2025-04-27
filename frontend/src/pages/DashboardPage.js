import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutAdmin } from '../services/AdminService';
import { FaIdCard, FaCarAlt } from 'react-icons/fa';
import styled from 'styled-components';

const StyledDashboard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border: none !important;
  border-radius: 15px !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  }
`;

const ServiceIcon = styled.div`
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const DashboardTitle = styled.h2`
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 0;
`;

const getAuthToken = () => localStorage.getItem('jwtToken');

const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = getAuthToken();
      if (!token) {
        setShowModal(true);
      } else {
        setAuthHeader();
      }
    };

    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin(); // Menggunakan fungsi logout dari AdminService
      localStorage.removeItem('jwtToken');
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const services = [
    {
      title: 'Pembaharuan STNK',
      route: '/data/stnk',
      description: 'Kelola data pembaruan STNK dari pelanggan.',
      icon: <FaCarAlt size={40} className="mb-3 text-primary" />
    },
    {
      title: 'Pembuatan SIM',
      route: '/data/sim',
      description: 'Lihat dan kelola data pembuatan SIM.',
      icon: <FaIdCard size={40} className="mb-3 text-primary" />
    },
  ];

  return (
    <StyledDashboard>
      <Container className="py-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <DashboardTitle>Dashboard Admin</DashboardTitle>
          <Button
            variant="danger"
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-2"
          >
            Logout
          </Button>
        </div>

        <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          {services.map((service, index) => (
            <Col key={index} md={5} className="mb-4 px-4">
              <StyledCard
                onClick={() => navigate(service.route)}
                className="text-center h-100"
              >
                <Card.Body className="d-flex flex-column justify-content-center py-5">
                  <ServiceIcon>
                    {service.icon}
                  </ServiceIcon>
                  <Card.Title className="mb-3 fw-bold">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal Error */}
      <Modal show={showModal} onHide={() => navigate('/admin/login')} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error: Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Anda tidak memiliki akses. Silakan login terlebih dahulu.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate('/admin/login')}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Logout */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledDashboard >
  );
};

export default DashboardPage;