import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import taskRoutes from "./routes/taskRouter.js";
import userRoutes from "./routes/userRouter.js";
import cors from "cors";
import { auth } from "./auth.js"

const app = express();
dotenv.config();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Add this
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
// Handle preflight OPTIONS request for all routes
app.use(cors(corsOptions));     
app.options("*", cors(corsOptions)); // Explicitly enable OPTIONS method



dbConnect();
console.log("Routes are imported");
app.use("/task", auth, taskRoutes);
app.use("/user", userRoutes);

// const Port = process.env.PORT || 3000;
// app.listen(Port, () => {
//   console.log(`Server is running on port ${Port}`);
// });


export default app; 