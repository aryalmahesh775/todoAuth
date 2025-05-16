const model = require("../models");
const { sendOtpToEmail } = require("../service/emailProvider");
const { generateToken } = require("../utils/generateToken");
const { generateUUID } = require("../utils/generateUUID");
const { responde } = require("../utils/responseHandler");
const bcrypt = require("bcrypt");
const validate = require("validator");

const signup = async (req, res) => {
  try {
    const id = generateUUID();
    const { name, email, password } = req.body;
    if (!validate.isEmail(email) || !email.endsWith("@gmail.com")) {
        return responde(
          res,
          400,
          "Please enter a valid email address ending with @gmail.com"
        );
      }

    const existingUser = await model.User.findOne({ where: { email } });
    if (existingUser) {
      return responde(res, 400, "User already exist please login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationOTP = Math.floor(
      10000 + Math.random() * 900000
    ).toString();

    user = await model.User.create({
      id,
      name,
      email,
      password: hashedPassword,
      verificationOTP,
      otpExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendOtpToEmail(email, verificationOTP);

    const token = generateToken(user);
    res.cookie("token", token, { maxAge: 36000000 });

    return responde(
      res,
      201,
      "User created successfully. Check your email for OTP varification",
      {
        id: user.id,
        name: user.name,
        email: user.email,
        isverified: false,
      }
    );
  } catch (error) {
    console.log(error);
    return responde(res, 500, "Something went wrong, Internal server error");
  }
};

const verifyOTP = async (req, res) => {
    try {
      const { verificationOTP } = req.body;
      const user = await model.User.findOne({ where: { verificationOTP } });
      console.log(user)
      if (!user) {
        return responde(res, 400, "Invalid OTP");
      }
  
      if (user.otpExpiresAt < Date.now()) {
        return responde(res, 400, "OTP expired");
      }
  
      user.verificationOTP = null;
      user.otpExpiresAt = null;
      user.isverified = true;
      await user.save();

      console.log(user)
  
      return responde(res, 200, "Email verified succcessfully", {
        id: user.id,
        name: user.name,
        email: user.email,
        isverified: user.isverified,
      });
    } catch (error) {
      return responde(res, 500, "Something went wrong, Internal server error");
    }
  };

  const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await model.User.findOne({ where: { email } });
  
      if (!user) return responde(res, 404, "user not found");
  
      if (!user.isverified) return responde(res, 404, "user not verified");
  
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) return responde(res, 400, "password is invalid..");
  
      const token = generateToken(user);
      res.cookie("token", token, { maxAge: 3600000 });
  
      return responde(res, 200, "User logged in succcessfully", {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isverified,
      });
    } catch (error) {
      return responde(res, 500, "Something went wrong, Internal server error");
    }
  };

  const forgotpassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await model.User.findOne({ where: { email } });
      if (!user) {
        return responde(res, 400, "User not found");
      }
  
      const verificationOTP = Math.floor(
        10000 + Math.random() * 900000
      ).toString();
  
      user.verificationOTP = verificationOTP;
      user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
  
      await user.save();
  
      await sendOtpToEmail(user.email, verificationOTP);
  
      return responde(
        res,
        200,
        "Otp send to your email.Please, check for email varification"
      );
    } catch (error) {
      console.log(error);
      return responde(res, 500, "Something went wrong, Internal server error");
    }
  };

  const resetPassword = async (req, res) => {
    try {
      const { verificationOTP, newPassword } = req.body;
  
      const user = await model.User.findOne({ where: { verificationOTP } });
      if (!user) {
        return responde(res, 400, "Invalid OTP");
      }
  
      if (user.otpExpiresAt < Date.now()) {
        return responde(res, 400, "OTP expired");
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.verificationOTP = null;
      user.otpExpiresAt = null;
      await user.save();
      return responde(res, 200, "Password reset successfully..");
    } catch (error) {
      console.log(error);
      return responde(res, 500, "Something went wrong, Internal server error");
    }
  };

  const logout = (req, res) => {
    try {
      res.cookie("token", "", { expires: new Date(0) });
      return responde(res, 200, "Logout successfully");
    } catch (error) {
      console.log(error);
      return responde(res, 500, "Something went wrong, Internal server error");
    }
  };
  
  const getUserProfile = async (req, res) => {
    try {
      // const userId = req.params.userId;
      const userId = req.user.userId;
  
      // if (!userId) return responde(res, 400, "User id is required");
  
      const user = await model.User.findOne({
        where: { id: userId },
        attributes: ["id", "name", "email","profileImage"],
      });
  
      if (!user) return responde(res, 404, "User not found..");
      return responde(res, 200, "User profile fetched successfully", user);
    } catch (error) {
      console.log(error);
      return responde(res, 500, "Something went wrong, Internal server error");
    }
  };

module.exports = {
  signup,
  verifyOTP,
  signin,
  forgotpassword,
  resetPassword,
  logout,
  getUserProfile,
};
