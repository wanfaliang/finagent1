import React from "react";
import { Container, Typography } from "@mui/material";
import UserProfile from "../components/UserProfile";

const Settings = () => {
  return (
    <Container sx={{ marginTop: 4, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <UserProfile />
    </Container>
  );
};

export default Settings;
