import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import TradingFactors from "../components/TradingFactors";
import NewStrategies from "../components/Newstrategies";
import MultiFactorModel from "../components/MultiFactorModel";
import StrategyComparison from "../components/StrategyComparison";
import Benchmarking from "../components/Benchmarking";
import FeedbackDashboard from "../components/FeedbackDashboard";
import FinancialAnalysis from "../components/FinancialAnalysis";
import Chatbot from "../components/Chatbot";
import Notification from "../components/Notification";

const Dashboard = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Finagent Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TradingFactors />
        </Grid>
        <Grid item xs={12} md={6}>
          <NewStrategies />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiFactorModel />
        </Grid>
        <Grid item xs={12} md={6}>
          <StrategyComparison />
        </Grid>
        <Grid item xs={12} md={6}>
          <Benchmarking />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeedbackDashboard />
        </Grid>
        <Grid item xs={12} md={6}>
          <FinancialAnalysis />
        </Grid>
        <Grid item xs={12} md={6}>
          <Chatbot />
        </Grid>
        <Grid item xs={12} md={6}>
          <Notification />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
