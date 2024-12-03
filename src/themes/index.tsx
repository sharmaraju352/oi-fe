import { createTheme, ThemeOptions, PaletteOptions } from '@mui/material/styles';

const colors = {
  paper: '#ffffff',
  primaryLight: '#eef2f6',
  primaryMain: '#2196f3',
  primaryDark: '#1e88e5',
  primary200: '#90caf9',
  primary800: '#1565c0',
  secondaryLight: '#ede7f6',
  secondaryMain: '#673ab7',
  secondaryDark: '#5e35b1',
  secondary200: '#b39ddb',
  secondary800: '#4527a0',
  successLight: '#b9f6ca',
  success200: '#69f0ae',
  successMain: '#00e676',
  successDark: '#00c853',
  errorLight: '#ef9a9a',
  errorMain: '#f44336',
  errorDark: '#c62828',
  orangeLight: '#fbe9e7',
  orangeMain: '#ffab91',
  orangeDark: '#d84315',
  warningLight: '#fff8e1',
  warningMain: '#ffe57f',
  warningDark: '#ffc107',
  grey50: '#f8fafc',
  grey100: '#eef2f6',
  grey200: '#e3e8ef',
  grey300: '#cdd5df',
  grey500: '#697586',
  grey600: '#4b5565',
  grey700: '#364152',
  grey900: '#121926'
};

const themePalette = (theme: any): PaletteOptions => ({
  mode: theme?.customization?.navType || 'light',
  common: {
    black: theme.colors?.grey900
  },
  primary: {
    light: theme.colors?.primaryLight,
    main: theme.colors?.primaryMain,
    dark: theme.colors?.primaryDark,
    200: theme.colors?.primary200,
    800: theme.colors?.primary800
  },
  secondary: {
    light: theme.colors?.secondaryLight,
    main: theme.colors?.secondaryMain,
    dark: theme.colors?.secondaryDark,
    200: theme.colors?.secondary200,
    800: theme.colors?.secondary800
  },
  error: {
    light: theme.colors?.errorLight,
    main: theme.colors?.errorMain,
    dark: theme.colors?.errorDark
  },
  warning: {
    light: theme.colors?.warningLight,
    main: theme.colors?.warningMain,
    dark: theme.colors?.warningDark
  },
  success: {
    light: theme.colors?.successLight,
    main: theme.colors?.successMain,
    dark: theme.colors?.successDark
  },
  grey: {
    50: theme.colors?.grey50,
    100: theme.colors?.grey100,
    200: theme.colors?.grey200,
    300: theme.colors?.grey300,
    500: theme.colors?.grey500,
    600: theme.colors?.grey600,
    700: theme.colors?.grey700,
    900: theme.colors?.grey900
  },
  background: {
    paper: theme.colors?.paper,
    default: theme.colors?.primaryLight
  }
});

const themeTypography = (theme: any) => ({
  fontFamily: theme?.customization?.fontFamily || "'Roboto', sans-serif",
  h1: {
    fontSize: '2.125rem',
    fontWeight: 700,
    color: theme.colors?.grey900
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.colors?.grey900
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.colors?.grey900
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.colors?.grey900
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.colors?.grey900
  },
  h6: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: theme.colors?.grey900
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.colors?.grey700
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: theme.colors?.grey500
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  body2: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: theme.colors?.grey700
  },
  caption: {
    fontSize: '0.75rem',
    color: theme.colors?.grey500,
    fontWeight: 400
  },
  overline: {
    fontSize: '0.625rem',
    fontWeight: 400,
    color: theme.colors?.grey500
  }
});

export const theme = () => {
  const themeOption = {
    colors,
    customization: {
      fontFamily: "'Roboto', sans-serif",
      navType: 'light'
    }
  };

  const themeOptions: ThemeOptions = {
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
    mixins: {
      toolbar: {
        minHeight: 48,
        '@media (min-width:600px)': {
          minHeight: 48
        }
      }
    }
  };

  return createTheme(themeOptions);
};

export default theme;
