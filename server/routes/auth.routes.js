import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRoutes = express.Router()

authRoutes.post("/register", AuthController.register)
authRoutes.post("/login", AuthController.login)
authRoutes.post("/logout", AuthController.logout)

export default authRoutes