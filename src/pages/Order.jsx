import { Box, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

const OrderCard = () => {
  const orderData = useSelector((store) => store.order.order);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  console.log(orderData[0].items[0].image[0]);
  return (
    <div className="w-full min-h-screen border-t border-gray-300 py-8 p-4 md:p-10 font-sans flex flex-col gap-6 lg:gap-8">
      {orderData.map((order, index) => (
        /* Card Container - added key and removed mx-auto if you want them centered via parent, 
       but keeping mx-auto is safe for max-width constraints */
        <div
          key={order._id || index}
          className="w-full md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-3xl border border-gray-300 overflow-hidden transition-all "
        >
          {/* Header */}
          <div className="px-5 py-5 md:p-8 flex justify-between items-start">
            <div>
              <h3 className="text-slate-900 font-bold text-lg md:text-xl tracking-tight">
                Order #{order.orderId || "102913320"}
              </h3>
              <p className="text-slate-500 text-sm md:text-base mt-1">
                {order.date || "11 Apr 2026"}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1 shadow-sm text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest">
                {order.status || "Shipped"}
              </span>
              <span className="text-xs mr-2 md:text-sm text-slate-400 font-medium">
                Paid
              </span>
            </div>
          </div>

          {/* Item Info */}
          <div className="px-6 md:px-8 pb-4">
            <div className="flex items-center gap-4 md:gap-6 border-t pt-4 border-gray-100">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-[#F8FAFC] rounded-2xl flex items-center justify-center border border-slate-50 shrink-0">
                {order.items[0]?.image[0] ? (
                  <img
                    src={order.items[0].image[0]}
                    alt="product"
                    className="w-16 object-contain"
                  />
                ) : (
                  <Box
                    className="text-slate-300 w-10 h-10 md:w-12 md:h-12"
                    strokeWidth={1.5}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-slate-900 font-bold text-sm md:text-lg truncate">
                  {order.items[0]?.name}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm mt-0.5">
                  {order.items.length > 1
                    ? `+${order.items.length - 1} more item`
                    : "1 item total"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-slate-900 font-bold text-xl md:text-2xl tracking-tight">
                  ₹{formatPrice(order.totalAmount)}
                </p>
                <p className=" text-[11px] md:text-xs font-bold mt-1">
                  Est: 17 Apr 2026
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <button className="w-full py-5 md:py-6 bg-slate-50/50 hover:bg-slate-100 border-t border-gray-100 flex items-center justify-center gap-2 transition-colors group">
            <span className="text-slate-600 font-semibold text-sm md:text-base">
              View Details
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
