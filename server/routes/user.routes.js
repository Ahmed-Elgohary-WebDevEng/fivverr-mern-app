import express from "express";
import UserController from "../controllers/user.controller.js";
import JwtMiddleware from "../middleware/jwt.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/:id", JwtMiddleware.verifyToken, UserController.getUser)
userRoutes.delete("/:id", JwtMiddleware.verifyToken, UserController.delete)

export default userRoutes