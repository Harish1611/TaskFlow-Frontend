import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const token = useSelector((state: any) => state.auth.token);

  if (!token) return <Navigate to="/login" replace />;

  return children;
}