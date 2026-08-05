import mongoose from "mongoose";

const orderItemSchema  = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
        required : true
    },
    qty : {
        type : Number,
        min : 0,
        default : 0
    },
})

export default orderItemSchema;