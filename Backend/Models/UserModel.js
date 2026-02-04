import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        required: false,
        default: 0
    },
    profileSetup: {
        type: Boolean,
        default: false
    },
    // Role & Academic Logic
    role:{
        type:String,
        enum:["junior","senior","alumni"],
        default:"junior"
    },
    branch:{
        type:String,
        required:false
    },
    batch:{
        type:Number,
        required:false  //Graduation Year
    },
    // Professional data (Seniors/alumni)
    company:{
        type:String,
        required:false 
    },
    skills:{
        type:[String],
        default:[],
    },
    // Social & bio
    bio:{
        type:String,
        maxlength:250,
        required:false
    },
    linkedinUrl:{
        type:String,
        required:false,
    },
    // Metadata 
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save',async function(){
    const person=this;
    if(!person.isModified("password"))return;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(person.password,salt);
    person.password=hashedPassword;

})

const User=mongoose.model("Users",userSchema);
export default User;