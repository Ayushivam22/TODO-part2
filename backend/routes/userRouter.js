import express from "express";
import {signupController,signinController} from "../controllers/userController.js";

const userRoutes = express.Router();

// Get all tasks
userRoutes.post("/signup", signupController);

// Create a new task
userRoutes.post("/signin",signinController);

export default userRoutes;
