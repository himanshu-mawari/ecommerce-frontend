import React from 'react';

export default function OrderHeader({ orders, statusStyles }) {
  // Optional: Add a safety guard if orders array is empty or loading
  if (!orders || orders.length === 0) return null;
  
  const currentOrder = orders[0];

  return (
    <div className="p-3 font-sans antialiased border-b border-gray-100">
      <div className="flex items-center gap-4 w-full">
        {/* Semantic Back Button */}
        <button 
          onClick={() => window.history.back()} 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        {/* Content Container */}
        <div className="flex justify-between items-center flex-1">
          <div>
            <h1 className="text-sm font-semibold text-gray-900 tracking-tight">
              Order #{currentOrder.id}
            </h1>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              Placed {currentOrder.placedAt}
            </p>
          </div>
          
          {/* Your Refined Capsule */}
          <span
            className={`w-fit inline-flex items-center justify-center text-xs font-medium rounded-full px-2.5 py-1 ${statusStyles[currentOrder.status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}
          >
            {currentOrder.status}
          </span>
        </div>
      </div>
    </div>
  );
}