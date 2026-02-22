import { Router } from "express";
import { DashboardDmContact, dashboardSenior, findMentors, getAllContacts, getDmContact, searchContacts } from "../Controllers/contactController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const contactRoutes=Router();

contactRoutes.post('/searchContacts',verifyToken,searchContacts);
contactRoutes.get('/getDmContact',verifyToken,getDmContact);
contactRoutes.get('/get-mentors',verifyToken,findMentors)
contactRoutes.get('/getAllContact',verifyToken,getAllContacts);
contactRoutes.get('/dashboardsenior',verifyToken,dashboardSenior);
contactRoutes.get('/dashboardcontact',verifyToken,DashboardDmContact)
export default contactRoutes;
