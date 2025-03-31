import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Card sx={{ padding: 4, margin: "20px", maxWidth: 800 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Welcome to FinAgent
        </Typography>
        <Typography variant="body1" gutterBottom>
          FinAgent is your comprehensive financial intelligence and trading strategy platform. 
          Utilize real-time data analysis, model benchmarking, and sentiment analysis to make 
          informed investment decisions.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Navigate through our features:
        </Typography>
        <ul>
          <li>Real-Time Financial Analysis</li>
          <li>Trading Strategy Optimization</li>
          <li>Model Benchmarking</li>
          <li>Sentiment Analysis</li>
          <li>Performance Tracking</li>
        </ul>
        <Button 
          variant="contained" 
          component={Link} 
          to="/dashboard" 
          sx={{ marginTop: 2 }}
        >
          Go to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default Home;
