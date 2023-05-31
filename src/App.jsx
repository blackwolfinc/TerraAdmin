import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import DashboardLayout from "layouts/dashboard";
import AuthLayout from "layouts/auth";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="dashboard/*" element={<DashboardLayout />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
