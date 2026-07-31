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

export {
    createUser
}