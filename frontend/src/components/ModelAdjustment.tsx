import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const ModelAdjustment = () => {
  const [ticker, setTicker] = useState("");
  const [message, setMessage] = useState("");

  const adjustModel = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/retrain/${ticker}`);
      setMessage(response.data.message + " - Hyperparameters: " + JSON.stringify(response.data.hyperparameters));
    } catch (err) {
      setMessage("Error adjusting model");
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Model Adjustment</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button variant="contained" onClick={adjustModel} sx={{ marginTop: 2 }}>
          Adjust Model
        </Button>
        {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default ModelAdjustment;
