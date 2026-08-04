import express from "express";
import { create, destroy, getlist, search, update } from "../controllers/category.controller.js";
const categoryRoute = express.Router();

categoryRoute.get('/', getlist);
categoryRoute.get('/:id', search);
categoryRoute.post('/', create);
categoryRoute.put('/:id', update);
categoryRoute.delete('/:id', destroy);


export default categoryRoute;