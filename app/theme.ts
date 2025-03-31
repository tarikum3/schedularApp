// "use client";
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   //   typography: {
//   //     fontFamily: 'var(--font-roboto)',
//   //   },
// });

// export default theme;

"use client";
import { createTheme } from "@mui/material/styles";
import { COLORS } from "@lib/const";

const baseTheme = {
  typography: {
    fontFamily: [
      "-apple-system",
      "system-ui",
      "BlinkMacSystemFont",
      '"Helvetica Neue"',
      "Helvetica",
      "sans-serif",
    ].join(","),
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          position: "relative",
          "&.fit": {
            minHeight: "calc(100vh - 188px)",
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: COLORS.primary[500],
      light: COLORS.primary[400],
      dark: COLORS.primary[600],
      contrastText: COLORS.primary[0],
      ...COLORS.primary,
    },
    text: {
      primary: COLORS.primary[900],
      secondary: COLORS.primary[500],
    },
    background: {
      default: COLORS.primary[0],
      paper: COLORS.primary[0],
    },
    success: {
      main: COLORS.positive[500],
      light: COLORS.positive[600],
      dark: COLORS.positive[900],
    },
    error: {
      main: COLORS.danger[500],
      light: COLORS.danger[600],
      dark: COLORS.danger[900],
    },
    warning: {
      main: COLORS.warning[500],
      light: COLORS.warning[600],
      dark: COLORS.warning[900],
    },
    info: {
      main: COLORS.notification[500],
      light: COLORS.notification[600],
      dark: COLORS.notification[900],
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.primary[400],
      light: COLORS.primary[300],
      dark: COLORS.primary[500],
      contrastText: COLORS.primary[900],
      // Reverse the shades for dark mode
      50: COLORS.primary[900],
      100: COLORS.primary[800],
      200: COLORS.primary[700],
      300: COLORS.primary[600],
      400: COLORS.primary[500],
      500: COLORS.primary[400],
      600: COLORS.primary[300],
      700: COLORS.primary[200],
      800: COLORS.primary[100],
      900: COLORS.primary[50],
    },
    text: {
      primary: COLORS.primary[50],
      secondary: COLORS.primary[400],
    },
    background: {
      default: COLORS.primary[900],
      paper: COLORS.primary[900],
    },
    // Accent colors remain the same
    success: {
      main: COLORS.positive[500],
      light: COLORS.positive[600],
      dark: COLORS.positive[900],
    },
    error: {
      main: COLORS.danger[500],
      light: COLORS.danger[600],
      dark: COLORS.danger[900],
    },
    warning: {
      main: COLORS.warning[500],
      light: COLORS.warning[600],
      dark: COLORS.warning[900],
    },
    info: {
      main: COLORS.notification[500],
      light: COLORS.notification[600],
      dark: COLORS.notification[900],
    },
  },
});
