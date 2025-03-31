import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const NewStrategies = () => {
  const [ticker, setTicker] = useState("");
  interface Strategy {
    Close: number;
    RSI: number;
    MA50: number;
    MA200: number;
    Prediction: string;
  }

  const [strategies, setStrategies] = useState<Strategy[]>([]);

  const fetchStrategies = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/strategies/multi_factor/${ticker}`);
      setStrategies(response.data.signals);
    } catch (err) {
      console.error("Error fetching new strategies:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">New Trading Strategies</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button variant="contained" onClick={fetchStrategies} sx={{ marginTop: 2 }}>
          Get Strategies
        </Button>
        {strategies.length > 0 && (
          <Typography sx={{ marginTop: 2 }}>
            {strategies.map((strategy, index) => (
              <div key={index}>
                Close: {strategy.Close}, RSI: {strategy.RSI}, MA50: {strategy.MA50}, 
                MA200: {strategy.MA200}, Prediction: {strategy.Prediction}
              </div>
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NewStrategies;
