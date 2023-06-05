import React from "react";
import ThemeProvider from "./ThemeProvider";
import AppBar from "components/AppBar";
import Home from "containers/Home";
import Container from "@mui/material/Container";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ThemeProvider>
        <Container fixed className="container-wrapper">
          <AppBar />
          <Container>
            <Routes>
              <Route path="/:word" element={<Home />}></Route>
              <Route path="" element={<Home />}></Route>
            </Routes>
          </Container>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
