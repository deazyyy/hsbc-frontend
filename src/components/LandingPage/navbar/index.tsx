import React from 'react';
import styled from 'styled-components';
import LogoYellow from '../logos/logoYellow';

const NavbarContainer = styled.div`
  position: relative;
  max-width: 80vw;
  margin: 0 auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <LogoYellow />
    </NavbarContainer>
  );
}

export default Navbar;
