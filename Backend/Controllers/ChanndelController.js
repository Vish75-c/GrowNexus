import Channel from "../Models/ChannelModel.js";
import User from "../Models/UserModel.js";
import mongoose from "mongoose";
export const createChannel=async (req,res)=>{
    try {
        const {name,members}=req.body;
        const userId=req.user;
        console.log(name,members)
        const admin=await User.findById(userId);
        if(!admin){
            return res.status(400).send("Admin User not found");
        }
        const validMembers=await User.find({_id:{$in:members}});
        if(validMembers.length!=members.length){
            return res.status(400).send("Some Member are not valid users");
        }
        const newChannel=new Channel({
            name,
            members,
            admin:userId,
        })
        
        await newChannel.save();
        return res.status(200).json({channel:newChannel});
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}

export const getUserChannel=async (req,res)=>{
    try {
        console.log(req.user,"visited");
        const userId=new mongoose.Types.ObjectId(req.user);
        console.log(userId);
        const channel=await Channel.find({
            $or:[{admin:userId},{members:userId}],
        }).sort({updatedAt:-1});
        
        return res.status(200).json({channels:channel});
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}