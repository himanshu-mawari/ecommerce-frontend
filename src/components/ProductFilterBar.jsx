import React, { useState } from "react";

const ProductFilterBar = ({
  setIsDesktopFilterOpen,
  draftFilter,
  handleDraftFilterState,
  handleApplyDraftFilter,
handleApply,
}) => {
  console.log("Product filter bar read the draft stock status value :" + draftFilter.stockStatus)
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = ["All", "Men", "Women", "Kids"];
  const subCategories = ["All", "Topwear", "Bottomwear", "Wintewear"];

  const stockOptions = [
    { label: "All", value: "All" },
    { label: "Low Stock", value: "low_stock" },
    { label: "Out of Stock", value: "out_of_stock" },
  ];

  const mapStockValue = {
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
  };

  const handleToggle = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleReset = () => {
     handleDraftFilterState({
      orderStatus: "All",
      paymentStatus: "All",
      date: "All",
    });
    setOpenDropdown(null);
  };

  const handleApplyFilter = () => {
    handleApplyDraftFilter();
    handleApply();
    setOpenDropdown(null);
    setIsDesktopFilterOpen(false);
  };

  return (
    <div className="border border-slate-200 rounded-xl px-4 py-3.5 flex flex-col gap-4 font-sans bg-white shadow-sm">
      <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-4">
        <div className="relative inline-block w-full max-w-xs flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-gray-500 block mb-1.5">
            Category
          </label>
          <button
            type="button"
            onClick={() => handleToggle("category")}
            className="flex w-full justify-between items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <span className="truncate">{draftFilter.category}</span>
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
              {categories.map((category) => {
                const isSelected = draftFilter.category === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      handleDraftFilterState("category", category);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isSelected ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <span>{category}</span>
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
            Sub-Category
          </label>
          <button
            type="button"
            onClick={() => handleToggle("subCategory")}
            className="flex w-full justify-between items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <span className="truncate">{draftFilter.subCategory}</span>
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
              {subCategories.map((sub) => {
                const isSelected =
                  draftFilter.subCategory === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      handleDraftFilterState("subCategory", sub);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isSelected ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <span>{sub}</span>
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
            Stock Status
          </label>
          <button
            type="button"
            onClick={() => handleToggle("stock")}
            className="flex w-full justify-between items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <span className="truncate">
              {draftFilter.stockStatus === "All" ? draftFilter.stockStatus : mapStockValue[draftFilter.stockStatus]}
              {/* {console.log(draftFilter.stockStatus === "all")} */}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openDropdown === "stock" ? "rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {openDropdown === "stock" && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl p-1.5">
              {stockOptions.map((stock) => {
                const isSelected = draftFilter.stockStatus === stock.value;
                console.log("what is Selected stored finalise result :" + draftFilter.stockStatus , stock.value)
                return (
                  <button
                    key={stock.value}
                    type="button"
                    onClick={() => {
                      handleDraftFilterState("stockStatus", stock.value);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition-colors ${isSelected ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <span>{stock.label}</span>
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
          onClick={handleApplyFilter}
          className="w-full sm:w-auto text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 px-6 py-2 rounded-lg transition-all shadow-sm cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ProductFilterBar;
