import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import VerifyOtp from "./components/login/Verify-Otp";
import ResetPassword from "./components/login/Reset-Password";
import ForgotPassword from "./components/login/Forgot-Password";
import HomePage from "./components/home/Home";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
// import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  return (
    <>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          {/* <Route path="/" element={<ProtectedRoute children={<HomePage />} />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<h1>No page found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
