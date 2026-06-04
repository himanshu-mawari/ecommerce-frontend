import React, { useState } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";

const FilterBottomSheet = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState();
  const [payment, setPayment] = useState("Paid");

  return (
  <>
  
  <div
    className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
    onClick={() => onClose(false)}
  />

  <div
    className={`
      fixed bottom-0 left-0 right-0 z-50
      h-[65vh] w-full bg-white rounded-t-[2.5rem] shadow-2xl
      transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
      ${isOpen ? "translate-y-0" : "translate-y-full"}
      
      md:h-auto  md:left-1/2 md:right-auto md:-translate-x-1/2  
      
      lg:relative lg:h-auto lg:left-auto lg:right-auto lg:translate-x-0 lg:translate-y-0 lg:shadow-none lg:rounded-none lg:border-r lg:border-gray-100 lg:bottom-auto lg:max-w-none
    `}
  >
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-300">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4 lg:hidden" />
        <div className="flex justify-between items-center w-full px-6 md:px-12 pb-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Filters</h1>
          <button
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors cursor-pointer"
            onClick={() => onClose(false)}
          >
            <X className="size-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-6 space-y-6 md:max-h-[60vh]">
        <section>
          <h3 className="text-md md:text-lg font-semibold tracking-wide mb-2">
            Status
          </h3>
          <div >
            {["Pending", "Delivered", "Processing", "Shipped" ,"Cancelled"].map((item) => (
              <label
                key={item}
                className={`flex items-center poppins gap-2 py-2 rounded-2xl transition-all cursor-pointer ${
                  status === item
                    ? "border-indigo-600 bg-indigo-50/30"
                    : "border-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  className="hidden"
                  checked={status === item}
                  onChange={() => setStatus(item)}
                />
                <div
                  className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    status === item ? "border-indigo-600" : "border-gray-300"
                  }`}
                >
                  {status === item && (
                    <div className="size-2.5 bg-indigo-600 rounded-full" />
                  )}
                </div>
                <span className="font-light text-sm md:text-lg tracking-wider">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm md:text-lg font-semibold tracking-wide mb-2">
            Payment
          </h3>
          <div className="flex gap-3">
            {["Paid", "Unpaid"].map((item) => (
              <label
                key={item}
                className={`flex-1 text-sm md:text-lg text-center py-2 md:py-1.5 rounded-lg font-light transition-all cursor-pointer border-2  ${
                  payment === item
                    ? "bg-gray-900 border-gray-900 text-white shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={payment === item}
                  onChange={() => setPayment(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="p-2 border-t border-gray-200 grid grid-cols-2 gap-9 bg-white md:rounded-b-[2.5rem]">
        <button
          onClick={() => {
            setStatus("Pending");
            setStatus("Paid");
          }}
          className="py-3 text-sm md:text-md text-black active:scale-95 transition-all  tracking-wide rounded-lg bg-gray-100 cursor-pointer active-scale-95 duration-100"
        >
          Reset All
        </button>
        <button
          onClick={() => onClose(false)}
          className="py-3 text-sm md:text-md bg-indigo-600 hover:bg-indigo-700 text-white font-normal rounded-lg shadow-lg shadow-indigo-100 active:scale-95 duration-100 transition-all cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</>
  );
};

export default FilterBottomSheet;
