import jwt from "jsonwebtoken";
import errorHandlerUtil from "../utils/error-handler.util.js";

const JwtMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(errorHandlerUtil(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
      if (error) return next(errorHandlerUtil(403, "Token is not valid!"));

      req.userId = payload.id;
      req.isSeller = payload.isSeller;

      next();
    });
  },
};

export default JwtMiddleware;
