import React from 'react';
import styled from 'styled-components';
import LogoWhite from '../../components/LandingPage/logos/logoWhite';

const Border = styled.div`
  border-top: 1px solid #838383;
`;

const Wrapper = styled.div`
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    margin: 0 auto;
    padding: 0 2rem;
  }

  @media screen and (min-width: 1400px) {
    flex-direction: row;
    margin: 0 auto;
  }
`;

const LogoWrapper = styled.div`
  margin: 1rem auto;
  text-align: center;

  @media screen and (min-width: 1200px) {
    text-align: start;
    margin: 0;
  }
`;

const IdentityWrapper = styled.div`
  @media screen and (min-width: 1200px) {
    margin-left: 2rem;
  }
`;

const IdentityText = styled.p`
  font-size: 0.8rem;
  color: white;
  text-align: center;
  margin: 0 0 1rem 0;

  @media screen and (min-width: 1200px) {
    margin: 0;
    text-align: start;
    margin: 0.3rem 0 0 0;
  }
`;

const Text = styled.p`
  font-size: 0.8rem;
  color: white;
  margin: 0;
  text-align: center;
  margin-bottom: 1rem;

  @media screen and (min-width: 1200px) {
    margin: 0 2rem 0 auto;
  }
`;

function FooterSection() {
  return (
    <Border>
      <Wrapper>
        <IdentityWrapper>
          <LogoWrapper>
            <LogoWhite />
          </LogoWrapper>
          <IdentityText>Your Decentralized Banking Partner.</IdentityText>
        </IdentityWrapper>
        <Text>support@hbsc.finance</Text>
      </Wrapper>
    </Border>
  );
}

export default FooterSection;
