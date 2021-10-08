import React from 'react';
import styled from 'styled-components';
import HBSCLogo from '../../../assets/LandingAssets/logo-medium-white.svg';
import { Link } from 'react-router-dom';

const LogoWrapper = styled.div``;

const LogoImg = styled.img`
  width: 8rem;
  @media screen and (min-width: 1200px) {
    width: 6.5rem;
  }
`;

function LogoWhite() {
  return (
    <LogoWrapper>
      <Link to="/">
        <LogoImg src={HBSCLogo} alt="logo" />
      </Link>
    </LogoWrapper>
  );
}

export default LogoWhite;
