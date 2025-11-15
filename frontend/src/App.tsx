import type { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import ForgotPassword from "./pages/ForgetPassword"; 
import ResetPassword from "./pages/ResetPassword";

// Protected Route Component
function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Todos />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
