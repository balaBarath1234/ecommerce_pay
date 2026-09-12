import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import UserRouter from "./routes/usersRoutes.js"


const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))

connectDb()

app.use("/api/auth",UserRouter)

app.listen(process.env.PORT,() => {
    console.log(`server is running on port ${process.env.PORT}`);
})