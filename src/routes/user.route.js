import express from "express";
import {
    register,
    deleteUser,
    getlistUser,
    searchUserById,
    updateCurrectUser,
    login,
    logout,
} from "../controllers/user.controller.js";
import { authJwt } from "../middleware/AuthMiddleware.js";
import authorizeRole from "../middleware/AuthorizeRole.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post('/login', login);


userRoute.post("/logout",authJwt, logout);
userRoute.get("/:userId",authJwt, searchUserById);
userRoute.get("/",authJwt, getlistUser);
userRoute.put("/:userId",authJwt, updateCurrectUser);
userRoute.delete("/:userId",authJwt, deleteUser);

export default userRoute;
