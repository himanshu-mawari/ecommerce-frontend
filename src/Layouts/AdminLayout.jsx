import AdminHeader from "../components/AdminHeader";
import AdminSlidebar from "../components/AdminSlidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <AdminSlidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
