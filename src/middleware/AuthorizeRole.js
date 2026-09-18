const authorizeRole =  (...allowedRoles) => {

    return (req,res, next) => {
        if(!req.user || !req.user.role){
            return res.status(401).json({message: "Unauthorized: User not found."});
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: "Forbidden: You do not have permission."})
        }

        next();
    }
}

export default authorizeRole;