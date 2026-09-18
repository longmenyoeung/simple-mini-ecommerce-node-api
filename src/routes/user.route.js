import express from "express";
import {
    register,
    deleteUser,
    getlistUser,
    searchUserById,
    updateUser,
    login,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post('/login', login);



userRoute.get("/:userId", searchUserById);
userRoute.get("/", getlistUser);
userRoute.put("/:userId", updateUser);
userRoute.delete("/:userId", deleteUser);

export default userRoute;
