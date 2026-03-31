import React, { useState, useRef, useEffect } from "react";
import apiClient from "@/lib/apiClient";
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Connect to your RAG backend here
      const response = await apiClient.post("/api/rag-chat", { query: input });
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response.data.answer || "I processed your request." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I'm having trouble connecting to the brain." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-xl">💬</span>
        )}
      </button>

      {/* Chat Window Model */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white">
            <h3 className="font-bold text-lg">AI Assistant</h3>
            <p className="text-xs opacity-80">Powered by RAG Model</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-500 p-3 rounded-2xl text-xs animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;