const model = require("../models");
const { generateUUID } = require("../utils/generateUUID");
const { responde } = require("../utils/responseHandler");

const createTodos = async(req, res) => {
    try {
        const id = generateUUID();
        const userId = req.user.userId;
        const { title, description, dueDate } = req.body;

        const newTodos = await model.Todo.create({
            id,
            title,
            description,
            dueDate,
            userId
        });

        return responde(res,201, "Todo created successfully",newTodos)
    } catch (error) {
        console.error("Error creating todos",error);
        return responde(res, 500, "Something went wrong, Error creating Todos");
        
    }
}

module.exports = {
    createTodos
}