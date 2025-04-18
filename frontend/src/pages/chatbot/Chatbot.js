import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChatBubble from "./ChatBubble"; // Assuming you have a ChatBubble component

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyAV1qLGNGLGOdObrh0QvRtxLKJ5TVR6cdU"; // Replace with your actual API key

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    let updatedChat = [...chat, { role: "user", parts: [{ text: userInput }] }];

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: updatedChat }
      );

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        setChat([
          ...updatedChat,
          { role: "model", parts: [{ text: modelResponse }] },
        ]);
        setUserInput("");
      }
    } catch (error) {
      setError("Sorry! I couldn't understand what you said.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="green"
        textAlign="center"
      >
        Need Help!
      </Typography>
      <Typography variant="h6" textAlign="center" sx={{ mt: 1 }}>
        Farming E-Commerce's Chatbot here!
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
          maxHeight: 400,
          mt: 3,
          p: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {chat.map((item, index) => (
          <ChatBubble key={index} role={item.role} text={item.parts[0].text} />
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 2, width: "100%" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={handleUserInput}
          disabled={loading}
        >
          Send
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Chatbot;
