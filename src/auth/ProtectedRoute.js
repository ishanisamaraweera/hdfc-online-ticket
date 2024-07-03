import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "./Auth";

export const ProtectedRoute = ({ children }) => {
  const auth = Auth.isAuthenticated();
  return auth ? children : <Navigate to="/login" />;
};
