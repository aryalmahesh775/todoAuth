import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }:any) => {
  const { isAuthenticated } = useSelector((state:any) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;

  // return isAuthenticated ? children : <Navigate to="/login"  />;
  // return isAuthenticated ? children : children;
};
