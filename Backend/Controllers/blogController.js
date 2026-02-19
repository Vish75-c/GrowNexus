import Blog from "../Models/BlogModel.js";
import mongoose from "mongoose";
// 1. Create a New Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, bannerImage, tags } = req.body;
    const newBlog = await Blog.create({
      title,
      content,
      bannerImage,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      author: req.userId, // Provided by your Auth Middleware
    });
    res.status(201).json({ blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// 2. Get All Blogs (with Sorting)
export const getAllBlogs = async (req, res) => {
  try {
    const { sort } = req.query; 
    // Latest = -1 (Descending), Oldest = 1 (Ascending)
    const sortOrder = sort === "oldest" ? 1 : -1;

    const blogs = await Blog.find()
      .populate("author", "firstName lastName image role")
      .populate("comments.user", "firstName lastName image")
      .sort({ createdAt: sortOrder });

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// 3. Get User's Own Blogs
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId })
      .sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching your blogs", error });
  }
};

// 4. Toggle Like (Add or Remove)
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    
    if (blog.likes.includes(req.userId)) {
      // Unlike
      blog.likes = blog.likes.filter(id => id.toString() !== req.userId);
    } else {
      // Like
      blog.likes.push(req.userId);
    }
    
    await blog.save();
    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Error liking blog" });
  }
};

// 5. Post a Comment
export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;

    const blog = await Blog.findById(blogId);
    blog.comments.push({ user: req.userId, text });
    
    await blog.save();
    
    // Return the updated blog with populated users for the UI
    const updatedBlog = await Blog.findById(blogId).populate("comments.user", "firstName lastName image");
    res.status(200).json({ comments: updatedBlog.comments });
  } catch (error) {
    res.status(500).json({ message: "Error posting comment" });
  }
};