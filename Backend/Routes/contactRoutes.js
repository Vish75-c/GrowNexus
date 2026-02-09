import { Router } from "express";
import { searchContacts } from "../Controllers/contactController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const contactRoutes=Router();

contactRoutes.post('/searchContacts',verifyToken,searchContacts);

export default contactRoutes;