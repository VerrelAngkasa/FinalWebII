// src/pages/NotFoundPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col className="text-center">
          <h1 className="display-4">401 - Akses Ditolak</h1>
          <p className="lead">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Kembali ke Halaman Utama
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
