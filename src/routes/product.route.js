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
import authorizeRole from "../middleware/AuthorizeRole.js";
const productRoute = express.Router();

productRoute.get("/", getlistProduct);
productRoute.get("/sort-desc", filterPriceDesc);
productRoute.get("/sort-asc", filterPriceAsc);
productRoute.get("/:id", search);
productRoute.post("/",authorizeRole("admin"), create);
productRoute.put("/:id",authorizeRole("admin"), update);
productRoute.delete("/:id",authorizeRole("admin"), destroy);

export default productRoute;
