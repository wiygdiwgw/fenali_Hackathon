import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Malik/Login";
import Register from "../components/Malik/Register";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default MainRoutes;
