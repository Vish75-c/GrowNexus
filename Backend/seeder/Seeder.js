import { userData,hiringData ,blogData} from "../data/userData.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../Models/UserModel.js";
import Hiring from "../Models/HiringModel.js";
import Blog from "../Models/BlogModel.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect("mongodb+srv://Vishal:Password%40123@cluster0.pjkngbz.mongodb.net/GrowthNexus?retryWrites=true&w=majority");
        console.log("✅ Mongo Connected");

        // 1. Optional: Clear existing users to avoid duplicate email errors
        console.log("Emptying User Collection...");

        // 2. Use .create() so your password hashing middleware actually runs!
        // await User.create(userData);
        await Hiring.create(hiringData);
        await Blog.create(blogData);
        console.log("🚀 15 Users Inserted & Passwords Hashed");

        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
}

seedData();