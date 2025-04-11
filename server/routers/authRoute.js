import express from "express"
import { 
    blockUser, 
    createUser, 
    deleteUser, 
    forgetPasswordToken, 
    getAllUser, 
    getaUser, 
    loginUser, 
    resetPassword, 
    unBlockUser, 
    updatePassword, 
    updateUser 
} from "../controller/userCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoute = express.Router();

//post
userRoute.post("/register",createUser);
userRoute.post("/login", loginUser);
userRoute.post("/forget-password-token", forgetPasswordToken);
userRoute.post("/password/:id", authMiddleware, updatePassword);

// get 
userRoute.get("/all-users", authMiddleware , getAllUser);
userRoute.get("/:id", authMiddleware, getaUser);

// delete
userRoute.delete("/:id", authMiddleware , deleteUser);

// update
userRoute.put("/:id", authMiddleware, updateUser);
userRoute.put("/block-user/:id", authMiddleware, blockUser);
userRoute.put("/unblock-user/:id", authMiddleware, unBlockUser);
userRoute.put("/reset-password/:token", resetPassword);


export default userRoute;