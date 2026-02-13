import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    console.log("📂 localFilePath:", localFilePath);

    // 🔥 detect extension
    const ext = localFilePath.split(".").pop().toLowerCase();

    let resourceType = "auto";

    // force raw for pdf/zip
    if (ext === "pdf" || ext === "zip" || ext === "rar") {
      resourceType = "raw";
    }

    console.log("📦 uploading as:", resourceType);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });

    console.log("✅ file uploaded on cloudinary");
    console.log("🔗 secure_url:", response.secure_url);
    console.log("📁 resource_type:", response.resource_type);

    // delete temp file after success
    try {
      await fs.unlink(localFilePath);
      console.log("🗑 temp file deleted");
    } catch (e) {
      console.log("temp delete failed");
    }

    return response;

  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);

    // delete temp file after failure
    try {
      await fs.unlink(localFilePath);
    } catch {}

    return null;
  }
};
