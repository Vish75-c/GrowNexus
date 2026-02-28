import { Server as SocketIOServer } from "socket.io";
import Message from "./Models/MessageModel.js";
import Channel from "./Models/ChannelModel.js";

export const SetupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: [
        "https://grow-nexus.vercel.app",
        "http://localhost:3002",
      ],
      // origin:process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["polling", "websocket"],
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  // userId -> Set(socketIds)
  const userSocketMap = new Map();

  const addSocket = (userId, socketId) => {
    const sockets = userSocketMap.get(userId) || new Set();
    sockets.add(socketId);
    userSocketMap.set(userId, sockets);
  };

  const removeSocket = (socketId) => {
    for (const [userId, sockets] of userSocketMap.entries()) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);
        if (sockets.size === 0) userSocketMap.delete(userId);
        break;
      }
    }
  };

  const getUserSockets = (userId) => {
    return Array.from(userSocketMap.get(userId) || []);
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId;

    if (userId) {
      addSocket(userId.toString(), socket.id);
      console.log(`User ${userId} connected: ${socket.id}`);
    }

    // ---------------- PRIVATE MESSAGE ----------------
    socket.on("sendMessage", async (message) => {
      try {
        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage._id)
          .populate("sender", "id email firstName image color")
          .populate("recipient", "id email firstName lastName image color");

        const senderSockets = getUserSockets(message.sender);
        const recipientSockets = getUserSockets(message.recipient);

        [...senderSockets, ...recipientSockets].forEach((sockId) => {
          io.to(sockId).emit("receiveMessage", messageData);
        });

      } catch (err) {
        console.error("Message send error:", err);
      }
    });

    // ---------------- CHANNEL MESSAGE ----------------
    socket.on("send-channel-message", async (message) => {
      try {
        const { channelId, sender, content, messageType, fileUrl } = message;

        const createdMessage = await Message.create({
          sender,
          recipient: null,
          content,
          messageType,
          timestamp: new Date(),
          fileUrl,
        });

        const messageData = await Message.findById(createdMessage._id)
          .populate("sender", "id email firstName lastName image color");

        await Channel.findByIdAndUpdate(channelId, {
          $push: { messages: createdMessage._id },
        });

        const channel = await Channel.findById(channelId).populate("members admin");

        const finalData = {
          ...messageData._doc,
          channelId: channel._id,
        };

        const allMembers = [...channel.members, channel.admin];

        allMembers.forEach((member) => {
          getUserSockets(member._id.toString()).forEach((sockId) => {
            io.to(sockId).emit("recieve-channel-message", finalData);
          });
        });

      } catch (err) {
        console.error("Channel message error:", err);
      }
    });

    socket.on("disconnect", () => {
      removeSocket(socket.id);
      console.log("Socket disconnected:", socket.id);
    });
  });
};