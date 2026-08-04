import UserModel from "../models/UserModel.js";

const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = await UserModel.create({ name, email, age });

        return res.status(201).json({
            success: true,
            message: "User created.",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message : 'Server interl error',
            error: error.message
        });
    }
}

const getlistUser = async (req, res) => {
    try {
        const users = await UserModel.find({});
        if(users.length === 0) {
            return res.status(400).json({message: 'User is emtpy.'});
        }

        return res.status(200).json({
            success: true,
            message : 'Get list users successfully.',
            total_users : users.length,
            data : users
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

const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {
                new : true,
                runValidators: true
            }
        );

        if(!user) {return res.status(404).json({message: 'User not found.'});}

        return res.status(200).json({
            success: true,
            message: 'User updated successfully.',
            data : user
        });
    } catch (error) {
        return res.status(500).json({message: 'Server internal error', error:error.message});
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
    createUser,
    getlistUser,
    searchUserById,
    updateUser,
    deleteUser
}