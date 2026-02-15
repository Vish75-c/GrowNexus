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
    
    const { company, role, location, duration, deadline, stipend, companyDiscription,requirements } = req.body;

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
      postedBy: req.user, 
    });
    console.log(newPost);
    return res.status(200).json({newPost});
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).send("Failed to create hiring post");
  }
};