import mongoose from "mongoose"
import paginate  from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
    name: {type:String, trim: true, required: true},
    email: {type:String, trim: true, unique: true, required:true},
    password: {type:String, trim:true, min:6, required:true},
    isActive: {type: Boolean, default:true},
    role:{type:String, enum:["admin", "user"], default: 'user'}
},{
    timestamps: true,
    collection: 'users'
});

userSchema.plugin(paginate);
const UserModel = mongoose.model('User', userSchema);
export default UserModel; 