import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.model.js";
import dotenv from "dotenv";

dotenv.config();

// signup controller
const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    console.log({ fullname, email, password });

    if ([fullname, email, password].some((item) => item.trim === "")) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(500)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const createdUser = await User.findOne({ email }).select("-password");
    if (!createdUser)
      return res
        .status(500)
        .json({ success: false, message: "Couldn't create user" });

    console.log({ createdUser });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: createdUser,
    });
  } catch (err) {
    console.log("Error while creating and resgistering new user", err);
    return res.status(500).json({
      success: false,
      message: "Couldn't register new user",
    });
  }
};

// login controller
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    if ([email, password].some((item) => item.trim() === "")) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    else console.log("user password is right");

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.fullname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false });
    return res
      .status(200)
      .json({ succes: false, message: "User logged-in successfully" });
  } catch (err) {
    console.log("Error while logging in the user", err);
    return res.json({
      success: false,
      message: "Couldn't login the user",
    });
  }
};

// logout controller
const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log("Error while logging out", err);
    return res.json({
      success: false,
      message: "Couldn't signout the user",
    });
  }
};

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log("No user found , Middleware error", err);
    res.json({ success: false, message: "User not authenticated" });
  }
};

export { signup, signin, signout, authMiddleware };
