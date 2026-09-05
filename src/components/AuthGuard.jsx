import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const {isLoading , user , isError} = useAuth();

  if (isLoading) return <div>Loading.....</div>;
  if (!user || isError) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  return children;
};

export default AuthGuard;
