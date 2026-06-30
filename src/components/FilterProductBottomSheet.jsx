import { X } from "lucide-react";

const FilterBottomSheet = ({
  isOpen,
  onClose,
  draftFilter,
  handleDraftFilterState,
  handleApplyDraftFilter,
  handleApply,
}) => {
  const categories = ["All", "Men", "Women", "Kids"];
  const subCategories = ["All", "Topwear", "Bottomwear", "Wintewear"];
  // const stockOptions = ["All", "Low Stock", "Out of Stock"];

  const stockOptions = [
    { label: "All", value: "All" },
    { label: "Low Stock", value: "low_stock" },
    { label: "Out of Stock", value: "out_of_stock" },
  ];

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
      h-[68vh] w-full bg-white rounded-t-[2.5rem] shadow-2xl
      transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
      ${isOpen ? "translate-y-0" : "translate-y-full"}
      
      md:h-auto  md:left-1/2 md:right-auto md:-translate-x-1/2  
      
      lg:relative lg:h-auto lg:left-auto lg:right-auto lg:translate-x-0 lg:translate-y-0 lg:shadow-none lg:rounded-none lg:border-r lg:border-gray-100 lg:bottom-auto lg:max-w-none
    `}
      >
        <div className="flex flex-col h-full inter">
          <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4 lg:hidden" />
            <div className="flex justify-between items-center w-full px-6 md:px-12 pb-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Filters
              </h1>
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
              <div>
                <h1 className="text-md font-semibold text-gray-600">
                  Category
                </h1>
                <div className="flex gap-2 mt-2">
                  {categories.map((category) => {
                    const isSelected = draftFilter.category === category;
                    return (
                      <button
                        onClick={() =>
                          handleDraftFilterState("category", category)
                        }
                      >
                        <div
                          className={`inline-block text-sm border border-gray-300 px-5 py-1.5 rounded-full ${isSelected ? "bg-black text-white " : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {category}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
            <section>
              <div>
                <h1 className="text-md font-semibold text-gray-600">
                  Sub-Category
                </h1>
                <div className="flex overflow-x-auto gap-2 mt-2 scrollbar-none">
                  {subCategories.map((category) => {
                    const isSelected = draftFilter.subCategory === category;
                    return (
                      <button
                        onClick={() =>
                          handleDraftFilterState("subCategory", category)
                        }
                      >
                        <div
                          className={`inline-block text-sm border border-gray-300 px-5 py-1.5 rounded-full ${isSelected ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {category}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
            <section>
              <div>
                <h1 className="text-md font-semibold text-gray-600">
                  Stock Status
                </h1>
                <div className="flex gap-2 mt-2">
                  {stockOptions.map((status) => {
                    const isSelected = draftFilter.stockStatus === status.value;
                    return (
                      <button
                        onClick={() =>
                          handleDraftFilterState("stockStatus", status.value)
                        }
                      >
                        <div
                          className={`inline-block text-sm border border-gray-300  px-5 py-1.5 rounded-full ${isSelected ? "bg-black text-white " : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {status.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <div className="p-2 border-t border-gray-200 grid grid-cols-2 gap-9 bg-white md:rounded-b-[2.5rem]">
            <button className="py-3 text-sm md:text-md text-black active:scale-95 transition-all  tracking-wide rounded-lg bg-gray-100 cursor-pointer active-scale-95 duration-100">
              Reset All
            </button>
            <button
              onClick={() => {
                onClose(false);
                handleApplyDraftFilter();
                handleApply();    
              }}
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
