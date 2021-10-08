import React from 'react';
import styled from 'styled-components';

import TgIcon from '../../assets/LandingAssets/contact/tg.svg';
import YtIcon from '../../assets/LandingAssets/contact/yt.svg';
import TwitterIcon from '../../assets/LandingAssets/contact/twitter.svg';

import { themeColor } from '../../theme';

const Container = styled.div`
  padding: 1.5rem;
  position: relative;
  margin-top: -20vh;
  margin-bottom: 10rem;

  @media screen and (min-width: 1024px) {
    margin-top: -10vh;
  }

  @media screen and (orientation: landscape) {
    margin-top: -30vh;
  }

  @media screen and (min-width: 1400px) {
    margin-bottom: 14rem;
    margin-top: -20vh;
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  color: white;
  font-weight: 400;
  text-align: center;
  margin-bottom: 1.6rem;
`;

const Text = styled.p`
  color: white;
  font-size: 0.8rem;
  text-align: center;
  margin: 0 auto;

  @media screen and (orientation: landscape) {
    max-width: 50vw;
    line-height: 1.8;
  }

  @media screen and (min-width: 768px) {
    max-width: 50vw;
  }

  @media screen and (min-width: 1200px) {
    max-width: 35vw;
    line-height: 1.8;
  }
`;

const SocialWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`;

const SocialLink = styled.a``;

const SocialIcon = styled.img`
  margin: 0 1rem;
  width: 3rem;
  color: ${themeColor.primary};

  @media screen and (min-width: 1200px) {
    width: 4.5rem;
  }
`;

function ContactSection() {
  return (
    <Container>
      <Title>Contact the HBSC Team</Title>
      <Text>
        To learn more, ask further questions to the team and engage in community
        discussions, you can follow the HBSC project on Telegram, Youtube and
        Twitter.
      </Text>
      <SocialWrapper>
        <SocialLink href="/">
          <SocialIcon src={TgIcon} />
        </SocialLink>
        <SocialLink href="/">
          <SocialIcon src={YtIcon} />
        </SocialLink>
        <SocialLink href="/">
          <SocialIcon src={TwitterIcon} />
        </SocialLink>
      </SocialWrapper>
    </Container>
  );
}

export default ContactSection;
