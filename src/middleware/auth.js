
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateToken = async (req, res, next) => {


    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ success : false, message: "Unauthorized the token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({ success : false, message: "Invalid credentials" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ success : false, message: "Invalid token" });
    }
};

export default authenticateToken;

