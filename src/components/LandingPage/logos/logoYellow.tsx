import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HBSCLogo from '../../../assets/LandingAssets/top/logo-small-yellow.svg';

const LogoWrapper = styled.div``;

const LogoImg = styled.img`
  width: 30vw;

  @media screen and (min-width: 400px) {
    width: 140px;
  }

  @media screen and (min-width: 1200px) {
    width: 100px;
  }
`;

function LogoYellow() {
  return (
    <LogoWrapper>
      <Link to="/">
        <LogoImg src={HBSCLogo} alt="logo" />
      </Link>
    </LogoWrapper>
  );
}

export default LogoYellow;
