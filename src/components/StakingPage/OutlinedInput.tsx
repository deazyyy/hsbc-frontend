import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MyTheme } from 'theme';

type ClassKey =
  | 'root'
  | 'notchedOutline'
  | 'input'
  | 'inputLabel'
  | 'inputRoot';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    root: {
      width: '100%',
    },
    inputRoot: {
      paddingTop: '4px',
      paddingBottom: '4px',
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#707070',
        },
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#707070',
        },
      },
    },
    notchedOutline: {
      borderColor: '#707070',
      borderWidth: '2px',
      '&.Mui-focused': {
        color: 'white',
      },
    },
    inputLabel: {
      fontWeight: 700,
      color: 'white',
      '&.Mui-focused': {
        color: 'white',
      },
    },
    input: {
      color: 'white',
    },
  });
};

type OutlinedInputProps = WithStyles<ClassKey> & {
  icon: React.ReactElement;
  actionTitle: string;
  actionFunc: () => void;
  onChangeFunc: (any) => void;
  label: string;
  placeholder?: string;
};

const OutlinedInputView = (props: OutlinedInputProps) => {
  const { classes, icon, actionTitle, actionFunc, onChangeFunc, ...others } =
    props;

  return (
    <TextField
      variant="outlined"
      onChange={onChangeFunc}
      className={classes.root}
      {...others}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          notchedOutline: classes.notchedOutline,
          input: classes.input,
        },
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={actionFunc}
            >
              {actionTitle}
            </Button>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        className: classes.inputLabel,
      }}
    />
  );
};

export const OutlinedInput = withStyles(styles)(OutlinedInputView);

export default OutlinedInput;
