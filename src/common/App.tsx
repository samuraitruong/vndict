import React from "react";
import ThemeProvider from './ThemeProvider'
import AppBar from 'components/AppBar'
import Home from "containers/Home"
import Container from "@material-ui/core/Container";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider>
        <Container fixed  className="container-wrapper">
          <AppBar />
          <Container>
          <Switch>
            <Route path="/:word">
              <Home />
            </Route>
            <Route path="">
              <Home />
            </Route>
            </Switch>
            </Container>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
