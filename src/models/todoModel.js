import { Schema, model } from "mongoose";

const todoSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true 
    },
    description: String,
    isCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const TodoModel = model("TodoModel", todoSchema)

export default TodoModel