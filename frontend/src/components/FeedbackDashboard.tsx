import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const FeedbackDashboard = () => {
  const [ticker, setTicker] = useState("");
  interface TrendData {
    name: string;
    rating: number;
  }

  const [trend, setTrend] = useState<TrendData[]>([]);

  const fetchTrend = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/feedback/all/${ticker}`);
      interface FeedbackItem {
        rating: number;
      }

      interface TrendData {
        name: string;
        rating: number;
      }

      const data: TrendData[] = response.data.map((item: FeedbackItem, index: number) => ({
        name: `Feedback ${index + 1}`,
        rating: item.rating,
      }));
      setTrend(data);
    } catch (err) {
      console.error("Error fetching feedback trends:", err);
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 800 }}>
      <CardContent>
        <Typography variant="h5">Feedback Dashboard</Typography>
        <TextField
          label="Ticker"
          variant="outlined"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button variant="contained" onClick={fetchTrend} sx={{ marginTop: 2 }}>
          View Feedback Trend
        </Button>
        {trend.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#8884d8" name="User Rating" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackDashboard;
