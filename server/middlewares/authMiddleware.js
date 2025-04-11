import  Jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/user.js";
import { jwt_secret } from "../config/config.js";


export const authMiddleware = asyncHandler( async (req, res, next) => {
    let token ;

    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token =  req.headers.authorization.split(" ")[1];

        try {
            if(token) {
                const decoded = Jwt.verify(token,jwt_secret);
                const user = await User.findById(decoded?.id)
                req.user = user;
                next();
            }
        } catch (error) {
            if (error instanceof Jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Token expired. Please log in again." });
            }
            return res.status(401).json({ message: "Not authorized. Invalid token." });
        
        }
    }else{
        throw new Error("there is no token attached to the header.")
    }
})