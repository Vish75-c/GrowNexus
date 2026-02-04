import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // console.log(process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_SECRET)
    // console.log(localFilePath, 'visited');
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // console.log('file is uploaded on cloudinary');
    // console.log(response.secure_url);

    // delete temp file after success
    try {
      await fs.unlink(localFilePath);
    } catch {}

    return response;
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    // delete temp file after failure
    try {
      await fs.unlink(localFilePath);
    } catch {}

    return null;
  }
};
