import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMessage, uploadfile } from "../Controllers/messageController.js";
import { upload } from "../middleware/multerMiddleware.js";

const messageRoute=Router();

messageRoute.post('/getMessages',verifyToken,getMessage)
messageRoute.post('/upload-file',verifyToken,upload.single("image"),uploadfile);
export default messageRoute