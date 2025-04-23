import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signupAdmin } from '../services/AdminService';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signupAdmin({ name, email, password });
      if (response) {
        navigate('/admin/login');
      } else {
        setAlert('Signup gagal. Periksa kembali nama, email dan password.');
      }
    } catch (err) {
      setAlert('Signup gagal. Periksa kembali nama, email dan password.');
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Signup Admin</Card.Title>
          {alert && <Alert variant="danger">{alert}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Signup
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate('/admin/login')}>
              Sudah punya akun? Ayo Login
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignupPage;
