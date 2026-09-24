import ProductModel from "../models/ProductModel.js";
import ApiError from "../utils/ApiError.js";



//create cart
export const create = async (req, res, next) => {
    try {
        
        const {product_id, quantity} = req.body;
        const userId = req.user._id;

        if(!mongoose.Types.ObjectId.isValid(product_id)){
            throw new ApiError(400, "Invalid product ID format provided.")
        }

        // check product is exitsted or not
        const product = await ProductModel.findById(product_id)
        if(!product){
            throw new ApiError(404, "Product not found.")
        }

        if(product.stock <= 0){ // check the stock is zero or not
            throw new ApiError(400, "Product is out of stock.")
        }

        //check stock quantity
        if(product.stock < quantity){ // check the stock quantity is greater than the quantity
            throw new ApiError(400, `Product only has ${product.stock} items left in stock.`)
        }

        //check the cart  
        const cart = await CartModel.findOne({
            user: userId,
            product: product_id
        })

        if(cart){
            throw new ApiError(400, "Product already in cart.")
        }

        // Create a new cart item
        const cartItem = await CartModel.create({
            user: userId,
            product: product_id,
            quantity: quantity
        })
        

        return res.status(201).json({
            success: true,
            message: "Cart created successfully.",
            cartItem
        })

        
    } catch (error) {
        next(error)
    }
}