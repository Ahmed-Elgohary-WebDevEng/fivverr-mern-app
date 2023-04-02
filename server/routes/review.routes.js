import express from "express";
import JwtMiddleware from "../middleware/jwt.middleware.js";
import ReviewController from "../controllers/review.controller.js";

const reviewRoutes = express.Router();

reviewRoutes.post(
  "/create",
  JwtMiddleware.verifyToken,
  ReviewController.createReview
);
reviewRoutes.get("/:gigId", ReviewController.getAllReviews);
reviewRoutes.delete("/delete/:gigId", ReviewController.deleteReview);

export default reviewRoutes;
