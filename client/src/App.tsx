import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/login/Login";
import VerifyOtp from "./components/login/Verify-Otp";
import ResetPassword from "./components/login/Reset-Password";
import ForgotPassword from "./components/login/Forgot-Password";
import HomePage from "./components/home/Home";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SuccessLogin from "./components/page/SuccessLogin";
import Navbar from "./components/home/Navbar";
import CreateTodo from "./components/todo/CreateTodo";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Todos from "./components/todo/Todos";
import { useEffect } from "react";
import { isTokenPresent } from "./redux/authToken";
import { logoutSuccess } from "./redux/slice/authSlice";

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const noNavbarPaths = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
    "/success-login",
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isTokenPresent()) {
      dispatch(logoutSuccess());
    }
  }, [dispatch]);

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/success-login" element={<SuccessLogin />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create-todos"
          element={<ProtectedRoute children={<CreateTodo />} />}
        />
        <Route
          path="/todos-list"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>No page found</h1>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
