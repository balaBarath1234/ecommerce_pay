import express from "express"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()

console.log("router");


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",authMiddleware,getCurrentUser)
router.post("/logout",logoutUser)

export default router