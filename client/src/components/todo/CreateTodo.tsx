import { yupResolver } from '@hookform/resolvers/yup';
import {} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createTodo } from '../../service/todo.service';

const CreateTodo = () => {

    const todoSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().optional(),
        dueDate: Yup.date()
          .required("Due date is required")
          .min(new Date(), "Due Date can not be in past"),
      });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(todoSchema),
      });
    
      const navigate = useNavigate();

      const onSubmit = async(data:any) => {
        try {
            const result = await createTodo(data);
            console.log(result);
            toast.success("todo created successfully");
            reset();
            navigate("/todos-list");
          } catch (error) {
            console.error(error);
            toast.error("failed to create todo");
          }
      }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-indigo-400 to-pink-600">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-900">
        Create Your New Todos!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-left p-1 text-gray-700">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter todo title"
            className={`mt-1 block w-full px-4 py-3 bg-gray-100 border ${
              errors.title ? "border-red-500 " : "border-red-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2 text-left">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-left p-1 text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter todo description"
            className={`mt-1 block w-full px-4 py-3 bg-gray-100 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-left p-1 text-gray-700">
            Due Date
          </label>
          <input
            {...register("dueDate")}
            type="date"
            className={`mt-1 block w-full px-4 py-3 bg-gray-100 border ${
              errors.dueDate ? "border-red-500 " : "border-red-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-2 text-left">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-indigo-400 to-pink-600 hover:from-indigo-600 hover:via-purple-400 hover:to-pink-600 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        >
          Create Todo
        </button>
      </form>
    </div>
  </div>
  )
}

export default CreateTodo
