import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    roles:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{
    timestamps:true
})

const Users = mongoose.model("users",userSchema)

export default Users