import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiClock1 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { orders, statusStyles } from "../data/orderDetail";
import FilterBottomSheet from "../components/FilterBottomSheet";

const AdminOrderPage = () => {
  const navigate = useNavigate();
  // Assuming these states/variables are passed or handled via hooks
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  return (
    <div className="px-4 py-6 md:px-10 md:py-8 inter max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header Layout */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-light mt-0.5">
            Monitor, manage, and process customer purchases.
          </p>
        </div>

        {/* Stats - Shifted to top right on desktop/tablet to optimize room */}
        <div className="flex gap-3 w-full sm:max-w-xs md:max-w-sm">
          <div className="flex-1 flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-200 hover:border-gray-300">
            <div className="flex items-center justify-center bg-orange-50 size-9 rounded-lg flex-shrink-0">
              <CiClock1 className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
                Pending
              </span>
              <p className="text-base font-bold text-gray-900 leading-tight">
                4
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-200 hover:border-gray-300">
            <div className="flex items-center justify-center bg-red-50 size-9 rounded-lg flex-shrink-0">
              <MdOutlineCancel className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
                Cancelled
              </span>
              <p className="text-base font-bold text-gray-900 leading-tight">
                4
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        {/* Search + Filter Layout */}
        <div className="w-full flex items-center gap-3">
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all text-sm text-gray-600 placeholder:text-gray-400"
              placeholder="Search by order ID or name..."
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center bg-indigo-700  rounded-xl px-4 py-2.5 gap-2 hover:bg-gray-900 active:scale-[0.98] transition-all text-white shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <span className="text-sm font-normal tracking-wide">Filters</span>
          </button>
        </div>

        {/* MOBILE VIEW: Clean Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {orders.map((order) => (
            <Link
              to={`/admin/orders/${order.id}`}
              key={order.id}
              className="block"
            >
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm active:bg-gray-50 hover:border-gray-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 tracking-tight">
                      ORD-{order.id}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs font-light text-gray-500 mt-0.5">
                      <span className="font-normal text-gray-800">
                        {order.customer.name}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    ₹{order.amount}
                  </p>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-gray-50 flex items-center justify-between gap-4">
                  <p className="text-xs font-light text-gray-500 truncate flex-1">
                    {order.items[0].title}{" "}
                    <span className="ml-1">+{order.items.length}</span>
                  </p>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[order.status.toLowerCase()]}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* TABLET / DESKTOP VIEW: Adaptive Table Layout */}
        <div className="hidden md:block bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/75">
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[25%]">
                    Order
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell w-[20%]">
                    Date
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell w-[25%]">
                    Items
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[15%]">
                    Amount
                  </th>
                  <th className="px-6 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-[15%]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 group-hover:text-black transition-colors text-sm">
                        {order.id}
                      </p>
                      <p className="text-xs text-gray-500 font-light mt-0.5">
                        {order.customer.name}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-500 hidden lg:table-cell">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-500 hidden md:table-cell">
                      <div className="flex flex-col items-start gap-1 max-w-36  w-full">
                        <span className="truncate w-full">
                          {order.items[0].title}
                        </span>

                        <span className="text-xs text-gray-600 shrink-0">
                          +{order.items.length - 1} more items
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-sm">
                      ₹{order.payment.total}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[order.status.toLowerCase()]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isFilterOpen && (
        <FilterBottomSheet isOpen={isFilterOpen} onClose={setIsFilterOpen} />
      )}
    </div>
  );
};

export default AdminOrderPage;
