import { useAppStore } from "@/store";
import { HOST } from "@/utils/Constant";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (!userInfo) return;

    // Create Socket Instance
    const s = io(HOST, {
      withCredentials: true,
      transports: ["websocket", "polling"], // Essential for mobile
      auth: { userId: userInfo._id },
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socketRef.current = s;
    setSocket(s);

    // --- Mobile Optimization: Heartbeat ---
    const heartbeat = setInterval(() => {
      if (s.connected) {
        s.emit("heartbeat", userInfo._id);
      }
    }, 15000); // Ping every 15s to keep connection alive

    s.on("connect", () => console.log("Connected to Socket Server"));
    s.on("connect_error", (err) => console.log("Socket Error:", err.message));

    // Message Handlers
    const handleReceiveMessage = (message) => {
      const store = useAppStore.getState();
      if (
        store.selectedChatType &&
        store.selectedChatData &&
        (store.selectedChatData._id === message.sender?._id ||
          store.selectedChatData._id === message.recipient?._id)
      ) {
        store.addMessage(message);
      }
    };

    const handleRecieveChannelMessage = (message) => {
      const { selectedChatData, addMessage } = useAppStore.getState();
      if (selectedChatData && selectedChatData._id === message.channelId) {
        addMessage(message);
      }
    };

    s.on("receiveMessage", handleReceiveMessage);
    s.on("recieve-channel-message", handleRecieveChannelMessage);

    return () => {
      clearInterval(heartbeat);
      s.off("receiveMessage", handleReceiveMessage);
      s.off("recieve-channel-message", handleRecieveChannelMessage);
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};