import ProductModel from "../models/ProductModel.js";
import ReviewModel from "../models/ReviewModel.js";
import UserModel from "../models/UserModel.js";

export const createReview = async (req, res) => {
    try {
        const { product_id, user_id, rating, text_comment } = req.body;

        const product = await ProductModel.findById(product_id);
        if (!product) {
            return res.status(400).json({ message: "Make sure product is invalid." });
        }

        const user = await UserModel.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: "Make sure user is invalid." });
        }

        const review = await ReviewModel.create({
            product_id,
            user_id,
            rating,
            text_comment,
        });

        return res.status(201).json({
            success: true,
            message: "Review successfully",
            data: review,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error", error: error.message });
    }
};

export const getlistReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find({})
            .populate({ path: "user_id", select: "name" })
            .populate({
                path: "product_id",
                select: ["name", "category_id", "price"],
            });
        if (reviews.length === 0) {
            return res.status(400).json({ message: "Review is empty.", data: [] });
        }
        return res.status(200).json({
            success: true,
            message: "Get all review on product successfully.",
            data: reviews,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server internal error", error: error.message });
    }
};

export const removeReview = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await ReviewModel.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server internal error",
            error: error.message,
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { product_id, user_id, rating, text_comment } = req.body;

        const validated = {
            product_id,
            rating,
            text_comment,
        };

        const product = await ProductModel.findById(product_id);
        if (!product) {
            return res.status(400).json({ message: "Make sure product is invalid." });
        }

        const review = await ReviewModel.findByIdAndUpdate(
            req.params.id,
            validated,
            {
                new: true,
                runValidators: true,
            },
        );
    } catch (error) {
        return res.status(500).json({
            message: "Server internal error",
            error: error.message,
        });
    }
};
