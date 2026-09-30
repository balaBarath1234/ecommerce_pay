import Product from "../models/productModel.js";

export const createProduct = async (req,res) =>{
    try {
        const {name,description,price,stock,category,images,brand} = req.body

        if(!name || !description || price === undefined || stock === undefined || !category){
            return res.status(400).json({message:"Name,description,price,stock,category are required"})
        }

        if(Number(price) < 0 ){
            return res.status(400).json({message:"Price cannot be negative"})
        }

        if(Number(stock) < 0){
            return res.status(400).json({message:"Stock cannot be naegative"})
        }

        const product = await Product.create({
            name,description,price:Number(price),stock:Number(stock),category,images:images || [] ,brand:brand || ""
        })

        res.status(201).json({message:"Product created successfully",data:product})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
}

export const getProducts = async (req,res) => {
    try {
        const {search="",category,page=1,limit=10,sort="newest"} = req.query

        const query = {isActive:true}

        if(search){
            query.$or = [
                {
                    name:{
                        $regex:search,
                        $options:"i"
                    }
                },
                {
                    description:{
                        $regex:search,
                        $options:"i"
                    }
                },
                {
                    brand:{
                        $regex:search,
                        $options:"i"
                    }
                }
            ]
        }

        if(category){
            query.category = category
        }

        const currentPage = Math.max(Number(page),1)

        const itemsPerPage = Math.min(Math.max(Number(limit)),100)

        const skip = (currentPage - 1) * itemsPerPage

        let sortOption = {
            createdAt : -1
        }

        if(sort === "price_asc"){
            sortOption = {
                price:1
            }
        }
        if(sort === "price_desc"){
            sortOption = {
                price:-1
            }
        }
        if(sort === "name_asc"){
            sortOption = {
                name:1
            }
        }

        const products = await Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(itemsPerPage)

        const totalProducts = await Product.countDocuments(query)

        const totalPages = Math.ceil(totalProducts/itemsPerPage)

        res.status(200).json({products,pagination:{currentPage,itemsPerPage,totalPages,totalProducts}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
}

export const getProductById = async (req,res) => {
    try {
        console.log("gpi");
        
        const product = await Product.findOne({
            _id:req.params.id,
            isActive:true
        })

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        res.status(200).json({data:product})
    } catch (error) {
        console.log(error)
        res.status(500).jsons({message:error})
    }
}

export const updateProduct = async (req,res) => {
    try {
        let product = await Product.findById(req.params.id)

        if(!product){
            return res.status(400).json({message:"Product not found"})
        }

        const {name,description,price,stock,category,images,brand,isActive} = req.body

        if(price !== undefined && Number(price) < 0 ){
            return res.status(400).json({message:"Price cannot be negative"})
        }

        if(stock !== undefined && Number(stock) < 0 ){
            return res.status(400).json({message:"Stock cannot be negative"})
        }

        const updateData = {
            name,description,
            price:price !== undefined ? Number(price) : undefined,
            stock:stock !== undefined ? Number(stock) : undefined,
            category,
            brand,
            images,
            isActive
        }

        product = await Product.findByIdAndUpdate(req.params.id,updateData,{new:true,runValidators:true})

        res.status(200).json({message:"Updated Successfully" , data:product})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){return res.status(400).json({message:"No Product Found"})}

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({message:"Product Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}