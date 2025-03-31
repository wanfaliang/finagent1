import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/profile", {
          params: { username: username || "testuser" }, // Fallback to testuser if empty
        });
        const profile = response.data;
        setUsername(profile.username);
        setEmail(profile.email);
        setEmailNotifications(profile.email_notifications);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      await axios.put("http://localhost:8000/auth/update_profile", {
        username: username || "testuser",
        email: email,
        email_notifications: emailNotifications,
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <Card sx={{ padding: 2, margin: "20px", maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5">User Profile</Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          disabled
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          }
          label="Email Notifications"
        />
        <Button variant="contained" onClick={updateProfile} sx={{ marginTop: 2 }}>
          Update Profile
        </Button>
        {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
