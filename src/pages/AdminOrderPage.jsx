import { useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";
import FilterBottomSheet from "../components/FilterBottomSheet";

const AdminOrderPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const orders = [
    {
      id: "Order #10241",
      customer: "Rahul Sharma",
      amount: 2499,
      itemsPreview: "Nike Air Max +1 more items",
      status: "Pending",
      paymentStatus: "Paid",
      date: "15 May 2026",
      totalItems: 2,
    },
    {
      id: "ORD 10242",
      customer: "Priya Verma",
      amount: 1199,
      itemsPreview: "Oversized Black T-Shirt",
      status: "Shipped",
      paymentStatus: "Paid",
      date: "15 May 2026",
      totalItems: 1,
    },
    {
      id: "ORD-10243",
      customer: "Amit Kumar",
      amount: 3499,
      itemsPreview: "Adidas Sneakers +2 more items",
      status: "Delivered",
      paymentStatus: "Paid",
      date: "14 May 2026",
      totalItems: 3,
    },
    {
      id: "ORD-10244",
      customer: "Sneha Patel",
      amount: 899,
      itemsPreview: "Cotton Hoodie",
      status: "Cancelled",
      paymentStatus: "Refunded",
      date: "14 May 2026",
      totalItems: 1,
    },
  ];
  const statusStyles = {
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-600",
    cancelled: "bg-red-100 text-red-700",
  };

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
          <div className="flex items-center bg-indigo-700 rounded-xl px-4 py-1 gap-1 cursor-pointer hover:bg-indigo-800 active:scale-[0.98] transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            <button
              className=" text-white text-sm font-medium cursor-pointer"
              onClick={() => setIsFilterOpen(true)}
            >
              Filters
            </button>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] active:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <div className="flex flex-col">
                  <h2 className="text-[14px] font-bold text-gray-900 tracking-tight">
                    {order.id}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-0.5">
                    <span className="font-medium text-gray-700">
                      {order.customer}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>{order.date}</span>
                  </div>
                </div>

                <p className="text-[15px] font-bold text-gray-900">
                  ₹{order.amount}
                </p>
              </div>

              <div className="mt-3 mb-4">
                <p className="text-[13px] text-gray-600 font-normal line-clamp-1 pl-2">
                  {order.itemsPreview}
                </p>
              </div>

              <div className="flex justify-end">
                <span
                  className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-normal ${
                    statusStyles[order.status.toLowerCase()]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isFilterOpen && (
        <FilterBottomSheet isOpen={isFilterOpen} onClose={setIsFilterOpen} />
      )}
    </div>
  );
};

export default AdminOrderPage;
