import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";

export const getlistProduct = async (req, res) => {
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
        const stock = Number(req.query.stock);
        if(stock) query.stock = stock;

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
        return res.json(error.message)
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


