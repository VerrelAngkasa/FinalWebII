import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutAdmin } from '../services/AdminService';
import { FaIdCard, FaCarAlt } from 'react-icons/fa';
import styled from 'styled-components';
import Header from '../components/Header';

const DashboardHeader = styled.div`
  padding: 2rem 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`;

const DashboardTitle = styled.h2`
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 0;
`;

const DashboardContainer = styled(Container)`
  padding: 2rem;
`;

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
  background: rgba(255, 255, 255, 0.9);
  height: 300px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
`;

const ServiceIcon = styled.div`
  color: #3498db;
  margin-bottom: 1.5rem;
  font-size: 3rem;
  
  svg {
    filter: drop-shadow(0 4px 6px rgba(52, 152, 219, 0.3));
  }
`;

const ServiceTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled(Card.Text)`
  color: #7f8c8d;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
`;

const LogoutButton = styled(Button)`
  padding: 0.75rem 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    background: #f8f9fa;
    border-radius: 15px 15px 0 0;
  }

  .modal-footer {
    background: #f8f9fa;
    border-radius: 0 0 15px 15px;
  }
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
      <DashboardContainer fluid>
        <DashboardHeader className="text-center">
          <Header />
        </DashboardHeader>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <DashboardTitle>Dashboard Admin</DashboardTitle>
          <LogoutButton
            variant="danger"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </LogoutButton>
        </div>

        <Row className="justify-content-center g-4">
          {services.map((service, index) => (
            <Col key={index} lg={5} md={6} className="px-4">
              <StyledCard onClick={() => navigate(service.route)}>
                <Card.Body>
                  <ServiceIcon>
                    {service.icon}
                  </ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </DashboardContainer>

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