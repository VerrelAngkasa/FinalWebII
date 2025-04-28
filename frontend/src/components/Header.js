import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CompanyName = styled.h1`
  color: #2c3e50;
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <CompanyName>Sistem Informasi <br/> Sumatera Jaya Abadi</CompanyName>
    </HeaderContainer>
  );
};

export default Header;