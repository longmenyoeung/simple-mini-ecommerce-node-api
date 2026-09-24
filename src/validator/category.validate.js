import { body ,param} from "express-validator";
import validate from "../middleware/Validate.js";



//Create and Update form form-input at postman
export const categoryValidate = [
    body('name')
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isString().withMessage("Name must be a string.")
    .isLength({max: 50}).withMessage("Name must be at most 50 characters."),
    body('description')
    .trim()
    .optional()
    .isString().withMessage("Description must be a string.")
    .isLength({max: 500}).withMessage("Description must be at most 500 characters."),
    body('avata')
    .optional()
    .isString().withMessage("Avata must be a string."),
    body('isActive')
    .optional()
    .isBoolean().withMessage("isActive must be a boolean."),
    validate
]

export const deleteCategoryValidate = [
    param('id')
    .isMongoId()
    .notEmpty().withMessage("Category ID is required."),
    validate
]