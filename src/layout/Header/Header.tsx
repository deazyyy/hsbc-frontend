import React, { useContext, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, Hidden } from '@material-ui/core';
import logo from 'assets/logo.png';
import { formTypes } from 'components/LoginPage';
import { AuthContext } from 'contexts/AuthContext';
import { MyTheme } from 'theme';
import PriceTrendUnit from 'components/StakingPage/PriceTrendUnit';
import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ReactTooltip from 'react-tooltip';
import {
  web3,
  busdContract,
  busdAddress,
  hbscAddress,
  hbscContract,
  stakingAddress,
  reservationAddress,
} from '../../contracts';

const UIVersion = 'v0.5';
const ReservationVersion = 'v0.2';
const StakingVersion = 'v0.6';

type ClassKey =
  | 'header'
  | 'headerContainer'
  | 'logo'
  | 'right'
  | 'debugText'
  | 'menu';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    header: {
      display: 'block',
      // padding: '15px 0',
      background: '#2E2E2E',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      maxWidth: 140,
      '& a': {
        display: 'block',
        marginRight: 10,
      },
      '& img': {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
    },
    right: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    debugText: {
      color: 'white',
    },
    menu: {
      display: 'flex',
      flexDirection: 'row',
      listStyle: 'none',
      padding: 0,
      color: '#C6C6C6',
      '& li': {
        padding: '25px 10px 0 10px',
        fontSize: '0.9rem',
      },
      '& a': {
        position: 'relative',
        display: 'inline-block',
        padding: '0 20px 26px 20px',
        color: 'inherit',
        textDecoration: 'none',
      },
      '& a:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        borderRadius: 2,
        background: 'transparent',
      },
      '& a:hover': {
        color: myTheme.palette.primary.main,
      },
      '& a.active': {
        color: myTheme.palette.primary.main,
      },
      '& a.active:before': {
        background: myTheme.palette.primary.main,
      },
    },
  });
};

type HeaderProps = WithStyles<ClassKey> & {
  pageName?: string;
};

const ONBOARD_TEXT = 'INSTALL METAMASK';
const CONNECT_TEXT = 'CONNECT WALLET';
const CONNECTED_TEXT = 'CONNECTED';

const HeaderView = ({ classes, pageName }: HeaderProps) => {
  const { auth, user, loading, setAuthModalOpened } = useContext(AuthContext);
  const history = useHistory();

  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState(['']);
  const onboarding = React.useRef<MetaMaskOnboarding>();

  const onSignUpClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setAuthModalOpened(formTypes.SIGN_UP);
  }, []);

  const onLogInClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setAuthModalOpened(formTypes.LOGIN);
  }, []);

  const onLogOutClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    auth.logout('').finally(() => {
      history.push('/');
    });
  }, []);

  const onMetamaskClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      (window as any).ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts: any) => setAccounts(newAccounts));
    } else {
      if (onboarding.current) {
        onboarding.current.startOnboarding();
      }
    }
  }, []);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        if (onboarding.current) {
          onboarding.current.stopOnboarding();
        }
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts: any) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      (window as any).ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      (window as any).ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        (window as any).ethereum.on('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onApproveClick = async () => {
    console.log(accounts[0]);
    let approveContract;
    if (pageName === 'reservation') {
      await busdContract.methods
        .approve(
          reservationAddress,
          web3.utils.toWei(web3.utils.toBN(Number.MAX_SAFE_INTEGER - 1)),
        )
        .send({ from: accounts[0] });
    }
    if (pageName == 'staking') {
      await hbscContract.methods
        .approve(
          stakingAddress,
          web3.utils.toWei(web3.utils.toBN(Number.MAX_SAFE_INTEGER - 1)),
        )
        .send({ from: accounts[0] });
    }
  };

  return (
    <div className={classes.header}>
      {/*
      <Container className={classes.debugText}>
        <p>
          Beta testnet: <br /> Token-{hbscAddress} <br />
          Reservation-{reservationAddress}
          <br /> Staking-{stakingAddress}
          <br /> BUSD-{busdAddress}
        </p>
        <p>
          UI Version: {UIVersion} - Reservation Contract: {ReservationVersion} -
          Staking Contract {StakingVersion}
        </p>
        <p> Reservation - 5 mins per pool </p>
        <p> Staking - 30 seconds per day </p>
      </Container>*/}
      <Container className={classes.headerContainer} maxWidth="xl">
        <Hidden only="xs">
          <Grid sm={1}>
            <div className={classes.logo}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </Grid>
        </Hidden>
        <Grid xs={3} sm={2}>
          <ReactTooltip html={true} />
          <Button color="primary" variant="contained" onClick={onApproveClick}>
            <p
              data-type="warning"
              data-tip="This will approve an unlimited amount. <br/>
              Please 'edit permission' in metamask if you want to approve specific amount."
              data-background-color="#F3BA2F"
              data-text-color="#000"
            >
              {pageName === 'staking' ? 'APPROVE HBSC' : 'APPROVE BUSD'}
            </p>
          </Button>
        </Grid>
        <Grid xs={6} sm={7} className={classes.right}>
          <ul className={classes.menu}>
            {
              window.innerWidth > 1000 ? (
              <>
                <PriceTrendUnit
                  py="5px"
                  label="HBSC TOKEN PRICE"
                  price="$ 3.21"
                  change="+5.42%"
                />
                <PriceTrendUnit
                  py="5px"
                  label="HBSC DIVIDEND PAID TO LOCKERS"
                  price="2,321.2 BNB"
                  change="+2.12%"
                />
              </>) :  ( '' ) //prettier-ignore
            }
            {pageName === 'staking' && (
              <>
                <Typography component="li">
                  <Link to="/staking" className="active">
                    Stake
                  </Link>
                </Typography>
                <Typography component="li">
                  <Link to="/reservation">Reserve</Link>
                </Typography>
              </>
            )}
            {pageName === 'reservation' && (
              <>
                <Typography component="li">
                  <Link to="/staking">Stake</Link>
                </Typography>
                <Typography component="li">
                  <Link to="/reservation" className="active">
                    Reserve
                  </Link>
                </Typography>
              </>
            )}
          </ul>
        </Grid>
        <Grid xs={3} sm={2}>
          <ReactTooltip html={true} />
          <Button color="primary" variant="contained" onClick={onMetamaskClick}>
            <p
              style={{ margin: 0, width: '100%' }}
              data-type="warning"
              data-tip={accounts[0]}
              data-background-color="#F3BA2F"
              data-text-color="#000"
            >
              {buttonText}
            </p>
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export const Header = withStyles(styles)(HeaderView);

export default Header;
