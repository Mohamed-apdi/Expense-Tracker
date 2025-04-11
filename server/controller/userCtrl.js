import asyncHandler from "express-async-handler";
import crypto from 'crypto';
import uniqid from "uniqid";
import User from "../model/user.js";
import { validateMongoDbId } from "../utils/validateMongoDbId.js";
import { sendMail } from "./emailCtrl.js";
import { genereteToken } from "../config/jwtToken.js";

// create user
export const createUser = asyncHandler( async (req,res) => {
    const email = req.body;

    const findUser = await User.findOne(email);

    if(!findUser) {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
        }else{
            throw new Error("User Already Exists");
        }
    }
);

// login user with email and password
export const loginUser = async (req,res) => {
        const {email, password} = req.body;

        const findUser = await User.findOne({email});

        if(!findUser) return res.status(400).json({ message: "Invalid Email, please provide a valid email" });


        const isCorrectPassword = await findUser.comparePassword(password);

        if(!isCorrectPassword) return res.status(400).json({ message: "Incorrect password" });

        const isBlocked = await findUser.isBlocked === true;

        if(isBlocked) return res.status(400).json({ message: "You are Blocked." });

        if(findUser && isCorrectPassword && !isBlocked) {
            res.json({
                _id: findUser?._id,
                firstname:findUser?.firstname,
                lastname:findUser?.lastname,
                email:findUser?.email,
                mobile:findUser?.mobile,
                token:genereteToken(findUser?._id),
            })
        }
       
}

// update a user
export const updateUser = asyncHandler( async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,req.body,
            {
                new: true,
            }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error)
    }
})

export const getAllUser = asyncHandler(async (req,res) => {
    
    try {
        const getUser = await User.find();

        res.json(getUser);
        
    } catch (error) {
        throw new Error(error)
    }
});


// get a single user
export const getaUser = asyncHandler( async (req,res) => {
    
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const getaUser = await User.findById(id);

        res.json(getaUser);
        
    } catch (error) {
        throw new Error(error);
    }
})

// delete user
export const deleteUser = asyncHandler( async (req,res) => {
    
    const {id} = req.params;
    validateMongoDbId(id);
    try {

        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
        deleteaUser,
        });
        
    } catch (error) {
        throw new Error(error);
    }
})

// block user
export const blockUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked:true
        },{
            new:true
        });

        res.json({
            message: "User Blocked"
        });
    } catch (error) {
        throw new Error(error)
    }
})

// unblock user

export const unBlockUser = asyncHandler(async (req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked:false
        },{
            new:true
        });

        res.json({
            message: "User unBlocked"
        });

    } catch (error) {
        throw new Error(error)
    }
})

export const updatePassword = asyncHandler( async (req,res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(id)
    try {
        const user = await User.findById(id);
        if(password){
            user.password = password;
            const updatePassword = await user.save();
            res.json(updatePassword);
        }else{
            res.json(user)
        }
    } catch (error) {
        throw new Error(error)
    } 
})

export const forgetPasswordToken = asyncHandler( async (req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email}); 
    if(!user) throw new Error("user not found with this email");
    try {
        const token = await user.createResetPasswordToken();
        await user.save();
        const resetUrl = `Hi, please follow this link to reset your password. so This link is valid till 10 minutes from now. <a href='http://localhost:5173/reset-password/${token}'>Click here</a>`;
        const data = {
            to:email,
            text:"hey, User have nice day💖✌️",
            subject:"Forget Password Link",
            html:resetUrl,
        };
        sendMail(data);

        res.json(token);
    } catch (error) {
        throw new Error(error)
    }
});



export const resetPassword = asyncHandler( async (req,res) => {
    const {password} = req.body;
    const { token } = req.params;
    const hasheToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken:hasheToken,
        passwordExpires:{$gt: Date.now()},
        
    });
    if(!user) throw new Error('Token Expired, please try again later.');
    user.password = password;
    user.passwordResetToken= undefined;
    user.passwordExpires = undefined;
    await user.save();
    res.json(user);
    
})

export const getWishlist = asyncHandler( async (req,res) => {
    const {id} = req.user;

    try {
        const findUser = await User.findById(id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error)
    }
})