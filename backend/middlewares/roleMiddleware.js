const roleMiddleware = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.users.role)){
            return res.json("Access Denied")
        }
        next()
    }
}

export default roleMiddleware