
import mongoose from "mongoose";
import orderItemSchema from "./OrderItemModel.js";

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: String
})

const orderSchema = new mongoose.Schema({
    total_amount: {
        type: Number,
        required: true,
        default: 0.00
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'delivered', 'approved'],
        default: 'pending'
    },
    order_items: [orderItemSchema],
    address: [addressSchema]
}, {
    timestamps: true,
    collection: 'orders'
});



const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;