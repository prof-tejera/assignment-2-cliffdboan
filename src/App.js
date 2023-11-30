import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import AddPage from "./views/AddPage";
import TimersView from "./views/TimersView";
import TimerProvider from "./utils/timerProvider";

const Container = styled.div`
  background: #dbdcda;
  color: black;
  height: 100vh;
  overflow: auto;
  -webkit-text-stroke-width: .15px;
  -webkit-text-stroke-color: black;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container>
      <Router>
          <Nav />
        <TimerProvider>
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/" element={<TimersView />} />
          </Routes>
        </TimerProvider>
      </Router>
    </Container>
  );
};

export default App;
