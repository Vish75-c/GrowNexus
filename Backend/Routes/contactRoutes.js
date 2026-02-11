import { Router } from "express";
import { findMentors, getDmContact, searchContacts } from "../Controllers/contactController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const contactRoutes=Router();

contactRoutes.post('/searchContacts',verifyToken,searchContacts);
contactRoutes.get('/getDmContact',verifyToken,getDmContact);
contactRoutes.get('/get-mentors',verifyToken,findMentors)
export default contactRoutes;