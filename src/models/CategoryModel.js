import mongoose from "mongoose";
import paginate  from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema({
    name : {
        type :String,
        required: true,
        trim : true,
        unique : true
    },
    description: {
        type:String,
        max: 500
    },
    avata: {
        type: String,
        default: null
    },
    isActive : {
        type: Boolean,
        default : true
    }
},{
    timestamps :true,
    collection : 'categories'
});
categorySchema.plugin(paginate)
const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;