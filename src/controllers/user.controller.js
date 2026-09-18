import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
        
        const existed = await UserModel.findOne({email});
        if(existed){
            return res.status(400).json({message: "email is already existed."});
        }

        //can create only admin
        if(role === "admin"){
            const adminExitsted = await UserModel.findOne({role:"admin"});
            if(adminExitsted){return res.status(400).json({message: "Something went wrong. please try again."})}
        }

        
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password:passwordHashed ,});

        const userRespone = user.toObject();
        delete userRespone.password;
        delete userRespone.role;

        return res.status(201).json({
            success: true,
            message: "User created.",
            data: userRespone
        });

    } catch (error) {
        return res.status(500).json({
            message : 'Server interl error',
            error: error.message
        });
    }
}


const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        //find email
        const user = await UserModel.findOne({email});
        if(!user){return res.status(404).json({message: "email or passowrd incorrect."})}

        //comparing password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){return res.status(404).json({message: "email or password incorrect."})}

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
        return res.json(error.message);
    }
}


const getlistUser = async (req, res) => {
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
        return res.status(500).json({message: 'Server internal error.',error:error.message});
    }
}

const searchUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if(!user) {return res.status(404).json({message: 'User not found'})}

        return res.status(200).json({
            success: true,
            message: 'User found.',
            data: user
        })
    } catch (error) {
        return res.status(500).json({message: 'Server internal error', error:error.message});
    }
}

const updateCurrectUser = async (req, res) => {
    try {

        const {name, email, password, profile} = req.body;
        const validated = {name, email, password, profile};
        const userId = req.params.userId;
        const user = await UserModel.findById(userId).select('-password');

        if(!user){return res.status(404).json({message:"User not found."})}

        if(user._id.toString() === req.user._id.toString() || req.user.role === 'admin'){


            const existed = await UserModel.findOne({email});
            if(existed){return res.status(400).json({message:"Email already existed."})}

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
            return res.status(403).json({message: "Forbidden: You are not owner of this account."})
        }


    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await UserModel.findByIdAndDelete(userId);

    if(!user) {
        return res.status(404).json({message: 'User not found.'});
    }

    return res.status(200).json({
        success: true,
        message : 'User deleted successfully.',
        data: user
    });
}

export {
    register,
    login,
    getlistUser,
    searchUserById,
    updateCurrectUser,
    deleteUser
}