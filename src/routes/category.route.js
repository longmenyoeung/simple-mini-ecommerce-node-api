import express from "express";
import { create, destroy, getlist, update } from "../controllers/category.controller.js";
import authorizeRole from "../middleware/AuthorizeRole.js";
import upload from "../middleware/Upload.js";
const categoryRoute = express.Router();

categoryRoute.get('/', getlist);
categoryRoute.post('/',authorizeRole("admin"), upload.single('avata'), create);
categoryRoute.put('/:id',authorizeRole("admin"), update);
categoryRoute.delete('/:id',authorizeRole("admin"), destroy);


export default categoryRoute;