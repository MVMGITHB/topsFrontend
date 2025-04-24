"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([
        {
          sender: "AI",
          text: `👋 Hi there! Welcome to Top5Shots — your personalized hub to discover the top 5 highlights in any niche! Whether you're a content lover or just exploring, I’m here to help.`,
        },
      ]);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, { sender: "User", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://chatgpt-42.p.rapidapi.com/conversationgpt4-2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
          "x-rapidapi-key": "683231c85amsh6bd252e38aec733p1264f1jsn18008d7d4292",
        },
        body: JSON.stringify({
          messages: [userMessage],
          system_prompt: "",
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256,
          web_access: false,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage}`);
      }

      const data = await response.json();
      if (data) {
        setMessages((prev) => [...prev, { sender: "AI", text: data.result }]);
      } else {
        setMessages((prev) => [...prev, { sender: "AI", text: "Sorry, I didn’t get that." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "AI", text: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "linear-gradient(135deg, #1a1a1a, #4B0082)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "64px",
          height: "64px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.4)",
          cursor: "pointer",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <FiX size={28} /> : <FiMessageCircle size={28} />}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "370px",
            maxHeight: "500px",
            backgroundColor: "#1e1e1e",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
            color: "white",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(to right, #2c003e, #4B0082)",
              padding: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              borderBottom: "1px solid #333",
            }}
          >
            🎯 Top5Shots ChatBot
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "1rem",
              overflowY: "auto",
              backgroundColor: "#1e1e1e",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "User" ? "flex-end" : "flex-start",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    background: msg.sender === "User" ? "#4B0082" : "#2c003e",
                    color: "white",
                    padding: "0.6rem 0.9rem",
                    borderRadius: "12px",
                    maxWidth: "80%",
                    fontSize: "0.95rem",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div
            style={{
              padding: "1rem",
              borderTop: "1px solid #333",
              display: "flex",
              backgroundColor: "#121212",
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                padding: "0.6rem 0.9rem",
                borderRadius: "8px",
                backgroundColor: "#2b2b2b",
                color: "white",
                border: "1px solid #444",
                marginRight: "0.5rem",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                background: "#4B0082",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "0.5rem", color: "#aaa" }}>
              Typing...
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
