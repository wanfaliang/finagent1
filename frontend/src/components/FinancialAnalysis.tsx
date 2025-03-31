import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const FinancialAnalysis = () => {
  const [ticker, setTicker] = useState("");
  const [news, setNews] = useState("");
  interface Analysis {
    Ticker: string;
    "Latest Close Price": number;
    "Short MA": number;
    "Long MA": number;
    "Sentiment Score": number;
    "Recommendation": string;
  }

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [message, setMessage] = useState("");

  const analyzeStock = async () => {
    try {
      const response = await axios.post("http://localhost:8000/financial_analysis/analyze", {
        ticker: ticker.toUpperCase(),
        news: news.split("\n"),
      });
      setAnalysis(response.data);
      setMessage("");
    } catch (err) {
      setMessage("Error performing financial analysis.");
      console.error("Error:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Financial Analysis</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="News Headlines (one per line)"
          variant="outlined"
          multiline
          minRows={4}
          value={news}
          onChange={(e) => setNews(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={analyzeStock}>
          Analyze
        </Button>
        {message && <Typography color="error" sx={{ marginTop: 2 }}>{message}</Typography>}
        {analysis && (
          <Typography sx={{ marginTop: 2 }}>
            Ticker: {analysis.Ticker} <br />
            Latest Close Price: {analysis["Latest Close Price"]} <br />
            Short MA: {analysis["Short MA"]} <br />
            Long MA: {analysis["Long MA"]} <br />
            Sentiment Score: {analysis["Sentiment Score"]} <br />
            Recommendation: {analysis["Recommendation"]}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialAnalysis;
