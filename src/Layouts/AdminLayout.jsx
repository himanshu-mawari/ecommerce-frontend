import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const AdminLayout = () => {
  const [sideBar, setSideBar] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader setSideBar={setSideBar} sideBar={sideBar} />
      <div
        className="flex flex-1 overflow-hidden"
      >
        <AdminSidebar sideBar={sideBar} setSideBar={setSideBar} />
        <div className="flex-1 overflow-y-auto lg:overflow-hidden ">

        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
