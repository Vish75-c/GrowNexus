import Channel from "../Models/ChannelModel.js";
import User from "../Models/UserModel.js";

export const createChannel=async (req,res)=>{
    try {
        const {name,members}=req.body;
        const userId=req.user;
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