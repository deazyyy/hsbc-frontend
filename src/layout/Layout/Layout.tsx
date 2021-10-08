import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { AuthPopup } from 'components/LoginPage';
import { Header } from 'layout/Header';
import { Footer } from 'layout/Footer';
import { Reservation } from 'pages/Reservation';
import { Profile } from 'pages/Profile';
import { Staking } from 'pages/Staking';
import Landing from 'pages/Landing';
import { MyTheme } from 'theme';

type ClassKey = 'top' | 'topBg';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  const t = lighten(myTheme.palette.background.default, 0.2);
  const b = myTheme.palette.background.default;
  const c1 = 'transparent';
  const c2 = myTheme.palette.primary.main;
  const o = 65; // %
  const w = 200; // px
  const ow = 80; // px
  return createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      flexGrow: 1,
      background: `linear-gradient(to bottom, ${t}, ${b} 1000px)`,
    },
    topBg: {
      flexGrow: 1,
      background: `linear-gradient(
        135deg,
        ${c1},
        ${c1} ${o}%,
        ${c2} ${o}%,
        ${c2} calc(${o}% + ${w}px),
        ${c1} calc(${o}% + ${w}px),
        ${c1} calc(${o}% + ${w + ow}px),
        ${c2} calc(${o}% + ${w + ow}px),
        ${c2} calc(${o}% + ${w + ow + w}px),
        ${c1} calc(${o}% + ${w + ow + w}px),
        ${c1} 100%
      )`,
    },
  });
};

type LayoutProps = WithStyles<ClassKey>;

const LayoutView = ({ classes }: LayoutProps) => {
  return (
    <>
      <div className={classes.top}>
        <div className={classes.topBg}>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/profile" component={Profile} />
            <Route path="/staking" component={Staking} />
            <Route path="/reservation" component={Reservation} />
          </Switch>
        </div>
      </div>
      <Footer />
      <AuthPopup />
    </>
  );
};

export const Layout = withStyles(styles)(LayoutView);

export default Layout;
