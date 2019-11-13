import React from "react"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"

const theme = createMuiTheme()

const Theme: React.FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </>
  )
}

export default Theme



