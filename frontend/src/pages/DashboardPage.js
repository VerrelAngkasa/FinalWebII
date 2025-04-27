import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/unauthorized'); // 🚫 Redirect kalau tidak ada token
    } else {
      setAuthHeader(); // ✅ Set token kalau ada
    }
  }, [navigate]);

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
    <Container className="mt-5">
      <h2 className="text-center mb-4">Pilih Layanan</h2>
      <Row className="justify-content-center">
        {services.map((service, index) => (
          <Col key={index} md={5} className="mb-4">
            <Card onClick={() => navigate(service.route)} className="shadow-sm" style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardPage;
