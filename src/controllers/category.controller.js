import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import ApiError from "../utils/ApiError.js";
import { handleUpload } from "../middleware/Upload.js";


export const create = async (req, res, next) => {
    try {
        const {name, description} = req.body;
        
        if(!req.file){
            throw new ApiError(400, "file is required.");
        }

        const categoryExisted = await CategoryModel.findOne({name});
        if(categoryExisted){throw new ApiError(400, "Category name already existed.")}

        
        const uploadedImages = await handleUpload(req.file);
        
        const category = await CategoryModel.create({name, description, avata:uploadedImages.secure_url});

        return res.status(201).json({
            succcess: true, 
            message: "Category created successfully.",
            category : category
        });

    } catch (error) {
        next(error)
    }
}


export const getlist = async (req, res, next) => {
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
        next(error)
    }
}


export const update = async (req, res, next) => {
    try {
        const {name, description, isActive}  = req.body;
        const {id} = req.params;
        const validated = {name, description, isActive};


        if(!mongoose.Types.ObjectId.isValid(id)){throw new ApiError(400, "Invalid ID format provided.")}

        const category = await CategoryModel.findOne({name:validated.name});
        if(category) {throw new ApiError(400, "Category name already existed.")}


        const result = await CategoryModel.findByIdAndUpdate(
            id,
            validated,
            {
                new : true,
                runValidators : true
            }
        );
        if(!result) {throw new ApiError(404, "Category not found")}


        return res.status(200).json({
            success: true,
            message :' Category updated successfully.',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ApiError(400, "Invalid ID format provided.")
        }

        const productCount = await ProductModel.countDocuments({category_id:id});
        
        if(productCount > 0 ){
            throw new ApiError(400, "You cannot delete category, because product are using it.")
        }

        const result = await CategoryModel.findByIdAndDelete(id);
        
        if(!result){ throw new ApiError(404, "Category not found.")}
        
        res.status(200).json({
            success: true,
            message:' Category deleted successfully.',
            data : result
        });

    } catch (error) {
       next(error)
    }
}