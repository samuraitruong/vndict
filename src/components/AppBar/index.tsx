import React from "react"

import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import MenuBookIcon from '@material-ui/icons/MenuBook'

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuBookIcon />
        </IconButton>
        <Typography variant="h6">Vietnamese - English open dictionary</Typography>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar