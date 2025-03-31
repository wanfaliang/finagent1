import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Notification = () => {
  const [message, setMessage] = useState("No notifications yet");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/notifications");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">Real-Time Notifications</Typography>
        <Typography sx={{ marginTop: 2 }}>{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Notification;
