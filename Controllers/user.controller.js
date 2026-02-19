import User from "../Models/user.schema.js";



//Register a New User // SIGN Up User

export const registerUser = async (req,res) =>{
    try {
        const {username,email,password} = req.body;
        const newUser = new User({username,email,password});
        await newUser.save();
        res.status(201).json({message:"User Registration successfully",data:newUser})
    } catch (error) {
        res.status(500).json({message:"User registration failed",error:error.message});
    }
}