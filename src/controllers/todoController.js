import TodoModel from "../models/todoModel.js";


export const createTodo = async function (req, res) {
    try {

        const { title, description } = req.body;

        if (!title || !description || title.trim().length <= 0 || description.trim().length <= 0) {
            return res.status(400).json({ status: false, message: "all fields are required" })
        }
        const todoExist = await TodoModel.exists({ title: new RegExp(title, "i") });
        console.log("todoExist", todoExist)
        if (todoExist) {
            return res.status(409).json({ status: false, message: "title already exist" })
        }

        const todo = await TodoModel.create({ title: title, description: description });
        (await todo).save()

        return res.status(201).json({ status: true, message: "todo created successfully" })

    } catch (error) {
        return res.status(500).json({ message: "failed to insert", status: false, error: error.message })
    }
}

export const readTodo = async function (req, res) {

    try {

        const q = req.query;
        const { limit, page, query } = q;
        const skip = (page - 1) * limit;

        const filterQuery = query?.trim().length <= 0 ? {} : { title: new RegExp(query, "i") }
        const data = await TodoModel.find(filterQuery).skip(skip).limit(limit);
        const totalCount = await TodoModel.find().countDocuments(filterQuery);

        return res.status(200).json({ status: true, message: "Todo fetched successfully", data: data, totalTodosCount: totalCount })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal error while fetching todo", error: error.message })
    }

}

export const getSingleTodo = async function (req, res) {
    try {

        const todoId = req.params.id;
        
        const todo = await TodoModel.findById(todoId);

        return res.status(200).json({ status: true, message: "todo fetched successfully", data: todo })

    } catch (error) {
        return res.status(500).json({ status: false, message: "failed to fetch", error: error.message })
    }

}

export const updateTodo = async function (req, res) {

    try {
        // * reading todo id , title , description
        const todoId = req.params.id;
        const { title, description } = req.body;

        // * checking the todo id exist or not
        const todoExist = await TodoModel.exists({ _id: todoId })

        if (!todoExist) {
            return res.status(404).json({ status: false, message: "todo not found" })
        }

        // * if todo Id exits so update collection's document
        const todo = await TodoModel.findByIdAndUpdate(
            todoId,
            { title: title, description: description },
            { new: true }
        );

        return res.status(200).json({
            status: true,
            message: "Updated todo successfully",
            data: todo
        })

    } catch (error) {

        return res.status(500).json({ status: false, message: "failed to update", error: error.message })

    }

}

export const deleteTodo = async function (req, res) {

    try {

        const todoId = req.params.id;

        const todo = await TodoModel.findByIdAndDelete(todoId);

        if (!todo) {
            return res.status(404).json({ status: false, message: "Todo not found" })
        }

        res.status(200).json({ status: true, message: "todo deleted successfully" })

    } catch (error) {
        return res.status(500).json({ status: false, message: "failed to delete", error: error.message })
    }

}

export const changeTodoStatus = async function (req, res) {

    try {
        // * reading todo id and isCompleted Status
        const todoId = req.params.id;
        const { isCompleted } = req.body;

        // * checking the todo id exist or not
        const todoExist = await TodoModel.exists({ _id: todoId })

        if (!todoExist) {
            return res.status(404).json({ status: false, message: "todo not found" })
        }

        // * if todo Id exits so update collection's document
        const todo = await TodoModel.findByIdAndUpdate(
            todoId,
            { isCompleted: isCompleted },
            { new: true }
        );

        return res.status(200).json({
            status: true,
            message: "todo complete status changed",
            data: todo
        })

    } catch (error) {

        return res.status(500).json({ status: false, message: "failed to update", error: error.message })

    }

}