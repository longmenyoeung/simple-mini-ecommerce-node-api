import {validationResult}  from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const formattedError = errors.array().map(err => ({
            field: err.field,
            message: err.msg
        }))
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: formattedError
        })
    }

    next();
}

export default validate;