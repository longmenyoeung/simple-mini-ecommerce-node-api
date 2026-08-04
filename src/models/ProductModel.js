import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    category_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required : true,
        index: true
    },
    description : {
        type: String,
        max : 500
    },
    price: {
        type : Number,
        required: true
    },
    stock: {
        type: Number,
        required : true
    }
},{
    timestamps: true,
    collection : 'products'
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;