import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import errorHandlerUtil from "../utils/error-handler.util.js";
import AuthValidation from "../validation/auth.validation.js";

const AuthController = {
  /**
   * @param req
   * @param res
   * @returns {Register<*>}
   */
  register: async (req, res, next) => {
    const user = req.body;
    // validate user input
    const isValidated = AuthValidation.registerValidation(user);
    if (!isValidated)
      return next(errorHandlerUtil(400, "Some inputs are required"));

    // Check if the user already existed
    const userIsExist = await AuthValidation.userIsExist(user);
    if (userIsExist) return next(errorHandlerUtil(400, "User already exist"));

    // Creating new user
    try {
      // 1- hashing the password input
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      // 2- send json data for user
      const newUser = new User({
        ...user,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "Registration completed successfully" });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  /**
   *
   * @param req
   * @param res
   * @returns {Login<*>}
   */
  login: async (req, res, next) => {
    const userInputs = req.body;
    // Validate user input
    const isValidated = AuthValidation.loginValidation(userInputs);
    if (!isValidated)
      return next(errorHandlerUtil(400, "Some inputs are required"));

    try {
      // 1- Find the user
      const user = await User.findOne({ username: userInputs.username });
      if (!user) return next(errorHandlerUtil(404, "User not found"));
      // 2- Check the password correctness
      const isCorrect = bcrypt.compareSync(userInputs.password, user.password);
      if (!isCorrect)
        return next(errorHandlerUtil(400, "Wrong username or password"));
      // 3- Generate token for user
      const token = jwt.sign(
        {
          id: user._id,
          isSeller: user.isSeller,
        },
        process.env.JWT_SECRET
      );

      // return the user without password field
      const { password, ...info } = user._doc;
      return res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .send({
          user: info,
        });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  /**
   * @param req
   * @param res
   * @returns {<Logout>}
   */
  logout: async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ message: "User has been logged out" });
  },
};

export default AuthController;
