import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    images:{
        type:[String],
        default:[]
    },
    brand:{
        type:String,
        trim:true,
        default:""
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    numreviews:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const Product = mongoose.model("product",productSchema)
export default Product