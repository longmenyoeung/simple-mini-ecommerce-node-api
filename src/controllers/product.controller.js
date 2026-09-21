import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import ApiError from "../utils/ApiError.js";

export const getlistProduct = async (req, res, next) => {
    try {
        
        const {sort,search} = req.query;
        const query= {};
        let sortOption= {};

        //sort price by desc and asc
        if(sort === 'price_desc'){
            sortOption = {price : -1}
        }
        if(sort === 'price_asc'){
            sortOption = {price: 1}
        }

        //Filter product newest or oldest
        if(sort === "newest"){
            sortOption = {createdAt: -1}
        }
        if(sort === "oldest"){
            sortOption = {createdAt: 1}
        }

        //filter exactly price
        const price = Number(req.query.price);
        if(price){ query.price = price};

        //filter rang price 
        const price_from = Number(req.query.price_from);
        const price_to = Number(req.query.price_to);
        if(price_from && price_to){
            query.price = {
                $gt: price_from,
                $lt: price_to
            }
        }

        //filter exactly stock
        if(req.query.isStock === "true") {
            query.stock = {$gt:0}
        }
        //Search name
        if(search){
            query.name = {
                $regex: search,
                $options: "i"
            }
        }

        //page and limit 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;


        const products = await ProductModel.paginate(
            query,
            {
                page,
                limit,
                sort:sortOption,
                populate:{path: "category_id", select: "name"}
            }
        )

        return res.status(200).json({
            success: true,
            ...products
        });

    } catch (error) {
        next(error)
    }
};

export const create = async (req, res, next) => {
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
            throw new ApiError(400, "Select invalid category.");
        }

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};


export const update = async (req, res, next) => {
    try {
        const { name, category_id, description, price, stock } = req.body;
        const validated = { name, category_id, description, price, stock };

        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            validated,
            { new: true, runValidators: true },
        ).populate({path:'category_id', select:'name'});
        if (!product) {
            throw new ApiError(404, 'Product not found.')
        }

        const category = await CategoryModel.findById(category_id);
        if (!category) {
            throw new ApiError(404, "Category not found.")
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

export const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            throw new ApiError(404, "Product not found.")
        }

        return res.status(200).json({
            succcess: true,
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        next(error)
    }
};


