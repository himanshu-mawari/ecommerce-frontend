import React, { useState } from "react";

const FilterRow = () => {
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");

  const handleReset = () => {
    setStatus("");
    setPayment("");
  };

  const handleApply = () => {
    console.log("Applying filters:", { status, payment });
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[140px] w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium cursor-pointer transition-colors focus:outline-none focus:border-slate-400 appearance-none"
          >
            <option value="">Status: All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        <div className="relative min-w-[150px] w-full sm:w-auto">
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium cursor-pointer transition-colors focus:outline-none focus:border-slate-400 appearance-none"
          >
            <option value="">Payment: All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="refunded">Refunded</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 w-full sm:w-auto">
        <button
          onClick={handleReset}
          className="w-full sm:w-auto sm:max-w-32 text-sm font-medium border border-slate-200 bg-slate-100 hover:bg-slate-50 px-6 py-2 rounded-lg active:bg-slate-200 transition-all cursor-pointer active:scale-95 duration-100 text-slate-700"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="w-full sm:w-auto sm:max-w-32 text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 active:scale-95 px-6 py-2 rounded-lg transition-all duration-150 shadow-sm cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterRow;
