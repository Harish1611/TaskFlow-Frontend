import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }: any) {
  const token = useSelector((state: any) => state.auth.token);

  if (token) return <Navigate to="/dashboard" replace />;

  return children;
}