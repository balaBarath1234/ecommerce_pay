import Users from "../models/usersModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req,res) => {
    try {
        console.log("called");
        
        const {name , email , password} = req.body

        if(!name || !email || !password){return res.status(400).json({message:"Name,Email and Password are required"})}
        const existinguser = await Users.findOne({email:email})

        if(existinguser) {return res.status(409).json({message:"User Already Registered"})}

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await Users.create({...req.body,password:hashedPassword})

        res.json({message:"User Successfully Registered",data:user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const loginUser = async (req,res) =>{
    try {
        console.log(req.body);
        
        if(!req.body.email || !req.body.password){
            res.status(400).json({message:"Email and Password are required"})
        }

        const existinguser = await Users.findOne({email:req.body.email})

        if(!existinguser){return res.json({message:"No User Found"})} 

        const match = await  bcrypt.compare(req.body.password,existinguser.password)

        if(!match){return res.json({message:"Password Mismatch"})}

        const token = jwt.sign({id:existinguser.id,role:existinguser.role},process.env.JWT_SECRET,{expiresIn:"5m"})

        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge: 24 * 60 * 60 * 1000})
        
        res.status(200).json({message:"Login successfull",data:existinguser})

    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error"})
    }
}

export const getCurrentUser = async (req,res) => {
    try {
        res.status(200).json({
            data:req.user
        })
    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error"})
    }
}

export const logoutUser = async() => {
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })
        res.status(200).json({message:"Logout Successful"})
    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error"})
    }
}