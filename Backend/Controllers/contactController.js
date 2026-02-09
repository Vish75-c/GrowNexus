import User from "../Models/UserModel.js";


export const searchContacts=async (req,res)=>{
    try {
        const {searchTerm}=req.body;
        if(searchTerm===null||searchTerm===undefined){
            return res.status(400).send("Search Term is Required")
        }
        const sanitizedSearchTerm=searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,"\\$&"
        );
        const regex=new RegExp(sanitizedSearchTerm,'i');
        const contacts=await User.find({
            $and:[
                {_id:{$ne:req.user}},
                {
                    $or:[{firstName:regex},{lastName:regex},{email:regex}]
                }
            ]
        })
        return res.status(200).json({contacts});
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}