import { Server as SocketIOServer } from "socket.io";
import Message from "./Models/MessageModel.js";
export const SetupSocket=(server)=>{
    const io=new SocketIOServer(server,{cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }})

    const userSocketMap=new Map();
    const disconnect=(socket)=>{
        console.log(`Client Disconneted: ${socket.id}`);
        for(const[userId,socketId] of userSocketMap.entries()){
            if(socketId===socket.id){
                userSocketMap.delete(userId);break;
            }
        }
    }
    const sendMessage=async (message)=>{
        console.log(message);
        const senderSocketId=userSocketMap.get(message.sender);
        const recipientSocketId=userSocketMap.get(message.recipient);

        const createdMessage=await Message.create(message);
        const messageData=await Message.findById(createdMessage._id).populate("sender","id email firstName image color").populate("recipient","id email firstName lastName image color")

        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage",messageData);
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("receiveMessage",messageData);
        }
        console.log("Completed");
    }
    io.on("connection",(socket)=>{
        const userId=socket.handshake.query.userId;
        if(userId){
            userSocketMap.set(userId,socket.id);
            console.log(`User Connected:${userId} with socket Id:${socket.id}`)
        }else{
            console.log("User id not provided during connection")
        }
        socket.on("sendMessage",sendMessage);
        socket.on("disconnect",()=>disconnect(socket));
    })
}