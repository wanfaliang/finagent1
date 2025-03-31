import React from "react";
import { Container, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Container sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Finagent - Financial Intelligence Platform
        </Typography>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
