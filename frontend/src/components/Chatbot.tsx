import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const Chatbot = () => {
  const [ticker, setTicker] = useState("");
  const [news, setNews] = useState("");
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");

  const handleChat = async () => {
    try {
      const username = "testuser"; // You can replace this with the actual logged-in username
      const res = await axios.post("http://localhost:8000/chatbot/chat", {
        ticker: ticker.toUpperCase(),
        news: news.split("\n"),
        username: username,
      });
      setResponse(res.data.message);
      setMessage("");
    } catch (err) {
      setMessage("Error in chatbot response.");
      console.error("Chatbot error:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Financial Chatbot</Typography>
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
        <Button variant="contained" onClick={handleChat}>
          Chat with Agent
        </Button>
        {message && <Typography color="error" sx={{ marginTop: 2 }}>{message}</Typography>}
        {response && (
          <Typography sx={{ marginTop: 2, whiteSpace: "pre-line" }}>
            {response.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Chatbot;
