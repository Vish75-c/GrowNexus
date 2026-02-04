import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getUserInfo, login,saveUserImage,saveUserInfo,signup } from "../Controllers/authController.js";
import { upload } from "../middleware/multerMiddleware.js";
const authRoutes=Router();

authRoutes.post('/signup',signup)
authRoutes.post('/login',login);
authRoutes.get('/userInfo',verifyToken,getUserInfo);
authRoutes.post('/saveUserImage',verifyToken,upload.single('image'),saveUserImage);
authRoutes.post('/saveUserInfo',verifyToken,saveUserInfo);
export default authRoutes;