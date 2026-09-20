import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";


export const create = async (req, res) => {
    try {
        const {name, description} = req.body;

        const categoryExisted = await CategoryModel.findOne({name});
        if(categoryExisted){return res.status(400).json({message: "Category name already existed."})}

        const category = await CategoryModel.create({name, description});

        return res.status(201).json({
            succcess: true, 
            message: "Category created successfully.",
            category : category
        });

    } catch (error) {
        return res.json(error.message)
    }
}


export const getlist = async (req, res) => {
    try {

        const {sort, search, isActive} = req.query;
        let query = {};
        let sortOption = {};

        //Sort newest and oldest
        if(sort === "newest"){
            sortOption = {createdAt : - 1}
        }
        if(sort === "oldest"){
            sortOption = {createdAt : 1}
        }

        //Search
        if(search){
            query.name = {$regex:search, $options:"i"}
        }

        //find isActive
        if(isActive === "true"){
            query.isActive = true;
        }

       const page = parseInt(req.query.page) || 1;
       const limit = parseInt(req.query.limit) || 10;
       const category = await CategoryModel.paginate(
        query,
        {
            sort:sortOption,
            page,
            limit
        }
       );

       return res.status(200).json({
            success: true,
            ...category
       })
    } catch (error) {
        return res.json(error.message);
    }
}


export const update = async (req, res) => {
    try {
        const {name, description, isActive}  = req.body;
        const {id} = req.params;
        const validated = {name, description, isActive};


        if(!mongoose.Types.ObjectId.isValid(id)){return res.status(400).json({message: "Invalid ID format."})}

        const category = await CategoryModel.findOne({name:validated.name});
        if(category) {return res.status(400).json({message: "Category name already existed."})}


        const result = await CategoryModel.findByIdAndUpdate(
            id,
            validated,
            {
                new : true,
                runValidators : true
            }
        );
        if(!result) {return res.status(404).json({message: 'Category not found.'})}


        return res.status(200).json({
            success: true,
            message :' Category updated successfully.',
            data : result
        })
    } catch (error) {
        return res.json(error.message);
    }
}

export const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        const productCount = await ProductModel.countDocuments({category_id:id});
        
        if(productCount > 0 ){
            return res.status(400).json({
                success: false,
                message: "You cannot delete category, because product are using it."
            })
        }

        const result = await CategoryModel.findByIdAndDelete(id);
        
        if(!result){return res.status(404).json({message: 'Category not found.'})}

        res.status(200).json({
            success: true,
            message:' Category deleted successfully.',
            data : result
        });

    } catch (error) {
        return res.json(error.message);
    }
}