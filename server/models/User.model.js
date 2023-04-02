import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      message: "email must be unique"
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      message: 'Password is week'
    },
    img: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
      message: 'Country Error'
    },
    phone: {
      type: String,
      required: false,
      message: 'Phone error',
    },
    desc: {
      type: String,
      required: false,
      message: 'Description error'
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
