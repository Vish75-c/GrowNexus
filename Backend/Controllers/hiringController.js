import Hiring from "../Models/HiringModel.js";
import { analyzeJobDescription } from "../utils/hiringAi.js";

// Step 1: Analyze text via AI
export const parseHiringText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).send("No text provided");

    const extractedData = await analyzeJobDescription(text);
    return res.status(200).json(extractedData);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    return res.status(500).send("AI failed to parse the description");
  }
};

// Step 2: Save the user-confirmed data
export const createHiringPost = async (req, res) => {
  try {
    // Added applyLink to the de-structured body
    const { 
      company, 
      role, 
      location, 
      duration, 
      deadline, 
      stipend, 
      companyDiscription, 
      requirements, 
      applyLink 
    } = req.body;

    // Convert string deadline (YYYY-MM-DD) to JS Date Object for TTL
    const expiryDate = new Date(deadline);

    if (isNaN(expiryDate.getTime())) {
      return res.status(400).send("Invalid deadline date format");
    }

    const newPost = await Hiring.create({
      company,
      role,
      location,
      duration,
      deadline: expiryDate, // MongoDB index watches this
      stipend,
      requirements,
      companyDiscription,
      applyLink, // Saved to DB
      postedBy: req.user, 
    });

    console.log("New Post Created:", newPost._id);
    return res.status(200).json({ newPost });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).send("Failed to create hiring post");
  }
};

export const getAllHiringPost = async (req, res) => {
  try {
    // Populate postedBy to get user details (Junior/Senior/Alumni status)
    const jobs = await Hiring.find().populate("postedBy", "firstName lastName image role");
    
    if (!jobs || jobs.length === 0) return res.status(404).send("No Hiring Post Found");
    
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).send("Server Error");
  }
};