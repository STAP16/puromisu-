import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../ArtComponents/Loader";
import { useEffect } from "react";

const UNAUTHORIZED = "401";
const FORBIDDEN = "403";

export default function ProtectedRoute({ children }) {
  const { userData, loading } = useAuth();

  if (loading) return <Loader />; // показываем Loader пока идёт fetch/refresh
  if (!userData) return <Navigate to="/login" replace />; // если нет данных → login

  return children;
}
