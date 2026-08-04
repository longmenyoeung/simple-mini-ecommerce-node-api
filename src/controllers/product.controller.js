import { data } from "react-router-dom";
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";

export const getlistProduct = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate({
            path: "category_id",
            select: "name",
        });

        if (products.length === 0) {
            return res.status(400).json({ message: "Product is empty", data: [] });
        }

        return res.status(200).json({
            success: true,
            message: "Get all list products successfully.",
            total_products: products.length,
            data: products,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Sever internal error", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { name, category_id, description, price, stock } = req.body;

        const product = await ProductModel.create({
            name,
            category_id,
            description,
            price,
            stock,
        });

        const category = await CategoryModel.findById(category_id);

        if (!category) {
            return res.status(400).json({ message: "Select invalid category." });
        }

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product,
        });
    } catch (error) {
        return res
            .status(500)
            .josn({ message: "Server internal error", error: error.message });
    }
};

export const search = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Product found.",
            data: product,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error.", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { name, category_id, description, price, stock } = req.body;
        const validated = { name, category_id, description, price, stock };

        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            validated,
            { new: true, runValidators: true },
        ).populate({path:'category_id', select:'name'});
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        const category = await CategoryModel.findById(category_id);
        if (!category) {
            return res
                .status(400)
                .json({ message: "Please select invalid category." });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: product,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error", error: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            succcess: true,
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error", error: error.message });
    }
};

export const filterPriceDesc = async (req, res) => {
    try {
        const product = await ProductModel.find().sort({ price: -1 });
        return res.status(200).json({ message: "Product sorted by price desc.", data : product});
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error", error: error.message });
    }
};

export const filterPriceAsc = async (req, res) => {
    try {
        const product = await ProductModel.find().sort({ price: 1 });
        return res.status(200).json({ message: "Product sorted by price asc.", data : product });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error", error: error.message });
    }
};
