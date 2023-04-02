import express from "express";
import MessageController from "../controllers/message.controller.js";
import JwtMiddleware from "../middleware/jwt.middleware.js";

const messageRoutes = express.Router();

messageRoutes.post(
  "/create",
  JwtMiddleware.verifyToken,
  MessageController.createMessage
);
messageRoutes.get(
  "/:convId",
  JwtMiddleware.verifyToken,
  MessageController.getMessages
);

export default messageRoutes;
