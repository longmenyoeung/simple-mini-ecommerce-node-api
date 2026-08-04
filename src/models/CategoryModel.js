import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type :String,
        required: true,
        trim : true,
        unique : true
    },
    isActive : {
        type: Boolean,
        default : true
    }
},{
    timestamps :true,
    collection : 'categories'
});

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;