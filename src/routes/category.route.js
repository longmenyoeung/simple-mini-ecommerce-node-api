import express from "express";
import { create, destroy, getlist, update } from "../controllers/category.controller.js";
import authorizeRole from "../middleware/AuthorizeRole.js";
import upload from "../middleware/Upload.js";
import { categoryValidate, deleteCategoryValidate } from "../validator/category.validate.js";
const categoryRoute = express.Router();

categoryRoute.get('/', getlist);
categoryRoute.post('/',authorizeRole("admin"), categoryValidate,upload.single('avata'), create);
categoryRoute.put('/:id',authorizeRole("admin"),categoryValidate, update);
categoryRoute.delete('/:id',authorizeRole("admin"), deleteCategoryValidate, destroy);


export default categoryRoute;