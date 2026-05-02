import { useLocation, Navigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../services/userService.js";

const AuthGuard = ({ children }) => {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  const location = useLocation();
  if (isLoading) return <div>Loading.....</div>;
  if (!user || isError) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  return children;
};

export default AuthGuard;
