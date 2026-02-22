import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllBlogs,createBlog,getMyBlogs,toggleLike,addComment, DashboardBlog } from "../Controllers/blogController.js";
import { upload } from "../middleware/multerMiddleware.js";


const blogRoutes = Router();

// Public/Semi-public feed
blogRoutes.get("/all-blogs", verifyToken, getAllBlogs);
blogRoutes.get('/dashboardblog',verifyToken,DashboardBlog);
// Personal routes
blogRoutes.post("/create-blog", verifyToken,upload.single("image"), createBlog);
blogRoutes.get("/my-post", verifyToken, getMyBlogs);

// Interaction routes
blogRoutes.post("/like/:blogId", verifyToken, toggleLike);
blogRoutes.post("/comment/:blogId", verifyToken, addComment);

export default blogRoutes;