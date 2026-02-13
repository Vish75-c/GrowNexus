import Message from "../Models/MessageModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const getMessage=async (req,res)=>{
    try {
        const user1=req.user;
        const user2=req.body._id;
        if(!user1||!user2){
            return res.status(400).send("Both User id is required")
        }
        const messages=await Message.find({
            $or:[
                {sender:user1,recipient:user2},
                {sender:user2,recipient:user1}
            ]
        }).sort({timestamp:1});
        return res.status(200).json({messages});
    } catch (error) {
        return res.status(500).send("Interal Server Error")
    }
}

export const uploadfile=async (req,res)=>{
    try {
       
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
        // console.log(url);
        return res.status(200).json({url});
    } catch (error) {
        return res.status(500).send("Server Error");
    } 
}