import mongoose from "mongoose";

const hiringSchema = new mongoose.Schema({
  company: { type: String, required: true },
  companyDiscription: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: "Remote", required: true },
  duration: { type: String, required: true },
  stipend: { type: String, required: true },
  requirements: { type: String, required: true },
  // Added the applyLink field
  applyLink: { type: String, required: true }, 
  // Important: Must be a Date type for TTL to work
  deadline: { 
    type: Date, 
    required: true 
  },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users", 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
});

// TTL Index: Deletes the document exactly at the deadline
hiringSchema.index({ deadline: 1 }, { expireAfterSeconds: 0 });

const Hiring = mongoose.model("Hiring", hiringSchema);
export default Hiring;