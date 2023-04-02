import User from "../models/User.model.js";
import errorHandlerUtil from "../utils/error-handler.util.js";

const UserController = {
  delete: async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return next(errorHandlerUtil(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted user successfully" });
  },

  getUser: async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');
    if (!user) return next(errorHandlerUtil(404, "User not Found"));

    return res.status(200).send(user);
  },
};

export default UserController;
