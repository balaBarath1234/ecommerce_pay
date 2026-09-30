import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import connectDb from "./config/db.js"


import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"


dotenv.config()
const app = express()

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())

connectDb()

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)

app.listen(process.env.PORT || 5000,() => {
    console.log(`server is running on port ${process.env.PORT}`);
})