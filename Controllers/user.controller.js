import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




//Register a New User // SIGN Up User

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User Registration successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
};

//Login User || SIGN IN User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ message: "User Login successfully", data: user })
      .json({ message: "User Logged In Successfully", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User Login failed", error: error.message });
  }
};
