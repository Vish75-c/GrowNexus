import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getUserInfo, login,signup } from "../Controllers/authController.js";
const authRoutes=Router();

authRoutes.post('/signup',signup)
authRoutes.post('/login',login);
authRoutes.get('/userInfo',verifyToken,getUserInfo);
export default authRoutes;