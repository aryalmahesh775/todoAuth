import React, { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../../service/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleSignOut = async () => {
    try {
      const result = await logout();
      if (result.status === "success") {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again later");
    }
  };

  const handleLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-200 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-gray-800">
            <h2 className="">LOGO</h2>
          </div>
        </div>
        <div className="flex lg:space-x-6 ">
          {isAuthenticated ? (
            <div
              className="flex items-center text-gray-800 focus:outline-none relative "
              onClick={toggleDropDown}
            >
              <img
                src={
                  user?.profileImage ||
                  "https://imgs.search.brave.com/K7uQVQ8SQuKrFcazFMq6mOJXjXfZyJG8uAETeeofWGI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19oeWJyaWQ"
                }
                alt="user"
                className="w-8 h-8 cursor-pointer rounded-full object-cover"
              />
              <span className="ml-2 cursor-pointer">{user?.name}</span>
              {dropDownOpen && (
                <div className="absolute right-0 top-10 left-4 mt-2 w-48 h-24 bg-white shadow-lg border border-gray-300 rounded">
                  <button className="block px-2 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 w-full text-left">
                    Profile
                  </button>
                  <button
                    className="block px-2 py-2 cursor-pointer text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={handleSignOut}
                  >
                    SignOut
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={handleLoginPage}
                className="block px-2 py-1 bg-gray-300 rounded-md cursor-pointer text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
