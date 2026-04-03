import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await user.save();

        const accesstoken = jwt.sign(
            { id: user._id,
                role: user.role
             }, 
            process.env.JWT_SECRET,
             { expiresIn: '10h' }
        );

        // const refreshToken = jwt.sign({
        //     id : user.id
        // }, process.env.JWT_SECRET, 
        // { expiresIn : "7d"}
        // )

        res.cookie("accesstoken", accesstoken);

        res.status(201).json({ 
            success: true,
            message: "User registered successfully",
            accesstoken
        });  
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }
        const token = jwt.sign({

            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '10h' });
        
        res.cookie("token", token)

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

export default {
    registerUser,
    loginUser
};
