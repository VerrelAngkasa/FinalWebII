import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signupAdmin } from '../services/AdminService';
import styled from 'styled-components';
import { StyledPage, StyledCard, PageTitle, StyledButton } from '../components/Style';
import Header from '../components/Header';

const SignupContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: auto;
  padding: 2rem;
`;

const SignupCard = styled(StyledCard)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
`;

const StyledForm = styled(Form)`
  .form-label {
    color: #2c3e50;
    font-weight: 500;
  }

  .form-control {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 0.75rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
    }
  }
`;

const SignupButton = styled(StyledButton)`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  font-weight: 500;
`;

const LoginLink = styled(Button)`
  color: #4a90e2;
  text-decoration: none;
  
  &:hover {
    color: #357abd;
    text-decoration: underline;
  }
`;

const AlertStyled = styled(Alert)`
  border-radius: 8px;
  margin-bottom: 1rem;
`;

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

      if (response && response.message) {
        setAlert({ type: 'success', message: 'Registrasi berhasil! Silakan login.' });
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setAlert({ type: 'danger', message: 'Registrasi gagal. Silakan coba lagi.' });
      }
    } catch (err) {
      console.error('Signup error:', err);
      setAlert({
        type: 'danger',
        message: err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.'
      });
    }
  };

  return (
    <StyledPage>
      <SignupContainer>
        <Header />
        <SignupCard>
          <PageTitle className="text-center mb-4">Register Admin</PageTitle>
          {alert && (
            <AlertStyled variant={alert.type || 'danger'}>
              {alert.message || alert}
            </AlertStyled>
          )}
          <StyledForm onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                minLength="6"
              />
            </Form.Group>

            <SignupButton variant="primary" type="submit">
              Register
            </SignupButton>
          </StyledForm>

          <div className="text-center mt-3">
            <LoginLink variant="link" onClick={() => navigate('/admin/login')}>
              Sudah punya akun? Login disini
            </LoginLink>
          </div>
        </SignupCard>
      </SignupContainer>
    </StyledPage>
  );
};

export default SignupPage;