import express from "express";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import bcrypt from "bcrypt"
dotenv.config();
const jwtMaxAge = 3 * 24 * 60 * 60
const cookieMaxAge=jwtMaxAge*1000;
const generateToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: jwtMaxAge })
};

// Signup 
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email," ",password);
    
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
        const response=await User.findOne({email:email})
        if (!response) {
            return res.status(401).send("Error while creating user");
        }
        const isMatch=await bcrypt.compare(password,response.password)
        if(!isMatch){
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