import User from "../Models/UserModel.js";
import Message from "../Models/MessageModel.js"
import mongoose from "mongoose";
export const searchContacts = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        if (searchTerm === null || searchTerm === undefined) {
            return res.status(400).send("Search Term is Required")
        }
        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g, "\\$&"
        );
        const regex = new RegExp(sanitizedSearchTerm, 'i');
        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.user } },
                {
                    $or: [{ firstName: regex }, { lastName: regex }, { email: regex }]
                }
            ]
        })
        return res.status(200).json({ contacts });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}


export const getDmContact = async (req, res) => {
    try {
        let userId = req.user;
        // console.log(userId);
        userId = new mongoose.Types.ObjectId(userId);
        // console.log(userId,"visited");
        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                }
            },
            {
                $sort: { timestamp: -1 },
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ['$sender', userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timestamp" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            {
                $unwind: "$contactInfo"
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: '$contactInfo.email',
                    firstName: '$contactInfo.firstName',
                    lastName: '$contactInfo.lastName',
                    image: '$contactInfo.image',
                    color: '$contactInfo.color'
                }
            },
            {
                $sort: { lastMessageTime: -1 },
            },
        ]);
        // console.log(contacts,'Visited');
        return res.status(200).json({ contacts });
    } catch (error) {
        return res.status(500).send("Server error");
    }
}

export const findMentors = async (req, res) => {
  try {
    const userId=req.user;
    const { skills, searchTerm } = req.query;
    console.log(skills,searchTerm);
    // 1. Base query: only find users who can actually be mentors
    let query={
        role:{$in:["alumni","senior"]}
    }
    if(skills){
        let skillsArray=skills.split(",");
        query.skills={$in:skillsArray}
    }
    // 3. Search Term (Name or Company)
    if (searchTerm) {
      query.$or = [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { company: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // 4. Fetch results (excluding sensitive data)
    const contact = await User.find(query)
      .select("firstName lastName role company batch skills bio linkedinUrl image color")
      .sort({ createdAt: -1 });
    //   console.log(mentors);
    const mentors=await contact.filter((contact)=>contact._id.toString()!==userId.toString());
    return res.status(200).json({ mentors });
  } catch (error) {
    console.error("Find Mentors Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};