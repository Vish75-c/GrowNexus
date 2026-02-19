import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllBlogs,createBlog,getMyBlogs,toggleLike,addComment } from "../Controllers/blogController.js";


const blogRoutes = Router();

// Public/Semi-public feed
blogRoutes.get("/all-blogs", verifyToken, getAllBlogs);

// Personal routes
blogRoutes.post("/create-blog", verifyToken, createBlog);
blogRoutes.get("/my-post", verifyToken, getMyBlogs);

// Interaction routes
blogRoutes.post("/like/:blogId", verifyToken, toggleLike);
blogRoutes.post("/comment/:blogId", verifyToken, addComment);

export default blogRoutes;