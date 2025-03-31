import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

interface Metrics {
  accuracy?: number;
  precision?: number;
  recall?: number;
}
const Benchmarking = () => {
  const [ticker, setTicker] = useState("");
  const [metrics, setMetrics] = useState<Metrics>({});

  const fetchBenchmark = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/performance/benchmark/${ticker}`);
      setMetrics(response.data);
    } catch (err) {
      console.error("Error fetching benchmarking data:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Model Benchmarking</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button variant="contained" onClick={fetchBenchmark} sx={{ marginTop: 2 }}>
          Benchmark Model
        </Button>
        {metrics.accuracy !== undefined && (
          <Typography sx={{ marginTop: 2 }}>
            Accuracy: {metrics.accuracy}% <br />
            Precision: {metrics.precision}% <br />
            Recall: {metrics.recall}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Benchmarking;
