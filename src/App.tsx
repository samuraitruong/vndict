import React, { useState, FormEvent } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, IconButton, InputBase, Divider, Chip, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TranslateIcon from '@material-ui/icons/Translate';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

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
      height: 1,
      marginTop: theme.spacing(1),
    },
    container: {
      margin: theme.spacing(1, 0),
    },
    speakButton: {
      marginLeft: theme.spacing(3)
    },
    suggestList: {
      backgroundColor:  theme.palette.background.paper,
      marginTop: theme.spacing(5)
    }
  }),
);


const App: React.FC = () => {
  const classes = useStyles({});
  const [data, setData] = useState({ });
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("en_vn");
  const [message, setMessage] = useState(null);

  const search = async (inputKeyword: string) => {
    try{
      const ft = await fetch(`https://samuraitruong.github.io/open-vn-en-dict/html/${inputKeyword.toLocaleLowerCase()}.json`);
      const json = await ft.json();
      console.log("datasource", json);
      setType("en_vn")
      setData(json);
    }
    catch{
      console.log("error loading data");
      setData({});
    }
  }
  const dict = (data as any)[type];
  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setType(newAlignment);
  };
  const handleSubmit = (e: FormEvent) => {
    search(keyword);
    e.preventDefault()
    return  false;
  }
  const playSound = (word?: string , accent? : "us"| "uk")=> {
    const url =`https://samuraitruong.github.io/open-vn-en-dict/voice/${word.toLocaleLowerCase()}_${accent}.mp3`
    const audio = new Audio(url);
    audio.play();
  } 
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed style={{paddingBottom: "50px"}}>
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
          <Grid item sm={6}>
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
              <ToggleButton value="en_en" aria-label="centered">
                <SwapHorizIcon /> Eng -> Eng &nbsp;
              </ToggleButton>
              <ToggleButton value="synonyms" aria-label="right aligned">
                <AccountTreeIcon />  Đồng Thanh
              </ToggleButton>

            </ToggleButtonGroup>
          </Grid>
        </Grid>


        { dict && (
        <Grid>
          <Grid xs={12} item>
          <Typography variant="h3" component="span">
            {dict.data ? dict.data.word : ""}
          </Typography>
          <Typography variant="h4" component="span" >
            <Box color="grey" component="span">
            {dict.data ? `(${dict.data.pronounce})`: ""}
            </Box>
          </Typography>
          <Box component="span" className="float-right">
            <Chip className={classes.speakButton}
              clickable
              color="primary"
              onClick={() => playSound(dict.data.word, "us")}
              icon={<VolumeDownIcon />}
              label="US"/>
              <Chip
              className={classes.speakButton}
              clickable
              color="secondary"
              onClick={() => playSound(dict.data.word, "uk")}
              icon={<VolumeUpIcon />}
              label="UK"/>
            </Box>
          <Divider  className={classes.divider}/>
          <Typography variant="body1" component="article" dangerouslySetInnerHTML={{ __html: dict.data ? dict.data.content : "" }}>
          </Typography>
          </Grid>
          {dict.suggests && (
          <Grid className={classes.suggestList}>
            <Typography variant="h3" component="h3"> Từ liên quan:
              </Typography>
            <List component="nav" className={classes.suggestList} aria-label="contacts">
              {dict.suggests.map((item: any) => (
              <ListItem key={item.word} button onClick={() => { setKeyword(item.word); search(item.word)}}>
                <ListItemIcon>
                  <LabelImportantIcon />
                </ListItemIcon>
                <ListItemText primary={item.word} color="primary" />
              </ListItem>))}
            </List>

          </Grid>)}
        </Grid>
        )}
      </Container>
    </React.Fragment >
  );
}

export default App;
