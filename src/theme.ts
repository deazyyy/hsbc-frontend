import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles';
import {
  Palette,
  PaletteOptions,
  PaletteColor,
} from '@material-ui/core/styles/createPalette';

interface MyPalette extends Palette {
  third: PaletteColor;
}

export interface MyTheme extends Theme {
  palette: MyPalette;
}

interface MyPaletteOptions extends PaletteOptions {
  third?: PaletteColor;
}

interface MyThemeOptions extends ThemeOptions {
  palette?: MyPaletteOptions;
}

const themeOptions: MyThemeOptions = {
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  palette: {
    background: {
      default: '#151515',
      paper: '#282828',
    },
    text: {
      primary: '#fff',
      secondary: '#bbb',
    },
    primary: {
      main: '#F3BA2F',
    },
    secondary: {
      main: '#353532',
    },
    third: {
      main: 'back',
      light: 'black',
      dark: 'black',
      contrastText: 'black',
    },
  },
  breakpoints: {
    values: {
      xs: 650,
      sm: 700,
      md: 800,
      lg: 940,
      xl: 1350,
    },
  },
};

export const theme = createMuiTheme(themeOptions);

export const themeColor = {
  primary: '#f3ba0f',
};
