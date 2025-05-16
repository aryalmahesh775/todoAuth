import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { otpVerify, resetPassword } from "../../service/auth.service";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { handleSubmit, register, control, setValue } = useForm({
    defaultValues: {
      verificationOTP: ["", "", "", "", "", ""],
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: {
    verificationOTP: string[];
    newPassword: string;
  }) => {
    setLoading(true);
    const otp = data.verificationOTP.join("");
    const newPassword = data.newPassword;
    try {
      const result = await resetPassword({ verificationOTP: otp, newPassword });
      if (result.status === "success") {
        toast.success(
          result.message ||
            "Password reset successfully! Redirect to login page."
        );
        navigate("/login");
      } else {
        toast.error(result.message || "reset password failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured while reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.match(/^[0-9]{0,1}$/)) {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = value;
      setOtpValue(newOtpValue);
      setValue("verificationOTP", newOtpValue);

      if (index < otpValue.length - 1 && value) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackSpaceRemove = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValue[index]) {
      if (index > 0) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").split("");
    if (pasteData.length === otpValue.length) {
      setOtpValue(pasteData);
      setValue("verificationOTP", pasteData);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 text-white p-8 rounded-lg sgadow-lg max-w-md w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 ">Reset Password</h1>
          <p className="text-sm text-gray-400">
            Enter the 6 digit verification code that was send to your email for
            your new password
          </p>
        </header>
        <form
          className=""
          onSubmit={handleSubmit(onSubmit)}
          id="reset-password-form"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            {otpValue.map((value, index) => {
              return (
                <Controller
                  key={index}
                  name={`verificationOTP[${index}]`}
                  control={control}
                  render={({ field }) => (
                    <input
                      id={`otp-input-${index}`}
                      type="text"
                      value={otpValue[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleBackSpaceRemove(index, e)}
                      onPaste={handlePaste}
                      maxLength={1}
                      pattern="\d"
                      className="w-14 h-14 text-center text-2xl font-extrabold text-gray-900 bg-gray-700 border border-gray-600 rounded-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  )}
                />
              );
            })}
          </div>
          <div className="mb-6 relative">
            <Controller
              name={`newPassword`}
              control={control}
              render={({ field }) => (
                <input
                  id={`newPassword`}
                  placeholder="New Password"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 bg-white ring-inset rign-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"                />
              )}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-black leading-5 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/50 hover:bg-indigo-700  focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150 "
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-400 text-center mt-4">
          Didn't receive code?{" "}
          <a className="font-medium text-indigo-400 hover:text-indigo-300 ">
            Resend
          </a>
        </div>
      </div>
      VerifyOTP VerifyOTP
    </div>
  );
};

export default ResetPassword;
