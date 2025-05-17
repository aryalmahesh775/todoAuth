import axiosInstance from "./url.service"


//create todos
export const createTodo = async(todoData:any) =>{
    try {
        const response = await axiosInstance.post('/user/todos',todoData);
        return response.data;
    } catch (error) {
        console.log('error while creating todos',error);
        throw error;
    }
}


//get todos by userId
export const getTodosByUserId = async() =>{
    try {
        const response = await axiosInstance.get('/user/todos');
        return response.data;
    } catch (error) {
        console.log('error while getting todos',error);
        throw error;
    }
}


//get update by userId
export const updateTodosByUserId = async(id:string,updateTodoData:any) =>{
    try {
        const response = await axiosInstance.put(`/user/todos/${id}`,updateTodoData);
        return response.data;
    } catch (error) {
        console.log('error while getting todos',error);
        throw error;
    }
}

//get delete by userId
export const deleteTodosByUserId = async(id:string) =>{
    try {
        const response = await axiosInstance.delete(`/user/todos/${id}`);
        return response.data;
    } catch (error) {
        console.log('error while getting todos',error);
        throw error;
    }
}