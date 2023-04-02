import User from "../models/User.model.js";

const AuthValidation = {
  userIsExist: async (user) => {
    const { username, email } = user;

    const isExist = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (isExist) return true;
  },
  registerValidation: (user) => {
    const { username, email, password, country } = user;

    if (!username || !email || !password || !country) return false;

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      country.trim() === ""
    ) {
      return false;
    }

    return true;
  },
  loginValidation: (user) => {
    const { username, password } = user;

    if (!username || !password) return false;

    if (username.trim() === "" || password.trim() === "") {
      return false;
    }

    return true;
  },
};

export default AuthValidation;
