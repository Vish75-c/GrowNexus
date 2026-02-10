import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./db.js";
import authRoutes from "./Routes/authRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import { SetupSocket } from "./Socket.js";
import messageRoute from "./Routes/messageRoute.js";
dotenv.config();
const port=process.env.PORT||3003
const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
})) 
app.use(cookieParser());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.use('/api/auth',authRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/message',messageRoute)
const server=app.listen(port,()=>{
    console.log(`Server is Running at port ${port}`);
})
SetupSocket(server);