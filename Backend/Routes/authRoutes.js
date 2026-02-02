import { Router } from "express";
import { getUserInfo, login,signup } from "../Controllers/authController.js";
const authRoutes=Router();

authRoutes.post('/signup',signup)
authRoutes.post('/login',login);
authRoutes.get('/userInfo',getUserInfo);
export default authRoutes;