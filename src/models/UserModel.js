import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type:String, trim: true},
    email: {type:String, trim: true, unique: true},
    age :{type:Number, min:18}
},{
    timestamps: true,
    collection: 'users'
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel; 