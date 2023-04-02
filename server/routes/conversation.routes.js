import express from "express";
import JwtMiddleware from "../middleware/jwt.middleware.js";
import ConversationController from "../controllers/conversation.controller.js";

const conversationRoutes = express.Router();

conversationRoutes.get(
  "/",
  JwtMiddleware.verifyToken,
  ConversationController.getConversations
);
conversationRoutes.post(
  "/create",
  JwtMiddleware.verifyToken,
  ConversationController.createConversation
);
conversationRoutes.get(
  "/single/:convId",
  JwtMiddleware.verifyToken,
  ConversationController.getSingleConversation
);
conversationRoutes.get(
  "/update/:convId",
  JwtMiddleware.verifyToken,
  ConversationController.updateConversation
);

export default conversationRoutes;