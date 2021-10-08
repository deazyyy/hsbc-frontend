import React, { useEffect, useState, useCallback } from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import reservationTitleIcon from 'assets/reservationTitle.png';
import totalsIcons from 'assets/totalsIcons.png';
import cardBg from 'assets/cardBg.png';
import { Header } from 'layout/Header';
import { AbiItem } from 'web3-utils';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {web3, reservationContract, reservationAbi, reservationAddress} from  '../../contracts';

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

type ClassKey =
  | 'root'
  | 'modalHolder'
  | 'modalTitle'
  | 'modalBody'
  | 'topModalText'
  | 'topLeftModalText'
  | 'topRightModalText'
  | 'modalStats'
  | 'modalInput'
  | 'inputText'
  | 'smallText'
  | 'centerText'
  | 'closeBtn'
  | 'pageTitle'
  | 'icon'
  | 'cards'
  | 'card'
  | 'cardTop'
  | 'cardText'
  | 'cardTitle'
  | 'cardTotals'
  | 'cardTotal'
  | 'cardTotalIcon'
  | 'cardBtn'
  | 'cardBottom'
  | 'cardProgress'
  | 'cardStats'
  | 'cardStatsLeft'
  | 'cardStatsRight'
  | 'checkBox';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    root: {},
    modalHolder: {
      position: 'relative',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      },
    modalTitle:{
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 15
    },
    modalBody:{
      width:650,
      backgroundColor: myTheme.palette.background.default,
      borderRadius: 10,
      padding: 10,
      background: `url(${cardBg}) no-repeat`,
        backgroundSize: '250px auto',
        backgroundPosition: 'bottom right',
    },
    topModalText:{
      justifyContent:'space-around',
      display:'flex'
    },
    topLeftModalText:{
      textAlign:'left',
      fontWeight:'bold',
      marginLeft:10,
      width:'50%'
    },
    topRightModalText:{
      textAlign:'right',
      fontWeight:'bold',
      marginRight:10,
      width:'50%'
    },
    modalStats:{
      marginTop:20,
      marginBottom:10,
      display:'inline-table',
      width:'50%'
    },
    modalInput:{
      fontSize:18,
      backgroundColor:'transparent',
      color:'#F3BA2F',
      fontWeight:'bold',
      border:'none',
      width:100,
      '&.focus-visible':{
        border:'none'
      },
      '&.focus':{
        border:'none'
      }
    },
    inputText:{
      fontSize: 14,
      marginLeft:5,
      marginRight:5
    },
    centerText:{
      display:'inline-flex'
    },
    smallText:{
      fontSize:10,
      textAlign:'left'
    },
    closeBtn: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
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
      background: `url(${reservationTitleIcon})`,
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
    card: {
      position: 'relative',
      background: myTheme.palette.primary.main,
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      color: myTheme.palette.text.secondary,
      fontFamily: myTheme.typography.fontFamily,
    },
    cardTop: {
      padding: '28px 20px',
      borderRadius: 9,
      backgroundColor: myTheme.palette.background.paper,
      '&.checked': {
        background: `url(${cardBg}) no-repeat`,
        backgroundSize: '150px auto',
        backgroundPosition: 'bottom right',
        backgroundColor: myTheme.palette.background.paper,
      },
    },
    cardText: {
      fontSize: 14,
      padding: '10px 0 15px'
    },
    cardTitle: {
      marginBottom: 28,
      color: myTheme.palette.primary.main,
      fontSize: 16,
    },
    cardTotals: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-around',
      marginBottom: 36,
    },
    cardTotal: {
      padding: '0 10px',
      fontSize: 14,
      color: myTheme.palette.text.primary,
      '& b': {
        fontWeight: 'normal',
        fontSize: 16,
      },
    },
    cardTotalIcon: {
      display: 'inline-block',
      width: 25,
      height: 25,
      marginBottom: 6,
      background: `url(${totalsIcons}) no-repeat`,
      backgroundSize: 'auto 25px',
      '&.user': {
        backgroundPosition: '3px -2px',
      },
      '&.bnb': {
        backgroundPosition: '-114px 0px',
      },
    },
    cardBtn: {
      marginBottom: 10,
    },
    cardBottom: {
      padding: '10px 15px 12px 15px',
    },
    cardProgress: {
      padding: 1,
      background: '#000',
      borderRadius: 5,
      marginBottom: 11,
      '& span': {
        display: 'block',
        height: 15,
        borderRadius: 4,
        background: '#00ff15',
      },
    },
    cardStats: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      color: '#282828',
      fontSize: 14,
      lineHeight: '20px',
    },
    cardStatsLeft: {
      textAlign: 'left',
    },
    cardStatsRight: {
      textAlign: 'right',
    },
    checkBox: {
      position: 'absolute',
      top: 23,
      right: 20,
      display: 'block',
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: `solid 1px ${myTheme.palette.primary.main}`,
      '& > svg': {
        marginTop: -8,
      },
    },
  });
};


type ReservationProps = WithStyles<ClassKey>;

const ReservationView = ({ classes }: ReservationProps) => {

  type Pool = {
  endTime: number;
  totalUsers: number;
  totalContribution: number;
  };

  const [pools, setPools] = useState<Pool[]>([]);
  const [contributions, setContributions] = useState<Record<string, unknown>[]>(
    [],
  );

  const [accounts, setAccounts] = useState(['']);
  const [modal, setModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(0);
  const [reservationAmount, setReservationAmount] = useState(0);
  const [inputShare, setInputShare] = useState(0);
  const [inputTokens, setInputTokens] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const setNewPools = async () => {
    const poolData = await reservationContract.methods.getAllPools().call();
    setPools(poolData); 
  }

   useEffect(() => {
    async function readContract() {
      const newAccounts = await web3.eth.getAccounts();
      setAccounts(newAccounts);

      await setNewPools();

      if(newAccounts[0]){
        const contributionData = await reservationContract.methods
          .getAllContributionsAndShare(newAccounts[0])
          .call();
        setContributions(contributionData);
        console.log(contributionData);

        const reserveEndTime = await reservationContract.methods.endDate().call();
        setEndTime(reserveEndTime);
      }

    }
    if(web3){
      readContract();
    }
    
  }, []);

  const onReserveClick = async () => {
    if(accounts[0]){
      await reservationContract.methods.reserve(selectedPool, 
        web3.utils.toWei(reservationAmount.toString(),'ether')).send({
        from: accounts[0]});
    }
  };
 
  const getContribution = (poolId: number) => {
    if (!contributions[poolId]) return 0;
    return contributions[poolId].userContribution as number;
  };

  const getShare = (poolId: number) => {
    if (!contributions[poolId]) return 0;
    return contributions[poolId].currentShare as number;
  };

  const getNewShare = (poolId: number, amount: number) => {
    if (amount == 0) return 0;
    return getNewContributionPercentage(selectedPool, amount) / 100 * 200;
  };

  const getContributionPercentage = (poolId: number) => {
    if (!contributions[poolId]) return 0;
    const total: number = pools[poolId].totalContribution as number;
    const user: number = getContribution(poolId) as number;
    if (total === 0 || user === 0) return 0;

    return (user / total) * 100;
  };

  const getNewContributionPercentage = (poolId: number, amount: number) => {
    if (!contributions[poolId]) return 100;
    const adjustedAmount: number = amount * 1000000000000000000;
    const total: number =  +(adjustedAmount) + 
    +(pools[selectedPool].totalContribution as number);
    if (total === 0 || amount === 0) return 0;
    const newAmount: number = adjustedAmount / total * 100;

    return newAmount;
  };

  const onAmountChange = (val: string) => {
      var value = parseFloat(val);
      setReservationAmount(value);
      setInputShare(getNewContributionPercentage(selectedPool, value));
      setInputTokens(getNewShare(selectedPool, value));

  };

  const claimTokens = async () => {
   await reservationContract.methods.claim().send({
      from: accounts[0]
    });
  }

  const mintAndApproveTokensForPancakeSwap = async () => {
    await reservationContract.methods.CompleteReservations().send({
      from: accounts[0]
    })
  }

  const pushLiquidityToPancakeSwap = async () => {
    await reservationContract.methods.pushLiquidityToPancakeSwap().send({
      from: accounts[0]
    })
  }

  const claimLPToken = async () => {
    await reservationContract.methods.claimLPToken('0xc04296dC4ca1Ce373D37d64020cEf42F729df15F').send({
      from: accounts[0]
    })

  }
  return (
    <>
      <Header pageName="reservation" />
      <Container maxWidth="xl" className={classes.pageTitle}>
        <span className={classes.icon}></span>
        <Typography component="div">
          <h2 className="h2">
            <b>HBSC</b> Reservation
          </h2>
          <p>You have 20 days to reserve your HBSC tokens</p>
        </Typography>
      </Container>
      <Container maxWidth="xl" className={classes.cards}>
      {!pools ? "" :
        <Modal className={classes.root} open={modal}>
          <div className={classes.modalHolder}>
            <Card className={classes.card} elevation={3}>
              <CardContent>
                <div className={classes.modalTitle}>Reserve HBSC</div>
                <div className={classes.modalBody}>
                  <div className={classes.topModalText}>
                    <span className={classes.topLeftModalText}> {new Date(
                      (pools[selectedPool]?.endTime as number) * 1000,
                    ).toLocaleDateString()} - Day {selectedPool + 1} </span>
                    <span className={classes.topRightModalText}>Total HBSC supply: 200 </span>
                  </div>
                  <div>
                    <div className={classes.modalStats}>
                      <div> <span className={`${classes.cardTotalIcon} user`}></span></div>
                      <div><b>{pools[selectedPool]?.totalUsers}</b></div>
                      <div className={classes.cardText}>Total users that entered today's HBSC pool</div>
                    </div>
                    <div className={classes.modalStats}>
                      <div> <span className={`${classes.cardTotalIcon} bnb`}></span></div>
                      <div><b>{(pools[selectedPool]?.totalContribution as number) /
                          1000000000000000000}</b></div>
                      <div className={classes.cardText}>Total BUSD in today's reservation pool</div>
                    </div>
                  </div>
                  <div className={classes.centerText}>
                    <span className={classes.inputText} >I want to reserve  </span>
                    <span> 
                      <input className={classes.modalInput} type='number' onChange={e => onAmountChange(e.target.value)}
                      />
                    </span>
                    <span className={`${classes.cardTotalIcon} bnb`}></span>
                    <span className={classes.modalInput}> BUSD </span>
                    <span className={classes.inputText}> worth of HBSC</span>
                  </div>
                  <div className={classes.cardText}>
                    <span>This represents</span>
                    <span className={classes.modalInput}> { inputShare.toFixed(5)} %</span>
                    <span> of today's </span>
                    <span className={classes.modalInput}> BUSD </span>
                    <span> in the reservation pool </span>
                  </div>
                  <div >
                    <span> <b> = </b> </span>
                    <span className={classes.modalInput}> {inputTokens.toFixed(5)} HBSC </span>*
                  </div>
                  <div>
                   <br/>
                  </div>
                    <Button
                    className={classes.cardBtn}
                    onClick={() => onReserveClick()}
                    color="primary"
                    variant="contained"
                     >
                    SEND BNB AND APPROVE RESERVATION
                    </Button>
                  <div>
                     <p className={classes.smallText}>* This is the maximum amount you will receive<br/>
                     The actual number of HBSC you will receive will depend on your reserved percentage of the BUSD pool</p>
                  </div>
                </div>
                <IconButton
                className={classes.closeBtn}
                size="small"
                onClick={() => {setModal(false)}}
                >
                <CloseIcon />
                </IconButton>
              </CardContent>
            </Card>
          </div>
        </Modal>
      }
        <ul>
        <Button
              className={classes.cardBtn}
              onClick={() => claimTokens()}
              color="primary"
              variant="contained"
              fullWidth
            >
              Claim Tokens
            </Button>
        </ul>
        <ul>
          {pools.map((pool, index) => (
            <li>
              <div className={classes.card}>
                <div
                  className={`${classes.cardTop} ${
                    (pool.endTime as number) * 1000 < Date.now()
                      ? 'checked'
                      : ''
                  }`}
                >
                  <div className={classes.cardText}>
                    {new Date(
                      (pool.endTime as number) * 1000,
                    ).toLocaleDateString()}
                    - Day #{index + 1}
                  </div>
                  <div className={classes.cardTitle}>200 HBSC</div>
                  <div className={classes.cardTotals}>
                    <div className={classes.cardTotal}>
                      <span className={`${classes.cardTotalIcon} user`}></span>
                      <br />
                      <b>{pool.totalUsers}</b> <br />
                      total users
                    </div>
                    <div className={classes.cardTotal}>
                      <span className={`${classes.cardTotalIcon} bnb`}></span>
                      <br />
                      <b>
                        {(pool.totalContribution as number) /
                          1000000000000000000}
                      </b>
                      {} <br />
                      total BUSD
                    </div>
                  </div>
                  {(pool.endTime as number) * 1000 < Date.now() ? '' :
                  <Button
                    className={classes.cardBtn}
                    onClick={() => {setSelectedPool(index); setModal(true)}}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    RESERVE HBSC
                  </Button>}
                </div>
                <div className={classes.cardBottom}>
                  <div className={classes.cardProgress}>
                    <span
                      style={{
                        width: getContributionPercentage(index) + '%',
                      }}
                    ></span>
                  </div>
                  <div className={classes.cardStats}>
                    <div className={classes.cardStatsLeft}>
                      Your Share
                      <br /> <b> {getShare(index)} HBSC</b>
                    </div>
                    <div className={classes.cardStatsRight}>
                      Your Contribution
                      <br /> <b>{getContribution(index) / 1000000000000000000} BUSD</b>
                    </div>
                  </div>
                </div>
                <span className={classes.checkBox}>
                  {(pool.endTime as number) * 1000 < Date.now() ? <MarkIcon /> : null}
                </span>
              </div>
            </li>
          ))}
        </ul>
       
        <ul>
        <p>ADMIN TEST</p>
       <Button
                    className={classes.cardBtn}
                    onClick={() => {mintAndApproveTokensForPancakeSwap()}}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    1. Complete Reservations
                  </Button>
                  <Button
                    className={classes.cardBtn}
                    onClick={() => {pushLiquidityToPancakeSwap()}}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    2. Push Liquidity
                  </Button>
                  <Button
                    className={classes.cardBtn}
                    onClick={() => {claimLPToken()}}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    3. Claim LP
                  </Button>
           </ul> 
      
      </Container>
    </>
  );
};

export const Reservation = withStyles(styles)(ReservationView);

export default Reservation;
