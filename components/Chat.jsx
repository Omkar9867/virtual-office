"use client";
import React, { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket("ws://localhost:5000");

    wsRef.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prev) => [...prev, message]);
    };

    wsRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const message = { content: input };
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(message));
        setMessages((prev) => [...prev, message]);
        setInput("");
      } else {
        console.error("WebSocket is not open");
      }
    }
  };
  return (
    <div>
      <div className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index}>{msg.content}</div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
