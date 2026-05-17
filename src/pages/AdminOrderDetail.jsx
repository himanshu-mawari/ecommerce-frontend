import React from "react";
import { TbCancel } from "react-icons/tb";
import { FiPackage, FiChevronRight } from "react-icons/fi";
import { CiClock1, CiCircleCheck } from "react-icons/ci";
import { orders, orderItems, statusStyles } from "../data/orderDetail";

const AdminOrderDetail = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-20 font-sans text-gray-900">
      <div className="flex items-center gap-4 w-full">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <div className="flex justify-between items-center flex-1">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Order #{orders[0].id}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Placed {orders[0].placedAt}
            </p>
          </div>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              statusStyles[orders[0].status.toLowerCase()] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {orders[0].status}
          </span>
        </div>
      </div>

      <div className="py-8 space-y-6">
        <div className="p-5 border rounded-xl shadow-sm border-gray-200 bg-white">
          <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Workflow
          </h2>
          <p className="text-base font-semibold mt-1">
            Next step: Mark as shipped
          </p>
          <button className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 shadow-sm gap-2 mt-5 hover:bg-gray-50 transition-colors text-sm font-medium">
            <TbCancel className="size-4 text-red-500" />
            <span>Cancel order</span>
          </button>
        </div>

        <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
            Order Timeline
          </h2>
          <div className="space-y-0">
            <div className="relative flex gap-4 pb-8">
              <div className="absolute left-3.5 top-8 bottom-0 w-px bg-gray-200"></div>
              <div className="relative z-10 bg-white rounded-full">
                <FiPackage className="border p-1.5 size-8 rounded-full text-blue-600 bg-blue-50 border-blue-100" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Order Placed</h3>
                <span className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                  <CiClock1 className="size-3" /> May 15, 2026 • 9:45 PM
                </span>
              </div>
            </div>

            <div className="relative flex gap-4 pb-8">
              <div className="absolute left-3.5 top-8 bottom-0 w-px bg-gray-200"></div>
              <div className="relative z-10 bg-white rounded-full">
                <CiCircleCheck className="border p-1.5 size-8 rounded-full text-green-600 bg-green-50 border-green-100" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm">Confirmed</h3>
                <span className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                  <CiClock1 className="size-3" /> May 15, 2026 • 10:10 PM
                </span>
              </div>
            </div>

            <div className="relative flex gap-4">
              <div className="relative z-10 bg-white rounded-full">
                <FiPackage className="border p-1.5 size-8 rounded-full text-gray-400 bg-gray-50 border-gray-200" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm text-gray-500">Packed</h3>
                <span className="text-gray-400 text-xs mt-1 italic">
                  Pending completion
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Payment Summary
            </h2>
            <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase">
              Paid
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-sm text-gray-500">Method</span>
            <span className="text-sm font-medium uppercase text-gray-700">
              Cash on Delivery
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">₹689.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">₹100.00</span>
            </div>
            <div className="flex justify-between pt-3 mt-2 border-t border-gray-200">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">₹789.00</span>
            </div>
          </div>
        </div>

        <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Items ({orderItems.length})
          </h2>
          <div className="divide-y divide-gray-100">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex py-4 gap-4 first:pt-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-50 border border-gray-100"
                />
                <div className="flex flex-col justify-center flex-1">
                  <p className="text-sm font-bold text-gray-900 line-clamp-1">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>Size: {item.size}</span>
                    <span className="text-gray-300">|</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Info */}
          <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Customer
            </h2>
            <div className="mt-4 space-y-3">
              <p className="font-bold text-gray-800">Amelia Hartwell</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>amelia.hartwell@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z"
                    />
                  </svg>
                  <span>+1 (415) 555-0142</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Shipping Address
            </h2>
            <div className="mt-4 flex gap-3">
              <svg
                className="size-5 text-gray-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="font-bold text-gray-800">Amelia Hartwell</p>
                <p>248 Folsom Street, Apt 7B</p>
                <p>South of Market</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button className="w-full flex items-center justify-between px-5 py-4 bg-[#0b1329] active:bg-[#162245] text-white rounded-xl shadow-lg text-sm font-semibold tracking-wide transition-all duration-150">
          <span>Mark as shipped</span>
          <FiChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
