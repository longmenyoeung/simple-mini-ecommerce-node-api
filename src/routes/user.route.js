import express from "express";
import {
    createUser,
    deleteUser,
    getlistUser,
    searchUserById,
    updateUser,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/", getlistUser);
userRoute.get("/:userId", searchUserById);
userRoute.post("/", createUser);
userRoute.put("/:userId", updateUser);
userRoute.delete("/:userId", deleteUser);

export default userRoute;
