import User from "../models/User.js"
import jwt from "jsonwebtoken";

export async function protect (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findByID(decoded.id).select("-password");

            return next();
        } catch (err) {
            console.error("Token Verification Failed: ", err.message);
            return res.status(401).json({message: "Token Failed"})
        }    
    }
    return res.status(401).json({message: "Token Failed"})
}