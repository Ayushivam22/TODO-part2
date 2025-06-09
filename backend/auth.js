import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function auth(req, res, next) {
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
        //to be removed later
        console.log("Authorization done");
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: "User Not Logged In",
            error: error.message,
        });
    }
}

// module.exports={auth}/
