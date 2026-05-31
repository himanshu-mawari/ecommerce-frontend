import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminGuard = () => {
  const user = useSelector((store) => store?.user?.user);
  // if (!user) {
  //   return <Navigate to={"/admin/login"} replace />;
  // }

  // if(user && user.role !== "admin"){
  //   return <Navigate to={"/"} replace />
  // }

  return <Outlet />;
};

export default AdminGuard;
