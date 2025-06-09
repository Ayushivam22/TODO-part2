import express from "express";
// import Task from "../models/taskModel.js";
import {getTasks , createTask,updateTask,deleteTask} from "../controllers/todoController.js";

const taskRoutes = express.Router();

// Get all tasks
taskRoutes.get("/gettasks", getTasks);

// Create a new task
taskRoutes.post("/addtask",createTask);

// Update a task
taskRoutes.put("/:id", updateTask);

// Delete a task
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
