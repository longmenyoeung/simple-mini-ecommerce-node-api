import express from "express";
import {
    create,
    destroy,
    filterPriceAsc,
    filterPriceDesc,
    getlistProduct,
    search,
    update,
} from "../controllers/Product.controller.js";
const productRoute = express.Router();

productRoute.get("/", getlistProduct);
productRoute.get("/sort-desc", filterPriceDesc);
productRoute.get("/sort-asc", filterPriceAsc);
productRoute.get("/:id", search);
productRoute.post("/", create);
productRoute.put("/:id", update);
productRoute.delete("/:id", destroy);

export default productRoute;
