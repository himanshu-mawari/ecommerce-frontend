import React from "react";

const Pagination = ({start , end , totalProductCount , onPageChange , currentPage , totalPages}) => {
  return (
    <div className="mt-10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-6 px-1">
      <p className="text-sm font-medium text-gray-500 order-2 sm:order-1">
        Showing <span className="font-semibold text-gray-900">{start}</span>–
        <span className="font-semibold text-gray-900">{end}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalProductCount}</span>{" "}
        products
      </p>

      <div className="flex items-center gap-2 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-gray-200 rounded-full text-gray-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 cursor-pointer ${
                currentPage === p
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-200 rounded-full text-gray-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
