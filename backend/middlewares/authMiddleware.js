import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    try {
        const token = res.cookies.token

        if(!token){return res.json({message:"No Token"})}

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.users = decoded

        next()
    } catch (error) {
        console.log(error);
        res.json({message:"Invalid token"})
    }
}

export default authMiddleware