import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';

export const StyledPage = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledCard = styled(Card)`
  border: none !important;
  border-radius: 15px !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  }
`;

export const PageTitle = styled.h2`
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 0;
`;

export const StyledButton = styled(Button)`
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;