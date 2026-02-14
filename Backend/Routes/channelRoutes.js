import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createChannel, getUserChannel } from "../Controllers/ChanndelController.js";

const channelRoutes=Router();

channelRoutes.post("/createChannel",verifyToken,createChannel)
channelRoutes.get("/getAllChannel",verifyToken,getUserChannel)
export default channelRoutes;