import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

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
