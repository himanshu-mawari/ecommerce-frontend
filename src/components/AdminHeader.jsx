import { assets } from "../assets/assets.js";

const AdminHeader = () => {
  
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b ">
        <div>
          <h1 className="monteserrat tracking-tighter font-medium text-4xl flex items-end">
            FOREVER
            <span className="mb-2 ml-1 h-2 w-2 rounded-full bg-indigo-300" />
          </h1>
          <p className="text-xs text-gray-500 -mt-1">Admin Panel</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-medium">
            M
          </div>
          <img
            src={assets.menuIcon}
            className="w-6 cursor-pointer lg:hidden"
            alt="menu"
          />
        </div>
      </div>
      
    </div>
  );
};

export default AdminHeader;
