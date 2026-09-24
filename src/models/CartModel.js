import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
        index: true
    },
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required: true
    },
    quantity : {
        type: Number,
        default: 1,
        min : 1
    }
},{
    timestamps : true,
    collection : 'carts'
});

const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;