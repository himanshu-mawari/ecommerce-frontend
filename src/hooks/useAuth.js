import { useGetUserProfileQuery } from "../services/userService";

const useAuth = () => {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  const isAuthenticated = !!user && !isError;

  return { user, role: user?.role, isAuthenticated, isLoading, isError };
};

export default useAuth;
