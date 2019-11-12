import React, { useState, FormEvent } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, IconButton, InputBase, Divider } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TranslateIcon from '@material-ui/icons/Translate';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    container: {
      margin: theme.spacing(1, 0),
    },
  }),
);


const App: React.FC = () => {
  const classes = useStyles({});
  const [data, setData] = useState({ en_vn: { data: null }, });
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("en_vn");
  const search = async (inputKeyword: string) => {
    const ft = await fetch(`https://samuraitruong.github.io/open-vn-en-dict/html/${inputKeyword}.json`);
    const json = await ft.json();
    console.log("data", json);
    setData(json);
  }
  const { en_vn } = data;
  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setType(newAlignment);
  };
  const handleSubmit = (e: FormEvent) => {
    search(keyword);
    e.preventDefault()
    return  false;
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" variant="body1">
          <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
            Vietnamese - English open dictionary
      </Box>
        </Typography>
        <Grid container spacing={3} className={classes.container}>
          <Grid item sm={6}>
            <form onSubmit={handleSubmit}>

              <Paper className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase

                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className={classes.input}
                  placeholder="English -> Vietnamese"
                  inputProps={{ 'aria-label': 'English -> Vietnamese' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => search(keyword)}>
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                  <DirectionsIcon />
                </IconButton>
              </Paper>
            </form>
          </Grid>
          <Grid item sm={6} justify="space-between" alignContent="flex-end" alignItems="flex-end">
            <ToggleButtonGroup
              value={type}
              exclusive
              onChange={handleTypeChange}
              style={{ float: "right" }}
              aria-label="text alignment"
            >
              <ToggleButton value="en_vn" aria-label="left aligned">
                <TranslateIcon></TranslateIcon> Eng -> Vi &nbsp;
              </ToggleButton>
              <ToggleButton value="vn_en" aria-label="centered">
                <SwapHorizIcon /> Vi -> Eng &nbsp;
              </ToggleButton>
              <ToggleButton value="synonym" aria-label="right aligned">
                <AccountTreeIcon />  Đồng Nghĩa
              </ToggleButton>

            </ToggleButtonGroup>
          </Grid>
        </Grid>


        <div>
          <Typography variant="h4" component="h4">
            {en_vn != null && en_vn.data ? en_vn.data.word : ""}
          </Typography>

          <Typography variant="body1" component="body" dangerouslySetInnerHTML={{ __html: en_vn != null && en_vn.data ? en_vn.data.content : "" }}>
          </Typography>

        </div>
      </Container>
    </React.Fragment >
  );
}

export default App;
