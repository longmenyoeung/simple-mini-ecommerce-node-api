import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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
productSchema.plugin(paginate);
const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;