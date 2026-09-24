import {body, param} from 'express-validator';
import  validate  from '../middleware/Validate.js';

//create and update form form-input at postman
export const productValidate = [
    // input type 'text' in postman
    body('name')
    .trim()
    .notEmpty().withMessage("Product is required.")
    .isLength({min : 3}).withMessage("Product name must be at least 3 characters.")
    .isLength({max:100}).withMessage("Product name must be at most 100 characters."),
    
    // input type 'select' in postman
    body('category_id')
    .isMongoId()
    .notEmpty().withMessage("Category is required."),

    // input type 'number' in postman
    body('price')
    .notEmpty().withMessage("Price is required.")
    .isFloat({gt: 0}).withMessage("Price must be a positive number."),

    // input type 'number' in postman
    body('stock')
    .notEmpty().withMessage("Stock is required.")
    .isInt({gt: 0}).withMessage("Stock must be a positive integer."),
    
    // input type 'textarea' in postman
    body('description')
    .optional()
    .trim()
    .isLength({max:500}).withMessage("Description must be at most 500 characters."),

    // input type 'file' in postman
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
