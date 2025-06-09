import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// Create a new user
export const signupController = async function (req, res) {
    //to be removed later
    console.log("Request Body:", req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    const { username, password } = req.body;
  if(!username || !password)
  {
    return res.status(400).json(
      {
        success:false,
        message:"Username/Password is a required field"
      }
    )
  }
    // Check if user already exists (by username only)
    const existingUser = await User.findOne({ username });

    console.log("existing user:", existingUser);
    if (existingUser) {
        console.log("User already exists");
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds
    await User.create({ username, password: hashedPassword });

    console.log("User created Successfully");
    return res.status(200).json({
        success: true,
        message: "User created Successfully",
    });
};

export const signinController = async function (req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Password is Incorrect",
        });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
        message: "Login Successful",
        token,
    });
};
