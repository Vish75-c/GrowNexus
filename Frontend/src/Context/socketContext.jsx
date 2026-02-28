import { useAppStore } from "@/store";
import { HOST } from "@/utils/Constant";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { userInfo } = useAppStore();
  const socketRef = useRef(null);
  const emitQueue = useRef([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userInfo?._id) return;

    const s = io(HOST, {
      withCredentials: true,
      transports: ["polling", "websocket"], // important for mobile
      auth: { userId: userInfo._id },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = s;
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Connected:", s.id);

      // flush queued emits
      emitQueue.current.forEach(({ event, data, resolve }) => {
        s.emit(event, data, resolve);
      });
      emitQueue.current = [];
    });

    s.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    s.on("connect_error", (err) => {
      console.log("⚠️ Socket Error:", err.message);
    });

    const handleReceiveMessage = (message) => {
      const store = useAppStore.getState();

      if (
        store.selectedChatData &&
        (store.selectedChatData._id === message.sender?._id ||
          store.selectedChatData._id === message.recipient?._id)
      ) {
        store.addMessage(message);
      }
    };

    const handleReceiveChannelMessage = (message) => {
      const { selectedChatData, addMessage } = useAppStore.getState();
      if (selectedChatData?._id === message.channelId) {
        addMessage(message);
      }
    };

    s.on("receiveMessage", handleReceiveMessage);
    s.on("recieve-channel-message", handleReceiveChannelMessage);

    return () => {
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
      emitQueue.current = [];
    };
  }, [userInfo]);

  const safeEmit = (event, data) => {
    const s = socketRef.current;

    return new Promise((resolve) => {
      if (s && s.connected) {
        s.emit(event, data, resolve);
      } else {
        emitQueue.current.push({ event, data, resolve });
      }
    });
  };

  return (
    <SocketContext.Provider value={{ socket, safeEmit }}>
      {children}
    </SocketContext.Provider>
  );
};