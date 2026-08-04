import CategoryModel from "../models/CategoryModel.js";


export const create = async (req, res) => {
    try {
        const {name} = req.body;

        const category = new CategoryModel({name});
        await category.save();

        return res.status(201).json({
            success : true,
            message: 'Category created successfully.',
            data : category
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server internal error',
        });
    }
}

export const getlist = async (req, res) => {
    try {
        const result = await CategoryModel.find({});
        if(result.length === 0) {return res.status(400).json({message: 'Category is empty.'})}
        return res.status(200).json({
            success: true,
            message : 'Get all list categories',
            total_categories: result.length,
            data: result
        });
    } catch (error) {
        return res.status(500).json({message: 'Server internal error', error: error.message});
    }
}

export const search = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await CategoryModel.findById(id);

        if(!result) {return res.status(404).json({message: 'Category not found.'})}

        return res.status(200).json({
            success : true,
            message: 'Category found.',
            data : result
        });

    } catch (error) {
        return res.status(500).json({message: 'Server internal error', error: error.message});
    }
}

export const update = async (req, res) => {
    try {
        const result = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
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
        return res.status(500).json({
            message: ' Server internal error',
            error: error.message
        });
    }
}

export const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await CategoryModel.findByIdAndDelete(id);
        
        if(!result){return res.status(404).json({message: 'Category not found.'})}

        res.status(200).json({
            success: true,
            message:' Category deleted successfully.',
            data : result
        });

    } catch (error) {
        return res.status(500).json({message: 'Server internal error'});
    }
}