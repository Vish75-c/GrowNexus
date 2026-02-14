import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createChannel } from "../Controllers/ChanndelController.js";

const channelRoutes=Router();

channelRoutes.post("/createChannel",verifyToken,createChannel)

export default channelRoutes;