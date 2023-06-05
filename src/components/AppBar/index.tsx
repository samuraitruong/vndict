import React from "react";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuBookIcon from "@mui/icons-material/MenuBook";

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuBookIcon />
        </IconButton>
        <Typography variant="h6">
          Vietnamese - English open dictionary
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
