import Blog from "../Models/BlogModel.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// 1. Create a New Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    let bannerImageUrl = "";

    // if file exists
    if (req.file) {
      const localFilePath = req.file.path;
      console.log(localFilePath, "visited");
      const cloudResult = await uploadOnCloudinary(localFilePath);

      if (!cloudResult) {
        return res.status(500).json({ ok: false, message: "Upload failed" });
      }

      bannerImageUrl = cloudResult.url;
    }

    const newBlog = await Blog.create({
      title,
      content,
      bannerImage: bannerImageUrl, // save cloudinary url
      tags: tags ? JSON.parse(tags) : [],
      author: req.user,
    });
    console.log(newBlog);
    res.status(200).json({ blog: newBlog });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user }).populate("author", "firstName lastName image role")
      .populate("comments.user", "firstName lastName image").sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching your blogs", error });
  }
};

//  Get All Blogs (with Sorting)
export const getAllBlogs = async (req, res) => {
  try {
    const { sort } = req.query;
    // Latest = -1 (Descending), Oldest = 1 (Ascending)
    const sortOrder = sort === "oldest" ? 1 : -1;

    const blogs = await Blog.find()
      .populate("author", "firstName lastName image role")
      .populate("comments.user", "firstName lastName image")
      .sort({ createdAt: sortOrder });
    console.log(blogs);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// DashBoard Blog
export const DashboardBlog = async (req, res) => {
  try {
    const blog = await Blog.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" }
        }
      },
      {
        $sort: { likesCount: -1 } // descending
      },
      {
        $limit: 1
      }
    ]);
    await Blog.populate(blog, {
      path: "author",
      select: "firstName lastName image role"
    });
    console.log(blog);
    return res.status(200).json({ blog })
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}


// 4. Toggle Like (Add or Remove)
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user?.toString();
    if (!userId) {
      return res.status(400).json({ message: "User not found in request" });
    }

    // Remove null values first
    blog.likes = blog.likes.filter(id => id != null);

    const alreadyLiked = blog.likes.some(
      id => id.toString() === userId
    );

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        id => id.toString() !== userId
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({ likes: blog.likes });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking blog" });
  }
};
// 5. Post a Comment
export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;

    const blog = await Blog.findById(blogId);
    blog.comments.push({ user: req.user, text });

    await blog.save();

    // Return the updated blog with populated users for the UI
    const updatedBlog = await Blog.findById(blogId).populate("comments.user", "firstName lastName image");
    res.status(200).json({ comments: updatedBlog.comments });
  } catch (error) {
    res.status(500).json({ message: "Error posting comment" });
  }
};