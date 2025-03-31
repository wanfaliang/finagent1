import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const MultiFactorModel = () => {
  const [ticker, setTicker] = useState("");
  interface Signal {
    Close: number;
    RSI: number;
    MA50: number;
    MA200: number;
    Prediction: string;
  }
  
  const [signals, setSignals] = useState<Signal[]>([]);

  const fetchMultiFactor = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/strategies/multi_factor/${ticker}`);
      setSignals(response.data.signals);
    } catch (err) {
      console.error("Error fetching multi-factor model signals:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Multi-Factor Model Signals</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button variant="contained" onClick={fetchMultiFactor} sx={{ marginTop: 2 }}>
          Get Multi-Factor Signals
        </Button>
        {signals.length > 0 && (
          <Typography sx={{ marginTop: 2 }}>
            {signals.map((signal, index) => (
              <div key={index}>
                Close: {signal.Close}, RSI: {signal.RSI}, MA50: {signal.MA50}, 
                MA200: {signal.MA200}, Prediction: {signal.Prediction}
              </div>
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MultiFactorModel;
