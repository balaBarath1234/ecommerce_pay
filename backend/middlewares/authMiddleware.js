import jwt from "jsonwebtoken"
import Users from "../models/usersModel.js"

const authMiddleware = async (req,res,next) => {
    try {
        const token = res.cookies.token

        if(!token){return res.status(401).json({message:"Not Authenticated or No Token"})}

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await Users.findById(decoded.id).select("-password")

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error);
        res.json({message:"Invalid token"})
    }
}

export default authMiddleware