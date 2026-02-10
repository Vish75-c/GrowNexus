import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMessage } from "../Controllers/messageController.js";

const messageRoute=Router();

messageRoute.post('/getMessages',verifyToken,getMessage)

export default messageRoute