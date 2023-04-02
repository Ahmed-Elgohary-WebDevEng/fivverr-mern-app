import express from "express";
import JwtMiddleware from "../middleware/jwt.middleware.js";
import GigController from "../controllers/gig.controller.js";

const gigRoutes = express.Router();

gigRoutes.post("/", JwtMiddleware.verifyToken, GigController.createGig);
gigRoutes.delete("/:id", JwtMiddleware.verifyToken, GigController.deleteGig);
gigRoutes.get("/:id", GigController.showGig);
gigRoutes.get("/", GigController.getAllGigs);
gigRoutes.delete("/delete/all", GigController.deleteAllGigs)

export default gigRoutes;
