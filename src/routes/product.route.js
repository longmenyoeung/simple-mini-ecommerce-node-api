import express from "express";
import {
    create,
    destroy,
    getlistProduct,
    update,
} from "../controllers/product.controller.js";
import authorizeRole from "../middleware/AuthorizeRole.js";
import upload from "../middleware/Upload.js";
import { productValidate } from "../validator/product.validate.js";
const productRoute = express.Router();

productRoute.get("/", getlistProduct);
productRoute.post("/",authorizeRole("admin"),productValidate, upload.array("images", 5), create);
productRoute.put("/:id",authorizeRole("admin"), productValidate, upload.array("images", 5), update);
productRoute.delete("/:id",authorizeRole("admin"), destroy);

export default productRoute; 
