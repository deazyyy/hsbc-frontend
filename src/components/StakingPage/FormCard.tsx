import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import { MyTheme } from 'theme';
import { Box } from '@material-ui/core';
import cardBg from 'assets/cardBg.png';

type ClassKey = 'root';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    root: {
      padding: myTheme.spacing(4),
      backgroundColor: myTheme.palette.background.paper,
      borderRadius: '8px',
      position: 'relative',
    },
  });
};

type FormCardProps = WithStyles<ClassKey> & {
  children?: React.ReactElement;
  isTileOnRight?: boolean;
};

const FormCardView = (props: FormCardProps) => {
  const { classes, isTileOnRight = false, children, ...others } = props;

  return (
    <Box className={classes.root} {...others}>
      <Box
        position="absolute"
        right="0"
        bottom="0"
        height="100%"
        mr={isTileOnRight ? 0 : 25}
      >
        <img src={cardBg} height="100%" />
      </Box>
      {children}
    </Box>
  );
};

export const FormCard = withStyles(styles)(FormCardView);

export default FormCard;
