import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";


const register = async (req, res, next) => {
    try {
        const { name, email, password, role} = req.body;
        
        const existed = await UserModel.findOne({email});
        if(existed){
            throw new ApiError(400, "email is already existed.");
        }

        //can create only admin
        if(role === "admin"){
            const adminExitsted = await UserModel.findOne({role:"admin"});
            if(adminExitsted){throw new ApiError(400, "Something went wrong. please try again.")}
        }

        
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password:passwordHashed ,role});

        const userRespone = user.toObject();
        delete userRespone.password;
        delete userRespone.role;

        return res.status(201).json({
            success: true,
            message: "User created.",
            data: userRespone
        });

    } catch (error) {
        next(error);
    }
}

const login = async (req, res,next) => {
    try {

        const {email, password} = req.body;

        //find email
        const user = await UserModel.findOne({email});
        if(!user){throw new ApiError(400, "Email or password incorrect.")}

        //comparing password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){throw new ApiError(400, "Email or password incorrect.")}

        //if account isActive : false
        const accountIsActive = await UserModel.findOne({isActive:false});
        if(accountIsActive){throw new ApiError(400, "Account has been deactivated. please contact to support.")}

        //generate token
        const accessToken = jwt.sign(
            {
                sub:user._id,
                email:user.email
            },

            process.env.SECRET_JWT,
            {
                expiresIn: '1h'
            }
        )

        return res.status(200).json({
            success: true,
            token: accessToken
        })
        
    } catch (error) {
        next(error);
    }
}

const getlistUser = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const  users = await UserModel.paginate(
            {},
            {
                page,
                limit,
                select: "-password -role"
            }
        )


        return res.status(200).json({
            success: true,
            ...users
        });

    } catch (error) {
        next(error);
    }
}

const searchUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if(!user) {throw new ApiError(404, "User not found.")}

        return res.status(200).json({
            success: true,
            message: 'User found.',
            data: user
        })
    } catch (error) {
        next(error);
    }
}

const updateCurrectUser = async (req, res, next) => {
    try {

        const {name, email, password, profile} = req.body;
        const validated = {name, email, password, profile};
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if(!user){throw new ApiError(404, "User not found.")}

        if(user._id.toString() === req.user._id.toString() || req.user.role === 'admin'){

            const existed = await UserModel.findOne({email});
            if(existed){throw new ApiError(400, "Email already existed")}

            const updateUser = await UserModel.findByIdAndUpdate(
                userId,validated,{
                    new:true,
                    runValidators: true
                }
            )

            const respone  = updateUser.toObject();
            delete respone.password;
            delete respone.role;

            return res.status(200).json({
                success: true,
                message: "User updated successfully.",
                user:respone
            })

        }else{
            throw new ApiError(403, "Forbidden: You are not owner of this account.")
        }


    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
   try {
        const userId = req.params.userId;
        
        //1.checking ID format.
        if(!mongoose.Types.ObjectId.isValid(userId)){throw new ApiError(400, "Invalid ID format provided.")}

        //2.finding user
        const user = await UserModel.findById(userId)

        //3.checking whether the user is found or not.
        if(!user){throw new ApiError(404, "User not found.")}

        //4. check authorize before modify db
        const isOwner = user._id.toString() === req.user._id.toString();
        const isAdmin = req.user.role === "admin";

        if(!isOwner && !isAdmin) {
            throw new ApiError(403, "Forbidden: You are not allowed delete this account.")
        }

        //soft delete
        user.isActive = false,
        await user.save();

        //hidden role and pass
        const respone = user.toObject();
        delete respone.password;
        delete respone.role;

        return res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            user: respone._id
        });

   } catch (error) {
        next(error);
   }
    
}

export {
    register,
    login,
    getlistUser,
    searchUserById,
    updateCurrectUser,
    deleteUser
}