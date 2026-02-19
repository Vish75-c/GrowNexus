import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  bannerImage: { type: String, default: "" },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users", // Ensure this matches your User model name
    required: true 
  },
  tags: [{ type: String }],
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users" 
  }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Adding an index for performance on large feeds
blogSchema.index({ createdAt: -1 });

const Blog = mongoose.model("Blogs", blogSchema);
export default Blog;