import {body, param} from 'express-validator';
import  validate  from '../middleware/Validate.js';

//create and update
export const productValidate = [
    body('name')
    .trim()
    .notEmpty().withMessage("Product is required.")
    .isLength({min : 3}).withMessage("Product name must be at least 3 characters.")
    .isLength({max:100}).withMessage("Product name must be at most 100 characters."),
    body('category_id')
    .isMongoId()
    .notEmpty().withMessage("Category is required."),
    body('price')
    .notEmpty().withMessage("Price is required.")
    .isFloat({gt: 0}).withMessage("Price must be a positive number."),
    body('stock')
    .notEmpty().withMessage("Stock is required.")
    .isInt({gt: 0}).withMessage("Stock must be a positive integer."),
    body('description')
    .optional()
    .trim()
    .isLength({max:500}).withMessage("Description must be at most 500 characters."),
    body('images')
    .optional()
    .isArray().withMessage("Images must be an array.")
    .isLength({max: 5}).withMessage("Images must be at most 5."),
    body('images.*')
    .optional()
    .isString().withMessage("Image must be a string."),
    validate
]


// delete
export const deleteProductValidate = [
    param('id')
    .isMongoId()
    .notEmpty().withMessage("Product ID is required."),
    validate
]
