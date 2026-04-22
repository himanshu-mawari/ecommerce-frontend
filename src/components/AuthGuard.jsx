import { useLocation, Navigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../services/userService.js";

const AuthGuard = ({ children }) => {
  const { data, isLoading, isError } = useGetUserProfileQuery();
  const location = useLocation();
  const user  = data?.user;

  if(isLoading) return <div>Loading.....</div>
  if (!user || user === "undefined") {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default AuthGuard;
