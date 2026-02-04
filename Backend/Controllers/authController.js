import express from "express";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import fs from 'fs/promises'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
dotenv.config();
const jwtMaxAge = 3 * 24 * 60 * 60
const cookieMaxAge = jwtMaxAge * 1000;
const generateToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: jwtMaxAge })
};

// Signup 
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, " ", password);

        if (!email || !password) return res.status(400).send("Email and Password Required")
        const user = new User({ email, password });

        const response = await user.save();
        if (!response) {
            return res.status(401).send("Error while creating user");
        }
        res.cookie("jwt", generateToken(email, response._id), {
            maxAge: cookieMaxAge,
            httpOnly: true,
            secure: false,
            sameSite: "Lax"
        })
        return res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}

// ---Login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Email and Password Required")
        const response = await User.findOne({ email: email })
        if (!response) {
            return res.status(401).send("Error while creating user");
        }
        const isMatch = await bcrypt.compare(password, response.password)
        if (!isMatch) {
            return res.status(401).send("Entered wrong password");
        }
        res.cookie("jwt", generateToken(email, response._id), {
            maxAge: cookieMaxAge,
            httpOnly: true,
            secure: false,
            sameSite: "Lax"
        })
        return res.status(201).json(response);
    } catch (error) {
        res.status(500).send("Server error");
    }
}

// Get user Info via JWT

export const getUserInfo = async (req, res) => {
    try {
        const id = req.user;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).send("Server error");
    }
}
// Update or save the user info
export const saveUserImage = async (req, res) => {
    try {
        const id=req.user;
        if (!req.file) {
            return res.status(400).json({ ok: false, message: 'No file uploaded. Use field name "image".' });
        }

        const localFilePath = req.file.path;

        const cloudResult = await uploadOnCloudinary(localFilePath);
        console.log(cloudResult);
        if (!cloudResult) {
            return res.status(500).json({ ok: false, message: 'Upload failed' });
        }
        const { secure_url: url = cloudResult.url, public_id } = cloudResult;
        const user=await User.findByIdAndUpdate(
            {_id:id},{image:url}
        )
        // console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        console.error('uploadAvatar error:', error);
        return res.status(500).json({ ok: false, message: error.message || 'Internal server error' });
    } finally {
        // ensure local file removed if it still exists (uploadOnCloudinary already tries to remove it)
        try {
            if (req.file && req.file.path) {
                await fs.unlink(req.file.path).catch(() => { });
            }
        } catch (e) {
            /* ignore cleanup error */
        }
    }
};
// update the user Information 
export const saveUserInfo = async (req, res) => {
    try {
        const id = req.user;
        const { firstName, lastName, company, branch, role, batch, bio, linkedinUrl, skills, color } = req.body
        // console.log(req.body);
    
        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                firstName,
                lastName,
                company,
                branch,
                role,
                batch,
                bio,
                linkedinUrl,
                skills,
                color,
                profileSetup: true
            },
            { new: true, runValidators: true }
        );
        // console.log(user, 'visited');
        if (!user) return res.status(400).send("Update failed");
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).send("server error");
    }
}