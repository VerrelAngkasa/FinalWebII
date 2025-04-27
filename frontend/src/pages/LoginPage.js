import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/AdminService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin({ email, password });

      if (response && response.token) {
        // Simpan token JWT ke localStorage
        localStorage.setItem('jwtToken', response.token);

        // Navigasi ke dashboard setelah login sukses
        navigate('/dashboard');
      } else {
        setAlert('Login gagal. Periksa kembali email dan password.');
      }
    } catch (err) {
      setAlert('Login gagal. Periksa kembali email dan password.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Login Admin</Card.Title>
          {alert && <Alert variant="danger">{alert}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate('/admin/signup')}>
              Belum punya akun? Ayo Signup
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
