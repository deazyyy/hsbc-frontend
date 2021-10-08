import React from 'react';
import styled from 'styled-components';
import AboutBg from '../../assets/LandingAssets/about/about-bg.png';
import Card from '../../components/LandingPage/card';

const Container = styled.div`
  position: relative;
  top: -15rem;
  margin: 0 auto;

  @media screen and (min-width: 1200px) {
    top: -20rem;
  }
`;

const Background = styled.div`
  position: relative;
  background-image: url(${AboutBg});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 120vh;

  @media screen and (min-width: 700px) {
    min-height: 100vh;
  }

  @media screen and (orientation: landscape) {
    min-height: 200vh;
  }

  @media screen and (min-width: 1200px) {
    min-height: 110vh;
    background-position: 0 3rem;
  }
`;

const Headline = styled.h1`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  color: black;
  font-size: 2rem;
  text-align: center;

  @media screen and (min-width: 1024px) {
    font-size: 2.8rem;
  }

  @media screen and (min-width: 1200px) {
    top: 50%;
  }
`;

const MoreTextHeading = styled.p`
  position: absolute;
  width: 80%;
  bottom: 11.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  font-size: 1.5em;
  text-align: center;

  ::after {
    content: '';
    position: absolute;
    bottom: -3.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-width: 14px 12px 0px 12px;
    border-color: #000 transparent transparent transparent;
    border-style: solid;
  }

  @media screen and (min-width: 1200px) {
    bottom: 17%;
    font-size: 1.6em;
    letter-spacing: 0.1rem;

    ::after {
      bottom: -3.5rem;
    }
  }
`;

const CardsWrapper = styled.div`
  position: relative;
  margin-top: -10rem;
  text-align: center;
  @media screen and (orientation: landscape) {
    margin-top: -6rem;
  }

  @media screen and (min-width: 1200px) {
    margin-top: -6.5rem;
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: 1400px) {
    max-width: 85vw;
    margin: 0 auto;
    margin-top: -8rem;
  }
`;

const StyledCard = styled(Card)`
  h2 {
    margin: 1.5rem 0;
  }

  // * {
  //   text-align: start;
  // }

  p {
    margin-bottom: 3rem;
  }
`;

function AboutSection() {
  return (
    <Container>
      <Background>
        <Headline>An On-Chain Decentralized Bank for Everyone</Headline>
        <MoreTextHeading>Key Features</MoreTextHeading>
      </Background>
      <CardsWrapper>
        <StyledCard
          src={''}
          title="Decentralized Bank"
          text="HBSC is a decentralized staking protocol or a decentralized bank. It 
          allows users to time deposit their assets and earn interest in a completly 
          permissionless way."
        />
        <StyledCard
          src={''}
          title="Audited Contract"
          text="The HBSC Contract has been audited by market-leading professionals.
          This allows us to operate in a safer environment and mitigate the risk of 
          attacks on our users funds."
        />
        <StyledCard
          src={''}
          title="HBSC Token"
          text="The HBSC Token is a crypto-currency on the BNB Blockchain. Its total supply is 
          only 10 000 coins making it one of the most scarce asset in the industry.
          It’s the base layer of the HBSC Staking platform and decentralized Bank."
        />
      </CardsWrapper>
    </Container>
  );
}

export default AboutSection;
