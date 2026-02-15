import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { parseHiringText,createHiringPost } from "../Controllers/hiringController.js";
const hiringRoutes = Router();

// Route for AI processing
hiringRoutes.post("/analyze", parseHiringText);

// Route for saving to DB
hiringRoutes.post("/create", verifyToken, createHiringPost);

export default hiringRoutes;