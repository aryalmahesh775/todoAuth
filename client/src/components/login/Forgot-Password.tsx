import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../service/auth.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await forgotPassword(data);
      if (result.status === "success") {
        toast.success(result.message);
        navigate("/reset-password");
      } else {
        toast.error("Email is not valid");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset rign-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && (
              <p className="text-red-600">{String(errors.email.message)}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (<>Reset Password</>)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
