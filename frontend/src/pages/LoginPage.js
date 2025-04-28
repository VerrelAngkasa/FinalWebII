import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/AdminService';
import styled from 'styled-components';
import { StyledPage, StyledCard, PageTitle, StyledButton } from '../components/Style';
import Header from '../components/Header';

const LoginContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: auto;
  padding: 2rem;
`;

const LoginCard = styled(StyledCard)`
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

const LoginButton = styled(StyledButton)`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  font-weight: 500;
`;

const SignupLink = styled(Button)`
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
        localStorage.setItem('jwtToken', response.token);
        navigate('/dashboard');
      } else {
        setAlert('Login gagal. Periksa kembali email dan password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setAlert('Login gagal. Periksa kembali email dan password.');
    }
  };

  return (
    <StyledPage>
      <LoginContainer>
        <Header />
        <LoginCard>
          <PageTitle className="text-center mb-4">Login Admin</PageTitle>
          {alert && <AlertStyled variant="danger">{alert}</AlertStyled>}
          <StyledForm onSubmit={handleLogin}>
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
                placeholder="Maukkan password"
              />
            </Form.Group>

            <LoginButton variant="primary" type="submit">
              Login
            </LoginButton>
          </StyledForm>

          <div className="text-center mt-3">
            <SignupLink variant="link" onClick={() => navigate('/admin/signup')}>
              Belum punya akun? Ayo Signup
            </SignupLink>
          </div>
        </LoginCard>
      </LoginContainer>
    </StyledPage>
  );
};

export default LoginPage;