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

// const baseTheme = {
//   typography: {
//     fontFamily: [
//       "-apple-system",
//       "system-ui",
//       "BlinkMacSystemFont",
//       '"Helvetica Neue"',
//       "Helvetica",
//       "sans-serif",
//     ].join(","),
//     fontSize: 16,
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           minHeight: "100vh",
//           position: "relative",
//           "&.fit": {
//             minHeight: "calc(100vh - 188px)",
//           },
//         },
//       },
//     },
//   },
// };

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
    // Button styles
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "44px",
          maxHeight: "64px",
          padding: "12px",
          borderRadius: "12px",
          // textTransform: 'none',
          fontSize: "0.75rem",
          lineHeight: "1rem",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: COLORS.primary[400],
            color: COLORS.primary[100],
            cursor: "not-allowed",
          },
        },
        contained: {
          backgroundColor: COLORS.primary[900],
          color: COLORS.primary[100],
          "&:hover": {
            backgroundColor: COLORS.primary[800],
          },
        },
        outlined: {
          borderColor: COLORS.primary[500],
          color: COLORS.primary[900],
          "&:hover": {
            backgroundColor: COLORS.primary[50],
            borderColor: COLORS.primary[600],
          },
        },
        text: {
          color: COLORS.primary[900],
          "&:hover": {
            backgroundColor: COLORS.primary[50],
          },
        },
      },
    },
    // Input/TextField styles
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // backgroundColor: COLORS.primary[100],
          borderRadius: "12px",
          //  border: `1px solid ${COLORS.primary[500]}`,
          color: COLORS.primary[900],
          padding: "8px 24px",
          width: "100%",
          "&.Mui-focused": {
            outline: "none",
            boxShadow: `0 0 0 2px ${COLORS.primary[200]}`,
          },
          "&.Mui-disabled": {
            backgroundColor: COLORS.primary[50],
            cursor: "not-allowed",
          },
        },
        input: {
          padding: "8px 0",
          "&::placeholder": {
            color: COLORS.primary[400],
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
    // Checkbox styles
    MuiCheckbox: {
      styleOverrides: {
        root: {
          marginRight: "8px",
          height: "16px",
          width: "16px",
          color: COLORS.primary[500],
          "&.Mui-checked": {
            color: COLORS.primary[900],
          },
        },
      },
    },
    // FormControlLabel styles
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "0.875rem",
          color: COLORS.primary[900],
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
