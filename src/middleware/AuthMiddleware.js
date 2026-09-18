import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';


export const authJwt = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: "Unauthorized"});
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_JWT);

        const user = await UserModel.findById(decoded.sub);
        if(!user || !user.isActive){return res.status(401).json({message: "Account is inactive or has been deactivated."})}
        
        const respone = user.toObject();
        delete respone.password;

        req.user = respone;
        next()
    } catch (error) {
        return res.json(error.message);
    }
}