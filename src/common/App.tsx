import React from "react";
import ThemeProvider from './ThemeProvider'
import AppBar from 'components/AppBar'
import Home from "common/Home"
import Container from "@material-ui/core/Container";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App: React.FC = () => {
  return (
    <Router>
    <ThemeProvider>
      <Container fixed style={{ paddingBottom: "50px" }}>
        <AppBar />
        <Switch>
        <Route path="/:word">
            <Home />
          </Route>
          <Route path="">
            <Home />
          </Route>
          </Switch>
      </Container>
    </ThemeProvider>
    </Router>
  );
};

export default App;
