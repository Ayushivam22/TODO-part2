import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
// Create a new todo
export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = req.user;
        const task = new Task({ title, description, user });

        const result = await task.save();
        return res.status(201).json({ result, task });
    } catch (error) {
        console.error("Error creating task:", error); // Log full error in server console
        return res.status(400).json({
            message: "Failed to create task",
            error: error.message,
            "request received:": req.body,
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        console.log("GET /getTasks request received");

        const userId = req.user;

        // Optional: Check if user exists (for validation or audit)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch all tasks belonging to that user
        const tasks = await Task.find({ user: userId });

        return res.json({
            user: {
                username: user.username,
                _id: user._id,
            },
            tasks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        console.log("FE editing");
        const { id } = req.params;
        const { title, description, completed } = req.body;
        console.log("id:", id, typeof id);
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );
        console.log("updatedTask:", updatedTask);
        if (!updatedTask)
            return res.status(404).json({ message: "Task not found" });
        return res.json(updatedTask);
    } catch (error) {
        return res.status(400).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL params
        console.log("Deleting task with ID:", id); // Debugging line

        const deletedTask = await Task.findByIdAndDelete(id); // Use MongoDB's _id

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
