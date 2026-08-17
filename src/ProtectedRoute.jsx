import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast.error("You need to login first!");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;