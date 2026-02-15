import mongoose from "mongoose";

const hiringSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: "Remote" },
  duration: { type: String },
  stipend: { type: String },
  rawDescription: { type: String },
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