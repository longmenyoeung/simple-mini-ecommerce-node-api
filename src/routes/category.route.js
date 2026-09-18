import express from "express";
import { create, destroy, getlist, search, update } from "../controllers/category.controller.js";
import authorizeRole from "../middleware/AuthorizeRole.js";
const categoryRoute = express.Router();

categoryRoute.get('/', getlist);
categoryRoute.get('/:id', search);
categoryRoute.post('/',authorizeRole("admin"), create);
categoryRoute.put('/:id',authorizeRole("admin"), update);
categoryRoute.delete('/:id',authorizeRole("admin"), destroy);


export default categoryRoute;