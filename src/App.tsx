import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


const App: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState({enViData: null,});
  const [keyword, setKeyword] = useState("");
  const search = async (inputKeyword: string) => {
    const ft = await fetch(`https://samuraitruong.github.io/open-vn-en-dict/html/${inputKeyword}.json`);
    const json = await ft.json();
    console.log("data", json);
    setData(json);
  }
  const {enViData } =data;
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className={classes.container}>
      <div>
        <TextField
          id="standard-basic"
          className={classes.textField}
          label="Standard"
          margin="normal"
          value={keyword}
          onChange={(e) =>setKeyword(e.target.value) }
        />
      </div>
      <Button variant="contained" color="primary" onClick={() => search(keyword)}>
        Search
      </Button>
      <div>
      <Typography variant="h1" component="h2">
        {enViData && enViData.best  && enViData.best.word}
      </Typography>
      </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
