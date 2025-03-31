"use client";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from "@/app/theme";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    setCurrentTheme(resolvedTheme === 'dark' ? darkTheme : lightTheme);
  }, [resolvedTheme]);

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}