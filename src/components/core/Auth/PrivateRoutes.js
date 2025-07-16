// src/components/core/Auth/PrivateRoutes.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import React from "react";

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  // Debugging logs
  console.log("🔒 PrivateRoute check - Token found:", token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
