import React from "react";

import { ThemeProvider, createTheme } from "@mui/material";

// import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

const Theme: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
