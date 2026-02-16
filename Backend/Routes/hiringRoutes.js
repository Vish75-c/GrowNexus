import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { parseHiringText,createHiringPost, getAllHiringPost } from "../Controllers/hiringController.js";
const hiringRoutes = Router();

// Route for AI processing
hiringRoutes.post("/analyze",verifyToken, parseHiringText);
hiringRoutes.post("/create", verifyToken, createHiringPost);
hiringRoutes.get("/getHiringpost",verifyToken,getAllHiringPost);
export default hiringRoutes;