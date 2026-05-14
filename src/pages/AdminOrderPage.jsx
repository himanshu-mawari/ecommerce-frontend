import { useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";
import FilterBottomSheet from "../components/FilterBottomSheet";

const AdminOrderPage = () => {
  const [isFilterOpen , setIsFilterOpen] = useState(false)
  return (
    <div className="p-5 inter">
      <div>
        <h1 className="text-3xl font-medium inter mb-0.5">Orders</h1>
        <p className="text-xs text-gray-500">
          Monitor, manage, and process customer purchases.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2 mt-5 w-full">
          <div className="flex-1 flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center justify-center bg-orange-50  w-9 h-9 rounded-lg text-2xl">
              <CiClock1 className="w-4 h-4 text-orange-400" />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase ">
                Pending
              </span>
              <p className="text-base font-semibold text-gray-900">4</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-center justify-center bg-red-50  w-9 h-9 rounded-lg text-2xl">
              <MdOutlineCancel className="w-4 h-4 text-red-400" />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                Cancelled
              </span>
              <p className="text-base font-semibold text-gray-900">4</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all text-xs text-gray-600 placeholder:text-gray-400"
              placeholder="Search by order Id and customer name.."
            />
          </div>
          <button className="bg-indigo-700 text-white px-4 py-1 rounded-xl text-sm font-medium cursor-pointer hover:bg-indigo-800 active:scale-[0.98] transition-all duration-200" onClick={() => setIsFilterOpen(true)}>
            Filters
          </button>
        </div>
      </div>
      {isFilterOpen && <FilterBottomSheet isOpen={isFilterOpen} onClose={setIsFilterOpen} />}
    </div>
  );
};

export default AdminOrderPage;
