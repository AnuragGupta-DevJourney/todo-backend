import express from "express"
import { changeTodoStatus, createTodo, deleteTodo, getSingleTodo, readTodo, updateTodo } from "../controllers/todoController.js";


const todoRouter = express.Router()

// * CREATE TODO 
todoRouter.post("/todo", createTodo);

// * READ TODO 
todoRouter.get("/todo", readTodo);

// * READ SINGLE TODO BY ID
todoRouter.get("/todo/:id", getSingleTodo)

// * UPDATE TODO
todoRouter.put("/todo/:id", updateTodo);

// * PATCH TODO
todoRouter.patch("/todo/:id", changeTodoStatus);


// * DELETE TODO
todoRouter.delete("/todo/:id", deleteTodo);

export default todoRouter