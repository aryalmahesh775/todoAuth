import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { otpVerify } from "../../service/auth.service";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      verificationOTP: ["", "", "", "", "", ""],
    },
  });
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);

  const onSubmit = async (data: { verificationOTP: string[] }) => {
    const otp = data.verificationOTP.join("");
    try {
      const result = await otpVerify({ verificationOTP: otp });
      if (result.status === "success") {
        toast.success(
          result.message ||
            "Account verified successfully! Redirect to home page."
        );
        navigate("/");
      } else {
        toast.error(result.message || "otp verification failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured while verifying otp");
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
      // if (index < otpValue.length - 1 && value) {
      //   document.getElementById(`otp-input-${index + 1}`).focus();
      // }
    }
  };

  const handleBackSpaceRemove = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValue[index]) {
      if (index > 0) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
       }
      // if (index > 0) {
      //   document.getElementById(`otp-input-${index + 1}`).focus();
      // }
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
          <h1 className="text-3xl font-bold mb-2 ">Email Verification</h1>
          <p className="text-sm text-gray-400">
            Enter the 6 digit verification code that was send to your email
          </p>
        </header>
        <form className="" onSubmit={handleSubmit(onSubmit)} id="otp-form">
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
          <div className="text-center">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/50 hover:bg-indigo-700  focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150 "
            >
              Verify Account
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

export default VerifyOtp;
