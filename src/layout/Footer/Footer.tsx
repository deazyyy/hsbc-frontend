import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import LogoWhite from '../../components/LandingPage/logos/logoWhite';
import { MyTheme } from 'theme';
import TgIcon from '../../assets/LandingAssets/contact/tg.svg';
import YtIcon from '../../assets/LandingAssets/contact/yt.svg';
import TwitterIcon from '../../assets/LandingAssets/contact/twitter.svg';
import { themeColor } from '../../theme';

type ClassKey = 'root';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    root: {
      background: myTheme.palette.background.default,
      borderTop: 'solid 1px rgba(255, 255, 255, 0.47)',
      flexShrink: 0,
    },
  });
};

const Wrapper = styled.div`
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const SocialWrapper = styled.div`
  margin-top: 20px;
  margin-left: -24px;
  display: flex;
  justify-content: center;
`;

const SocialLink = styled.a``;
const Contactouter = styled.div``;
const SocialIcon = styled.img`
  margin: 0 1rem;
  width: 20px;
  color: ${themeColor.primary};

  // @media screen and (min-width: 1200px) {
  //   width: 4.5rem;
  // }
`;

type FooterProps = WithStyles<ClassKey>;

const FooterView = ({ classes }: FooterProps) => {
  return (
    <div className={classes.root}>
      {/* <Container maxWidth="xl">
        <Typography variant="body2">Footer</Typography>
      </Container> */}
      <Wrapper>
        <IdentityWrapper>
          <LogoWrapper>
            <LogoWhite />
          </LogoWrapper>
          <IdentityText>Your Decentralized Banking Partner.</IdentityText>
        </IdentityWrapper>
        <Contactouter>
          <Text>
            support@hbsc.finance <span>v2.1</span>
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
        </Contactouter>
      </Wrapper>
    </div>
  );
};

export const Footer = withStyles(styles)(FooterView);

export default Footer;
