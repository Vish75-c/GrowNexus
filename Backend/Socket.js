import { Server as SocketIOServer } from "socket.io";
import Message from "./Models/MessageModel.js";
import Channel from "./Models/ChannelModel.js";

export const SetupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "https://grow-nexus.vercel.app",
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ["websocket", "polling"], // Keep both for mobile stability
        pingInterval: 10000, // Check connection every 10s
        pingTimeout: 5000,   // Wait 5s for response before timing out
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendChannelMessage = async (message) => {
        const { channelId, sender, content, messageType, fileUrl } = message;
        const createdMessage = await Message.create({ sender, recipient: null, content, messageType, timestamp: new Date(), fileUrl });
        const messageData = await Message.findById(createdMessage._id).populate("sender", "id email firstName lastName image color").exec();

        await Channel.findByIdAndUpdate(channelId, { $push: { messages: createdMessage._id } });
        const channel = await Channel.findById(channelId).populate("members");
        const finalData = { ...messageData._doc, channelId: channel._id };

        if (channel && channel.members) {
            channel.members.forEach((member) => {
                const memberSocketId = userSocketMap.get(member._id.toString());
                if (memberSocketId) {
                    io.to(memberSocketId).emit("recieve-channel-message", finalData);
                }
            });
            // Handle Admin
            const adminSocketId = userSocketMap.get(channel.admin._id.toString());
            if (adminSocketId) io.to(adminSocketId).emit("recieve-channel-message", finalData);
        }
    };

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);
        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName image color")
            .populate("recipient", "id email firstName lastName image color");

        if (recipientSocketId) io.to(recipientSocketId).emit("receiveMessage", messageData);
        if (senderSocketId) io.to(senderSocketId).emit("receiveMessage", messageData);
    };

    io.on("connection", (socket) => {
        const userId = socket.handshake.auth.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User Connected: ${userId} with socket Id: ${socket.id}`);
        }

        // Manual Heartbeat to keep mobile radio active
        socket.on("heartbeat", (userId) => {
            if (userId) userSocketMap.set(userId, socket.id);
        });

        socket.on("sendMessage", sendMessage);
        socket.on("send-channel-message", sendChannelMessage);
        socket.on("disconnect", () => disconnect(socket));
    });
};