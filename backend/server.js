import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"


dotenv.config()
const app = express()

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())

connectDb()

app.use("/api/auth",authRoutes)

app.listen(process.env.PORT || 5000,() => {
    console.log(`server is running on port ${process.env.PORT}`);
})