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

  const extraItems = orderData.length - 1;

  return (
    <div className="w-full min-h-screen border-t border-gray-300 py-8 p-4 md:p-10 font-sans flex flex-col gap-6 lg:gap-8">
      <h1 className="text-5xl font-semibold mb-4 tracking-tight">My Orders</h1>
      {orderData.map((order, index) => (
        <div
          className="bg-white border border-gray-200 rounded-xl p-5 mb-4"
          key={index}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-sm geist font-medium">
              {order.orderId}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="flex  gap-4">
                <img src={order.items[0].image[0]} className="w-16 rounded-xl" alt="" />
                <h3 className="text-gray-900 font-bold geist text-md  ">
                  {order.items[0].name}
                  {extraItems > 0 && (
                    <span className="text-gray-400 ml-2 text-sm font-normal">
                      {" "}
                      +{extraItems} more
                    </span>
                  )}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-gray-900 font-bold text-lg">
                    ₹{formatPrice(order.totalAmount)}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">5-april-2026</span>
                </div>
                <Link to={`/orders/${order.orderId}`}>
                  <button className="px-4 py-2 border mt-2 border-gray-200 text-gray-700 cursor-pointer rounded-lg text-md geist font-medium  hover:bg-gray-100 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
