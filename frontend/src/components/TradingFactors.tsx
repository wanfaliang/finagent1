import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const TradingFactors = () => {
  const [ticker, setTicker] = useState("");
  interface Factor {
    Close: number;
    RSI: number;
    MA50: number;
    MA200: number;
    BB_High: number;
    BB_Low: number;
    OBV: number;
  }
  
  const [factors, setFactors] = useState<Factor[]>([]);

  const fetchFactors = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/trading/factors/${ticker}`);
      setFactors(response.data.factors);
    } catch (err) {
      console.error("Error fetching trading factors:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Trading Factors</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button variant="contained" onClick={fetchFactors} sx={{ marginTop: 2 }}>
          Get Factors
        </Button>
        {factors.length > 0 && (
          <Typography sx={{ marginTop: 2 }}>
            {factors.map((factor, index) => (
              <div key={index}>
                Close: {factor.Close}, RSI: {factor.RSI}, MA50: {factor.MA50}, 
                MA200: {factor.MA200}, BB_High: {factor.BB_High}, 
                BB_Low: {factor.BB_Low}, OBV: {factor.OBV}
              </div>
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TradingFactors;
