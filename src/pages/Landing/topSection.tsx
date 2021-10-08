import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/LandingPage/navbar';
import BackgroundTop from '../../assets/LandingAssets/top/top-bg.png';
import Button from '../../components/LandingPage/button';
import Card from '../../components/LandingPage/card';
import StakeImg from '../../assets/LandingAssets/about/stake.png';
import BackendImg from '../../assets/LandingAssets/about/backend.png';
import CompoundImg from '../../assets/LandingAssets/about/compound.png';
import { themeColor } from '../../theme';
import { Link } from 'react-router-dom';

const ContainerHeight = styled.div`
  position: relative;
`;

const ContainerWidth = styled.div`
  position: relative;
  padding: 2rem;
  overflow: hidden;
  z-index: 1;

  @media screen and (min-width: 1200px) {
    padding: 1rem;
  }

  @media screen and (min-width: 1400px) {
    padding: 1rem;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundTop});
  background-size: 120vw;
  background-repeat: no-repeat;
  background-position: -3rem 10rem;

  @media screen and (min-width: 1200px) {
    background-position: 0 8vh;
    background-size: 100vw;
  }

  @media screen and (min-width: 1400px) {
    background-position: 0 5vh;
    background-size: cover;
  }
`;

const Headline = styled.h1`
  max-width: 80vw;
  margin: 0 auto;
  position: relative;
  margin-top: 2rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  line-height: 1.5;
  height: 4rem;
  overflow-y: visible;

  span {
    font-weight: 700;
    color: ${themeColor.primary};
  }

  @media screen and (min-width: 700px) {
    margin-top: 5rem;
    font-size: 1.8rem;
  }

  @media screen and (min-width: 1200px) {
    font-size: 2.2rem;
    max-width: 47vw;
    margin-left: 9vw;
    margin-top: 13rem;
  }

  @media screen and (min-width: 1400px) {
    margin-top: 18rem;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 11rem;
  button {
    margin: 0.6rem 0;
  }

  @media screen and (min-width: 320px) {
    margin-top: 13rem;
  }

  @media screen and (min-width: 360px) {
    margin-top: 15rem;
  }

  @media screen and (min-width: 414px) {
    margin-top: 17rem;
  }

  @media screen and (min-width: 525px) {
    margin-top: 21rem;
  }

  @media screen and (min-width: 700px) {
    margin-top: 22rem;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 25rem;
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
    margin-top: 3.5rem;
    margin-left: 8vw;

    button {
      margin: 0 0.8rem;
    }
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const CardsWrapper = styled.div`
  position: relative;
  margin-top: 3rem;
  margin: 0 auto;

  @media screen and (orientation: landscape) {
    margin-top: 4rem;
  }

  @media screen and (min-width: 1200px) {
    margin-top: 25rem;
    display: flex;
  }

  @media screen and (min-width: 1400px) {
    max-width: 85vw;
    margin-top: 40rem;
    display: flex;
  }
`;

function TopSection() {
  return (
    <ContainerHeight>
      <Background />
      <ContainerWidth>
        <Navbar />
        <Headline>
          <span>Stake</span> your crypto assets in the market-leading
          decentralized Bank
        </Headline>
        <ButtonWrapper>
          <Button>
            <StyledLink to="/staking">Staking App</StyledLink>
          </Button>
          <Button>
            <StyledLink to="/reservation">Reservation</StyledLink>
          </Button>
          <Button>Telegram</Button>
        </ButtonWrapper>
        <CardsWrapper>
          <Card
            src={StakeImg}
            title="Staking Protocol"
            text="HBSC is a decentralized staking protocol backed by an Audited code and built for banking efficiency."
          />
          <Card
            src={BackendImg}
            title="Contract Backend"
            text="HBSC is Contract-verifiable. It’s a Decentralized Finance tool that can be used by anyone."
          />
          <Card
            src={CompoundImg}
            title="Compound Interest"
            text="The HBSC token is a very scarce crypto-asset, the embedded tokenomics make it a valuable compounding tool."
          />
        </CardsWrapper>
      </ContainerWidth>
    </ContainerHeight>
  );
}

export default TopSection;
