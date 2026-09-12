import Users from "../models/usersModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req,res) => {
    try {
        const existinguser = await Users.findOne({email:req.body.email})

        if(existinguser) {return res.json({message:"User Already Registered"})}

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const user = await Users.create({...req.body,password:hashedPassword})

        res.json({message:"User Successfully Registered",data:user})
    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error"})
    }
}

export const loginUser = async (req,res) =>{
    try {
        const existinguser = await Users.findOne({email:req.body.email})

        if(!existinguser){return res.json({message:"No User Found"})} 

        const match = await  bcrypt.compare(req.body.password,existinguser.password)

        if(!match){return res.json({message:"Password Mismatch"})}

        const token = jwt.sign({id:existinguser.id},process.env.JWT_SECRET,{expiresIn:"5m"})

        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge: 24 * 60 * 60 * 1000})
        
        res.json({message:"Login successfull",data:existinguser,token})

    } catch (error) {
        console.log(error);
        res.json({message:"Internal Server Error"})
    }
}