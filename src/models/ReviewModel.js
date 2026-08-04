import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        index: true,
        required:true
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        index: true,
        required: true
    },
    rating :{
        type :Number,
        min:0,
        max:5
    },
    text_comment : {
        type:String,
        max: 500
    }
}, {
    timestamps: true,
    collection : 'reviews'
});

const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;