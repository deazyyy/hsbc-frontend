import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
// import { MyTheme } from 'theme';
import { Box, Typography } from '@material-ui/core';
import trendUpIcon from 'assets/trendUpIcon.png';
import { BoxProps } from '@material-ui/core/Box';

type ClassKey = 'root';

const styles = (theme: Theme) => {
  //   const myTheme = theme as MyTheme;
  return createStyles({
    root: {},
  });
};

type PriceTrendUnitProps = WithStyles<ClassKey> &
  BoxProps & {
    label: string;
    price: string;
    change: string;
  };

const PriceTrendUnitView = (props: PriceTrendUnitProps) => {
  const { classes, label, price, change, ...others } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      className={classes.root}
      {...others}
    >
      <img src={trendUpIcon} height="12"></img>
      <Box ml={2}>
        <Typography variant="caption">
          <Box color="#bbb">{label}</Box>
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">
            <Box
              display="flex"
              fontWeight="700"
              lineHeight="normal"
              color="white"
            >
              {price}
            </Box>
          </Typography>
          <Typography variant="body2">
            <Box
              borderRadius="4px"
              bgcolor="#1D7C1D"
              color="#00FF15"
              fontWeight="700"
              pt={0}
              px={0.5}
              ml={1}
            >
              {change}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const PriceTrendUnit = withStyles(styles)(PriceTrendUnitView);

export default PriceTrendUnit;
