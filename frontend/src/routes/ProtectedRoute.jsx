import { Navigate } from "react-router-dom";
import useProtected from "../hooks/useProtected";
import Loader from "../ArtComponents/Loader";

const UNAUTHORIZED = "401";
const FORBIDDEN = "403";

export default function ProtectedRoute({ children }) {
  const { data, loading, error } = useProtected();
  if (loading) {
    return <Loader />;
  }
  if (!data && error === UNAUTHORIZED) {
    return <Navigate to="/register" />;
  }

  if (!data && error === FORBIDDEN) {
    // TODO: Использовать refresh токен
    // А если рефреш форбиден то login
    return <Navigate to="/login" />;
  }

  return children;
}
