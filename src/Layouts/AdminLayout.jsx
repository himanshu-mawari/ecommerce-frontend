import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const AdminLayout = () => {
  const [sideBar, setSideBar] = useState(false);
  return (
    <div>
      <AdminHeader setSideBar={setSideBar} sideBar={sideBar} />
      <AdminSidebar sideBar={sideBar} setSideBar={setSideBar}  />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
