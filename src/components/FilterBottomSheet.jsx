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
          lg:relative lg:h-auto lg:translate-y-0 lg:shadow-none lg:rounded-none lg:border-r lg:border-gray-100
        `}
      >
        <div className="flex flex-col h-full ">
          <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4 lg:hidden" />
            <div className="flex justify-between items-center w-full px-6 pb-2">
              <h1 className="text-xl font-bold text-gray-900">Filters</h1>
              <button
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                onClick={() => onClose(false)}
              >
                <X className="size-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <section>
              <h3 className="text-md font-semibold tracking-wide mb-2">
                Status
              </h3>
              <div>
                {["Pending", "Completed", "Cancelled"].map((item) => (
                  <label
                    key={item}
                    className={`flex items-center poppins gap-2 py-2 rounded-2xl transition-all cursor-pointer ${
                      status === item
                        ? "border-indigo-600 bg-indigo-50/30 "
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
                        status === item
                          ? "border-indigo-600"
                          : "border-gray-300"
                      }`}
                    >
                      {status === item && (
                        <div className="size-2.5 bg-indigo-600 rounded-full" />
                      )}
                    </div>
                    <span className="font-light text-sm tracking-wider">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold  tracking-wide  mb-2">
                Payment
              </h3>
              <div className="flex gap-3">
                {["Paid", "Unpaid"].map((item) => (
                  <label
                    key={item}
                    className={`flex-1 text-sm text-center py-2 rounded-lg font-semibold transition-all cursor-pointer border-2 ${
                      payment === item
                        ? "bg-gray-900 border-gray-900 text-white shadow-md"
                        : "bg-white border-gray-200"
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

          <div className="p-2 border-t border-gray-100 grid grid-cols-2 gap-9 bg-white">
            <button
              onClick={() => {
                setStatus("Pending");
                setPayment("Paid");
              }}
              className="py-3  text-sm text-gray-500 font-medium hover:text-gray-700 active:scale-95 transition-all uppercase tracking-wide cursor-pointer"
            >
              Reset All
            </button>
            <button
              onClick={() => onClose(false)}
              className="py-3  text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-100 active:scale-95 transition-all cursor-pointer"
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
