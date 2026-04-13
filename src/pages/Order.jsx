import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderCard = () => {
  const orderData = useSelector((store) => store.order.order);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const statusStyles = {
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-600",
    cancelled: "bg-red-100 text-red-700",
  };


  return (
    <div className="min-h-screen border-t border-gray-300 py-8 pb-28 lg:pb-40 lg:pt-10 px-4 md:px-10  font-sans">
      {/* Centered Container */}
      <div className="max-w-5xl xl:max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8">
        
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          My Orders
        </h1>

        {/* Grid for responsiveness */}
        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2 pt-8 ">
          {orderData.map((order, index) => {
            const extraItems = order.items.length - 1;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-gray-400 text-sm font-medium">
                    ORD: {order.orderId}
                  </span>

                  <span
                    className={`px-3 md:px-5 py-1 rounded-full text-xs md:text-sm font-semibold ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex gap-4 md:gap-6 items-start mb-3">
                  <img
                    src={order.items[0].image[0]}
                    className="w-16 md:w-20 rounded-xl"
                    alt={order.items[0].name}
                  />

                  <h3 className="text-gray-900 font-semibold text-sm md:text-lg max-w-[70%] leading-snug">
                    {order.items[0].name}
                    {extraItems > 0 && (
                      <span className="text-gray-400 ml-2 text-sm md:text-base font-normal">
                        +{extraItems} more
                      </span>
                    )}
                  </h3>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  
                  <div className="flex items-center gap-4">
                    <span className="font-semibold md:font-bold text-lg md:text-xl">
                      ₹ {formatPrice(order.totalAmount)}
                    </span>

                    <span className="text-gray-400 md:text-gray-500 text-sm md:text-base font-medium">
                      5-April-2026
                    </span>
                  </div>

                  <Link
                    to={`/orders/${order.orderId}`}
                    className="w-full md:w-auto xl:w-48"
                  >
                    <button className="w-full px-6 py-2 border border-gray-200 text-gray-700 cursor-pointer rounded-lg text-sm md:text-base font-medium hover:bg-gray-100 transition">
                      View Details
                    </button>
                  </Link>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};


export default OrderCard;
