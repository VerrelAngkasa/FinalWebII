import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutAdmin } from '../services/AdminService';

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
    },
    {
      title: 'Pembuatan SIM',
      route: '/data/sim',
      description: 'Lihat dan kelola data pembuatan SIM.',
    },
  ];

  return (
    <>
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Pilih Layanan</h2>
          <Button variant="danger" onClick={() => setShowLogoutModal(true)}>
            Logout
          </Button>
        </div>
        <Row className="justify-content-center">
          {services.map((service, index) => (
            <Col key={index} md={5} className="mb-4">
              <Card 
                onClick={() => navigate(service.route)} 
                className="shadow-sm" 
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                </Card.Body>
              </Card>
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
    </>
  );
};

export default DashboardPage;