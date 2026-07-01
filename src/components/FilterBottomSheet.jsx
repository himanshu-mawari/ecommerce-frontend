import { X, Calendar, ChevronDown } from "lucide-react";

const FilterBottomSheet = ({
  isOpen,
  onClose,
  draftState,
  setDraftState,
  handleDraftState,
  handleApplyDraftIntoActive,
  handleApplyFilterIntoUrl,
}) => {
  const paymentStatuses = ["All", "Paid", "Failed", "Pending"];
  const orderStatuses = [
    "All",
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const times = [
    { label: "All", value: "All" },
    { label: "Today", value: "today" },
    {
      label: "Last 7 Days",
      value: "last7days",
    },
    { label: "Last 30 Days", value: "last30days" },
  ];

  const handleReset = () => {
    setDraftState({
      orderStatus: "All",
      paymentStatus: "All",
      date: "All",
    });
    onClose(false);
  };

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
                <h1 className="text-sm font-semibold text-gray-600">
                  Order Status
                </h1>
                <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-none">
                  {orderStatuses.map((status) => {
                    const isSelected =
                      draftState.orderStatus.toLowerCase() ===
                      status.toLowerCase();
                    return (
                      <button
                        onClick={() => {
                          handleDraftState("orderStatus", status);
                        }}
                      >
                        <div
                          className={`inline-block text-sm border border-gray-300 px-5 py-1.5 rounded-full ${isSelected ? "bg-black text-white " : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {status}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
            <section>
              <div>
                <h1 className="text-sm font-semibold text-gray-600">
                  Payment Status
                </h1>
                <div className="flex gap-2 mt-2 ">
                  {paymentStatuses.map((status) => {
                    const isSelected =
                      draftState.paymentStatus.toLowerCase() ===
                      status.toLowerCase();
                    console.log(isSelected);
                    return (
                      <button
                        onClick={() => {
                          handleDraftState("paymentStatus", status);
                        }}
                      >
                        <div
                          className={`inline-block text-sm border border-gray-300 px-5 py-1.5 rounded-full ${isSelected ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                          {status}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section>
              <div>
                <h1 className="text-sm font-semibold text-gray-600">Date</h1>
                <div className="w-full overflow-x-auto scrollbar-none overscroll-x-contain">
                  <div className="flex gap-2 mt-2 flex-nowrap w-max">
                    {times.map((duration) => {
                      const isSelected = draftState.date === duration.value;
                      return (
                        <button
                          onClick={() => {
                            handleDraftState("date", duration.value);
                          }}
                        >
                          <div
                            className={`inline-block text-sm border border-gray-300 w-au px-5 py-1.5 rounded-full ${isSelected ? "bg-black text-white " : "text-gray-700 hover:bg-gray-50"}`}
                          >
                            {duration.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="p-2 border-t border-gray-200 grid grid-cols-2 gap-9 bg-white md:rounded-b-[2.5rem]">
            <button
              onClick={handleReset}
              className="py-3 text-sm md:text-md text-black active:scale-95 transition-all  tracking-wide rounded-lg bg-gray-100 cursor-pointer active-scale-95 duration-100"
            >
              Reset All
            </button>
            <button
              onClick={() => {
                handleApplyFilterIntoUrl();
                handleApplyDraftIntoActive();
                onClose(false);
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
