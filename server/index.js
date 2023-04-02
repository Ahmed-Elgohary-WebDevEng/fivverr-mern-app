import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import UserSeeder from "./database/seeder/user.seeder.js";
import authRoutes from "./routes/auth.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import messageRoutes from "./routes/message.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
import GigSeeder from "./database/seeder/gig.seeder.js";

/**
 * ------------- Configuration App ---------------
 */
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());

/**
 * ------------- Routes ---------------
 */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/conversations", conversationRoutes);

// error handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";

  return res.status(errorStatus).json({error: errorMessage});
});

/**
 * ------------- Connection ---------------
 */
const port = 5000;

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}!`);
  /**
   * Database Seeder
   */

  /*UserSeeder.seed(4)
    .then(() => {
      console.log("------- User Seeder success ------------");
    })
    .catch((error) => {
      console.log(error);
    });*/
/*
  GigSeeder.seed(5)
    .then(() => {
      console.log("Gigs Seeded Complete");
    })
    .catch((err) => {
      console.log(err.message);
    });
*/
});

/**
 * ------------- Functions ---------------
 */
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
