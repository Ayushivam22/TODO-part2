import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function auth(req, res, next) {
  if (req.method === "OPTIONS") {
    // Let preflight requests pass through
    return next();
  }

  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData || !decodedData._id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decodedData._id; // Attach user ID to request object
    console.log("Authorization done");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "User Not Logged In",
      error: error.message,
    });
  }
}
