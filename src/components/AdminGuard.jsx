import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminGuard = () => {
  const { user, role, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent sm:h-10 sm:w-10 sm:border-3 md:h-12 md:w-12 md:border-4 2xl:h-16 2xl:w-16 2xl:border-[5px]" />
      </div>
    );

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default AdminGuard;
