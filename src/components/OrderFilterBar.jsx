import React, { useState } from "react";

const OrderFilterBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const [orderStatus, setOrderStatus] = useState("All Status");
  const [paymentStatus, setPaymentStatus] = useState("All Status");
  const [duration, setDuration] = useState("All");

  const paymentStatuses = ["All Status", "Paid", "Failed", "Pending"];
  const orderStatuses = [
    "All Status",
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const times = ["All", "Today", "Last 7 Days", "Last 30 Days"];

  const handleToggle = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleReset = () => {
    setOrderStatus("All");
    setPaymentStatus("All");
    setOpenDropdown(null);
  };

  const handleApply = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="border border-slate-200 rounded-xl px-4 py-3.5 flex flex-col gap-4 font-sans bg-white shadow-sm">
      <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-4">
        <div className="relative inline-block w-full max-w-xs flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-gray-500 block mb-1.5">
            Order Status
          </label>
          <button
            type="button"
            onClick={() => handleToggle("category")}
            className="flex w-full justify-between items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <span className="truncate">{orderStatus}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openDropdown === "category" ? "rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {openDropdown === "category" && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl p-1.5">
              {orderStatuses.map((status) => {
                const isSelected = orderStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setOrderStatus(status);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isSelected ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <span>{status}</span>
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-900"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative inline-block w-full max-w-xs flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-gray-500 block mb-1.5">
            Payment Status
          </label>
          <button
            type="button"
            onClick={() => handleToggle("subCategory")}
            className="flex w-full justify-between items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <span className="truncate">{paymentStatus}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openDropdown === "subCategory" ? "rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {openDropdown === "subCategory" && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl p-1.5">
              {paymentStatuses.map((status) => {
                const isSelected = paymentStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setPaymentStatus(status);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isSelected ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <span>{status}</span>
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-900"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mt-1.5 px-1.5 w-full">
        <div className=" flex-row items-center w-full max-w-xl gap-2.5">
          <label className="text-sm text-gray-500">Date</label>
          <div className="flex bg-gray-50 border border-gray-200 px-1 py-2 rounded-xl w-fit">
            {times.map((time) => {
              const isSelected = duration === time;
              return (
                <button
                  key={time}
                  onClick={() => setDuration(time)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200  ${
                    isSelected
                      ? "bg-black text-white shadow-sm" // Active state
                      : "text-gray-500 hover:text-gray-900" // Inactive state
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t pt-3 border-slate-100 w-full">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto text-sm font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 px-6 py-2 rounded-lg transition-all cursor-pointer text-slate-700"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 px-6 py-2 rounded-lg transition-all shadow-sm cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilterBar;
