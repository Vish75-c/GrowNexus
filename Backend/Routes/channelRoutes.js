import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { ChannelMessages, createChannel, getUserChannel } from "../Controllers/ChannelController.js";

const channelRoutes=Router();

channelRoutes.post("/createChannel",verifyToken,createChannel)
channelRoutes.get("/getAllChannel",verifyToken,getUserChannel)
channelRoutes.post("/getChannelMessages",verifyToken,ChannelMessages);
export default channelRoutes;