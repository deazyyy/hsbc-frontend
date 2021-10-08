import React, { useEffect, useState, useCallback } from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import { Grid, Box, Typography, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import stakingTitle from 'assets/stakingTitle.png';
import lockIcon from 'assets/lockIcon.png';
import FormCard from 'components/StakingPage/FormCard';
import OutlinedInput from 'components/StakingPage/OutlinedInput';
import { Header } from 'layout/Header';

import ReactTooltip from 'react-tooltip';
import {
  web3, 
  stakingAddress, 
  stakingAbi, 
  stakingContract,
  hbscContract
} from '../../contracts';


const emergencyUnstakeWarning = "WARNING: Unstaking before stake period has finished could incur a penalty. <br/> Please refer to whitepaper for more information.";
const stakeOnTopWarning = "WARNING: Staking on top of an existing stake will reset the stake timer.";

const MarkIcon = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 52 56" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.4 55.64L0.47998 21.162L21.8101 36.022L51.4 0.60199L22.4 55.64Z"
        fill="#18FF00"
      />
    </svg>
  );
};

import { MyTheme } from 'theme';

type ClassKey = 'root' | 'pageTitle' | 'icon' | 'cards';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    root: {},
    pageTitle: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 36,
      paddingBottom: 34,
      color: myTheme.palette.primary.main,
      '& h2': {
        margin: '0 0 -7px 0',
        fontSize: 46,
      },
      '& b': {
        color: 'white',
      },
      '& p': {
        margin: '0',
        fontSize: 17,
        color: myTheme.palette.text.secondary,
      },
    },
    icon: {
      display: 'block',
      width: 60,
      height: 60,
      marginTop: 5,
      marginRight: 22,
      background: `url(${stakingTitle})`,
      backgroundSize: 'cover',
    },
    cards: {
      marginBottom: 40,
      '& ul': {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
      '& li': {
        width: '280px',
        marginBottom: 30,
        padding: '0 15px',
      },
    },
  });
};

type StakingProps = WithStyles<ClassKey>;

const StakingView = ({ classes }: StakingProps) => {

const [accounts, setAccounts] = useState(['']);
const [totalStaked, setTotalStaked] = useState(0);
const [totalInstant, setTotalInstant] = useState(0);
const [total180, setTotal180] = useState(0);
const [total270, setTotal270] = useState(0);
const [total365, setTotal365] = useState(0);
const [userHBSC, setUserHBSC] = useState(0);

const [userStakedInstant, setUserStakedInstant] = useState(0);
const [userStaked180, setUserStaked180] = useState(0);
const [userStaked270, setUserStaked270] = useState(0);
const [userStaked365, setUserStaked365] = useState(0);

const [instantAmount, setInstantAmount] = useState(0);
const [tier180Amount, setTier180Amount] = useState(0);
const [tier270Amount, setTier270Amount] = useState(0);
const [tier365Amount, setTier365Amount] = useState(0);

const [Dividends, setDividends] = useState(0);

type Staked = {
  Stake0StartTimestamp: number;
  Stake180StartTimestamp: number;
  Stake270StartTimestamp: number;
  Stake365StartTimestamp: number;
  };

const [startTimes, setStartTimes] = useState<Staked>(
  { Stake0StartTimestamp: 0,
  Stake180StartTimestamp: 0,
  Stake270StartTimestamp: 0,
  Stake365StartTimestamp: 0});

  useEffect(() => {
    async function readContract() {
      const newAccounts = await web3.eth.getAccounts();
      setAccounts(newAccounts);

      if(newAccounts[0]){
        const tot = await stakingContract.methods.totalStaked().call();
        setTotalStaked(tot);
        const tot0 = await stakingContract.methods.total0Staked().call();
        setTotalInstant(tot0);
        const tot180 = await stakingContract.methods.total180Staked().call();
        setTotal180(tot180);
        const tot270 = await stakingContract.methods.total270Staked().call();
        setTotal270(tot270);
        const tot365 = await stakingContract.methods.total365Staked().call();
        setTotal365(tot365);

        const stake0 = await stakingContract.methods
         .token0StakedBalances(newAccounts[0]).call();
         setUserStakedInstant(stake0);
        const stake180 = await stakingContract.methods
         .token180StakedBalances(newAccounts[0]).call();
         setUserStaked180(stake180);
        const stake270 = await stakingContract.methods
         .token270StakedBalances(newAccounts[0]).call();
         setUserStaked270(stake270);
        const stake365 = await stakingContract.methods
         .token365StakedBalances(newAccounts[0]).call();
         setUserStaked365(stake365);

         const timestamps = await stakingContract.methods.staked(newAccounts[0]).call();
         setStartTimes(timestamps);

         const busdDivs = await stakingContract.methods.getClaimAmount(newAccounts[0]).call();
         setDividends(busdDivs / 1000000000000000000);

         const userAmount = await hbscContract.methods.balanceOf(newAccounts[0]).call();
         setUserHBSC(userAmount / 1000000000000000000);

      }

    }
    if(web3){
      readContract();
    }
    
  }, );

  const createStake = async (amount: number, tier: number) => {
    console.log(amount);
    console.log(tier);
   await stakingContract.methods.stakeTokens(web3.utils.toBN(amount * 1000000000000000000), tier).send({
      from: accounts[0]
    });
  }

  const unStake = async (tier: number) => {
   await stakingContract.methods.unStakeTokens(tier).send({
      from: accounts[0]
    });
  }

  const onInstantChange = (val: number) => {
      setInstantAmount(val);
  };

  const on180Change = (val: number) => {
      setTier180Amount(val);
  };

  const on270Change = (val: number) => {
      setTier270Amount(val);
  };

  const on365Change = (val: number) => {
      setTier365Amount(val);
  };

  const getTimeRemaining = (startTime: number, length: number) => {
    if(startTime == 0){
      return 0;
    }
    const endDate = (startTime * 1000) + (length * 1000 * 30);//60 * 60 * 24);
    const remaining = ((endDate - Date.now()) / 30 / 1000);

    if(remaining < 0){
      return 0;
    }

    return remaining.toFixed(2);
  }

  const getTotalUserStaked = () => {
    return (+(userStakedInstant) + +(userStaked180) + +(userStaked270) + +(userStaked365) ) / 1000000000000000000;
  }

  const claim = async () => {
    await stakingContract.methods.claimDividends().send({ from: accounts[0] });
  }

  const getTotalUserHBSC = () => {
    return +userHBSC +  +getTotalUserStaked();
  }

  return (
    <>
      <Header pageName="staking" />
      <Container maxWidth="xl" className={classes.pageTitle}>
        <span className={classes.icon}></span>
        <Typography component="div">
          <h2 className="h2">
            <b>HBSC</b> Staking
          </h2>
          <p>Lock your HSBC to earn interest</p>
          <p>1. Approve HBSC, 2.Enter Amount, 3. Click Stake</p>
        </Typography>
      </Container>

      <Container maxWidth="xl" className={classes.cards}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <Box display="flex" alignItems="flex-end">
                      <Typography variant="h6">
                        <Box lineHeight="normal" color="white" fontWeight="700">
                          Input Details
                        </Box>
                      </Typography>
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'} ml={1}>
                          Unstake when you want for &nbsp;
                          <span style={{ color: '#F3BA2F' }}>0.35</span>% APY
                        </Box>
                      </Typography>
                    </Box>
                    <Box mt={3} width="100%">
                      <OutlinedInput
                        icon={
                          <Box mr={1}>
                            <img src={lockIcon} height="24"></img>
                          </Box>
                        }
                        label="Staking Amount"
                        placeholder="Staking Amount"
                        actionTitle="HBSC"
                        onChangeFunc={(e) => onInstantChange(e.target.value)}
                        actionFunc={() => console.log('action clicked')}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={4} container alignItems="flex-end">
                  <Grid item xs={6} sm={4} justify="flex-end">
                    <Box
                      display="flex"
                      flexDirection="column"
                      pt={0.5}
                      ml={1.5}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Staked Amount</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color="#F3BA2F"
                          fontWeight="700"
                          mt={0.5}
                        >
                          {userStakedInstant / 1000000000000000000}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={8}></Grid>
                </Grid>
                <Grid
                  item
                  sm={2}
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => {createStake(instantAmount, 0)}}
                    fullWidth
                  >
                    CREATE STAKE
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={() => {unStake(0)}}
                    fullWidth
                  >
                    UNSTAKE HBSC
                  </Button>
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
          <Grid item sm={12}>
            <FormCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <Box display="flex" alignItems="flex-end">
                      <Typography variant="h6">
                        <Box lineHeight="normal" color="white" fontWeight="700">
                          180 Days Stake
                        </Box>
                      </Typography>
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'} ml={1}>
                          Receive&nbsp;
                          <span style={{ color: '#F3BA2F' }}>0.525</span>% APY
                        </Box>
                      </Typography>
                    </Box>
                    <Box mt={3} width="100%">
                      <OutlinedInput
                        icon={
                          <Box mr={1}>
                            <img src={lockIcon} height="24"></img>
                          </Box>
                        }
                        label="Staking Amount"
                        placeholder="Staking Amount"
                        actionTitle="HBSC"
                        onChangeFunc={(e) => on180Change(e.target.value)}
                        actionFunc={() => console.log('action clicked')}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={4} container alignItems="flex-end">
                  <Grid item xs={6} sm={4} justify="flex-end">
                    <Box
                      display="flex"
                      flexDirection="column"
                      pt={0.5}
                      borderRight="2px solid grey"
                      ml={1.5}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Staked Amount</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={0.5}
                        >
                          {userStaked180 / 1000000000000000000}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="calc(100% - 4px)"
                      ml={4}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Time until end of Stake</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={0.5}
                          display="flex"
                          alignItems="center"
                        >
                          {getTimeRemaining(startTimes.Stake180StartTimestamp, 180)}&nbsp;&nbsp;
                          <Typography variant="subtitle1">
                            <Box
                              fontWeight="700"
                              color="white"
                              lineHeight="normal"
                            >
                              DAYS
                            </Box>
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={2}
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <ReactTooltip html={true} />
                  <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => {createStake(tier180Amount, 180)}}
                    fullWidth
                  >
                  <p 
                    style={{margin: 0}}
                    data-type="warning"
                    data-tip={stakeOnTopWarning}
                    data-background-color="#F3BA2F"
                    data-text-color="#000"
                  >
                    CREATE STAKE
                  </p>
                  </Button>
                  <ReactTooltip html={true} />
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={() => {unStake(180)}}
                    fullWidth
                  >
                  <p style={{margin: 0}}
                    data-type="warning"
                    data-tip={emergencyUnstakeWarning}
                    data-background-color="#F3BA2F"
                    data-text-color="#000"
                  >
                    UNSTAKE HBSC
                    </p>
                  </Button>
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
          <Grid item sm={12}>
            <FormCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <Box display="flex" alignItems="flex-end">
                      <Typography variant="h6">
                        <Box lineHeight="normal" color="white" fontWeight="700">
                          270 Days Stake
                        </Box>
                      </Typography>
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'} ml={1}>
                          Receive&nbsp;
                          <span style={{ color: '#F3BA2F' }}>0.875</span>% APY
                        </Box>
                      </Typography>
                    </Box>
                    <Box mt={3} width="100%">
                      <OutlinedInput
                        icon={
                          <Box mr={1}>
                            <img src={lockIcon} height="24"></img>
                          </Box>
                        }
                        label="Staking Amount"
                        placeholder="Staking Amount"
                        actionTitle="HBSC"
                        onChangeFunc={(e) => on270Change(e.target.value)}
                        actionFunc={() => console.log('action clicked')}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={4} container alignItems="flex-end">
                  <Grid item xs={6} sm={4} justify="flex-end">
                    <Box
                      display="flex"
                      flexDirection="column"
                      pt={0.5}
                      borderRight="2px solid grey"
                      ml={1.5}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Staked Amount</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={0.5}
                        >
                          {userStaked270 / 1000000000000000000}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="calc(100% - 4px)"
                      ml={4}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Time until end of Stake</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={0.5}
                          display="flex"
                          alignItems="center"
                        >
                          {getTimeRemaining(startTimes.Stake270StartTimestamp, 270)}&nbsp;&nbsp;
                          <Typography variant="subtitle1">
                            <Box
                              fontWeight="700"
                              color="white"
                              lineHeight="normal"
                            >
                              DAYS
                            </Box>
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={2}
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                  container
                >
                <ReactTooltip html={true} />
                  <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => {createStake(tier270Amount, 270)}}
                    fullWidth>
                    <p 
                    style={{margin: 0}}
                    data-type="warning"
                    data-tip={stakeOnTopWarning}
                    data-background-color="#F3BA2F"
                    data-text-color="#000"
                  >
                    CREATE STAKE
                  </p>
                  </Button>
                  <ReactTooltip html={true} />
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={() => {unStake(270)}}
                    fullWidth
                  >
                  <p style={{margin: 0}}
                    data-type="warning"
                    data-tip={emergencyUnstakeWarning}
                    data-background-color="#F3BA2F"
                    data-text-color="#000"
                  >
                    UNSTAKE HBSC
                  </p>
                  </Button>
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
          <Grid item sm={12}>
            <FormCard>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <Box display="flex" alignItems="flex-end">
                      <Typography variant="h6">
                        <Box lineHeight="normal" color="white" fontWeight="700">
                          365 Days Stake
                        </Box>
                      </Typography>
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'} ml={1}>
                          Receive&nbsp;
                          <span style={{ color: '#F3BA2F' }}>1.75</span>% APY
                        </Box>
                      </Typography>
                    </Box>
                    <Box mt={3} width="100%">
                      <OutlinedInput
                        icon={
                          <Box mr={1}>
                            <img src={lockIcon} height="24"></img>
                          </Box>
                        }
                        label="Staking Amount"
                        placeholder="Staking Amount"
                        actionTitle="HBSC"
                        onChangeFunc={(e) => on365Change(e.target.value)}
                        actionFunc={() => console.log('action clicked')}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} container alignItems="flex-end">
                  <Grid item xs={6} sm={4} justify="flex-end">
                    <Box
                      display="flex"
                      flexDirection="column"
                      pt={0.5}
                      borderRight="2px solid grey"
                      ml={1.5}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Staked Amount</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={0.5}
                        >
                          {userStaked365 / 1000000000000000000}
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="calc(100% - 4px)"
                      ml={4}
                    >
                      <Typography variant="caption">
                        <Box color={'#FFFFFF'}>Time until end of Stake</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={0.5}
                          display="flex"
                          alignItems="center"
                        >
                          {getTimeRemaining(startTimes.Stake365StartTimestamp, 365)}&nbsp;&nbsp;
                          <Typography variant="subtitle1">
                            <Box
                              fontWeight="700"
                              color="white"
                              lineHeight="normal"
                            >
                              DAYS
                            </Box>
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={2}
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <ReactTooltip html={true} />
                  <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => {createStake(tier365Amount, 365)}}
                    fullWidth>
                    <p 
                    style={{margin: 0}}
                    data-type="warning"
                    data-tip={stakeOnTopWarning}
                    data-background-color="#F3BA2F"
                    data-text-color="#000"
                    >
                      CREATE STAKE
                    </p>
                  </Button>
                  <ReactTooltip html={true} />
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={() => {unStake(365)}}
                    fullWidth
                  >
                  <p style={{margin: 0}}
                    data-type="warning"
                    data-tip={emergencyUnstakeWarning}
                    data-background-color="#F3BA2F"
                    data-text-color="#000"
                  >
                    UNSTAKE HBSC
                  </p>
                  </Button>
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormCard >
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5">
                        <Box color="white" fontWeight="700">
                          My HBSC Dividends
                        </Box>
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      pt={0.5}
                      mt={2}
                    >
                      <Typography variant="caption">
                        <Box color="white">Dividend Amount</Box>
                      </Typography>
                      <Typography variant="h6">
                        <Box
                          lineHeight="normal"
                          color={'#F3BA2F'}
                          fontWeight="700"
                          mt={2}
                        >
                          {Dividends}
                        </Box>
                      </Typography>
                    </Box>
                    <Box borderBottom="2px solid grey" mt={2} mb={3}></Box>
                    <Box width="240px" mx="auto">
                      <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={() => claim()}
                        fullWidth>
                        CLAIM
                      </Button>
                    </Box>
                  </>
                </FormCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormCard isTileOnRight>
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5">
                        <Box color="white" fontWeight="700">
                          Global Stats
                        </Box>
                      </Typography>
                    </Box>
                    <Grid item sm={12}>
                      <Typography variant="body1">
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Total HBSC Supply </Box>
                          <Box color="#F3BA2F" ml="auto">
                            10,000,000
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Total Staked HBSC Supply </Box>
                          <Box color="#F3BA2F" ml="auto">
                            {(totalStaked / 1000000000000000000).toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">
                            Total Instant unstake Staked (10%)
                          </Box>
                          <Box color="#F3BA2F" ml="auto">
                            {(totalInstant / 1000000000000000000).toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Total 180 days Staked (15%) </Box>
                          <Box color="#F3BA2F" ml="auto">
                            {(total180 / 1000000000000000000).toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Total 270 days Staked (25%) </Box>
                          <Box color="#F3BA2F" ml="auto">
                            {(total270 / 1000000000000000000).toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Total 365 days Staked (50%) </Box>
                          <Box color="#F3BA2F" ml="auto">
                            {(total365 / 1000000000000000000).toFixed(3)}
                          </Box>
                        </Box>
                      </Typography>
                    </Grid>
                  </>
                </FormCard>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormCard isTileOnRight>
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5">
                        <Box color="white" fontWeight="700">
                          Personal Stats
                        </Box>
                      </Typography>
                    </Box>
                    <Grid item sm={12}>
                      <Typography variant="body1">
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Your Total HBSC</Box>
                          <Box color="#F3BA2F" ml="auto">
                            {getTotalUserHBSC().toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Your Total Unstaked HBSC</Box>
                          <Box color="#F3BA2F" ml="auto">
                            {userHBSC.toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Your Total Staked HBSC</Box>
                          <Box color="#F3BA2F" ml="auto">
                            {getTotalUserStaked().toFixed(3)}
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Your % of HBSC Supply </Box>
                          <Box color="#F3BA2F" ml="auto">
                            Test
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">Total HBSC / WBNB Liquidity </Box>
                          <Box color="#F3BA2F" ml="auto">
                            Test
                          </Box>
                        </Box>
                        <Box display="flex" fontWeight="700">
                          <Box color="white">HBSC Price </Box>
                          <Box color="#F3BA2F" ml="auto">
                            Test
                          </Box>
                        </Box>
                      </Typography>
                    </Grid>
                  </>
                </FormCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const Staking = withStyles(styles)(StakingView);

export default Staking;
