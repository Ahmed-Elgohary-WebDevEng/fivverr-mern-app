import express from "express";
import OrderController from "../controllers/order.controller.js";
import JwtMiddleware from "../middleware/jwt.middleware.js";

const orderRoutes = express.Router();

orderRoutes.get("/", JwtMiddleware.verifyToken, OrderController.getOrders);
orderRoutes.post(
  "/create-payment-intent/:gigId",
  JwtMiddleware.verifyToken,
  OrderController.intent
);
orderRoutes.put("/", JwtMiddleware.verifyToken, OrderController.confirm)

export default orderRoutes;
