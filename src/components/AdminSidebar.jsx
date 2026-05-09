import { Link } from "react-router-dom";
import { LuPackagePlus, LuPackageSearch, LuClipboardList } from "react-icons/lu";
import { X } from "lucide-react";

const AdminSidebar = ({ sideBar, setSideBar }) => {
  const menuItems = [
    { name: "View Orders", path: "/admin/orders", icon: <LuClipboardList /> },
    { name: "Add Product", path: "/admin/add-product", icon: <LuPackagePlus /> },
    { name: "View Products", path: "/admin/products", icon: <LuPackageSearch /> },
  ];

  return (
    <>
      {sideBar && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSideBar(false)}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 z-50
          h-screen w-64 bg-white border-l shadow-xl
          transition-transform duration-300 ease-in-out
          ${sideBar ? "translate-x-0" : "translate-x-full"}
          lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-l-0
        `}
      >
        {/* Header Section with Line */}
        <div className="flex items-center justify-between lg:justify-center p-4 border-b border-gray-100">
          <span className="text-sm font-bold tracking-widest uppercase text-gray-400 lg:block hidden">
            Management
          </span>
          <button
            onClick={() => setSideBar(false)}
            className="p-1 hover:scale-110 cursor-pointer rounded-md lg:hidden ml-auto"
          >
            <X className="size-6 text-gray-500" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col p-3">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.path}
                onClick={() => window.innerWidth < 1024 && setSideBar(false)}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:text-black hover:bg-gray-50 transition-all group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform text-gray-400 group-hover:text-black">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
              
              {/* Line separator between items, except the last one */}
              {index !== menuItems.length - 1 && (
                <div className="mx-3 my-1 border-b border-gray-50" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;