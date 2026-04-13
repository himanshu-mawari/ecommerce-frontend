import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Package, Calendar, CreditCard, MapPin } from "lucide-react";

const OrderDetail = () => {
  const { id } = useParams();
  const order = useSelector((store) => store.order.order);
  const activeOrder = order.find((o) => o.orderId.toString() === id);
  console.log(activeOrder.items);

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-600",
    confirmed: "bg-gray-100 text-gray-700",
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const { name, houseNo, state, street, district, pincode } =
    activeOrder.shippingAddress;
  return (
    <div className="min-h-screen border-t border-gray-300 py-8 pb-20 px-4 md:px-10 font-sans">
      {/* Container */}
      <div className="max-w-5xl xl:max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl tracking-tight font-semibold">
            Order Detail
          </h1>
          <p className="text-gray-600 text-sm md:text-md mt-2">
            {activeOrder.orderId}
          </p>
        </div>

        {/* Layout split starts here */}
        <div className="grid gap-8 xl:grid-cols-3">
          {/* LEFT SIDE (Main Content) */}
          <div className="xl:col-span-2 space-y-6">
            {/* Status */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <div className="p-3 rounded-xl bg-gray-50">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span
                  className={`${statusStyles[activeOrder.status]} text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider`}
                >
                  {activeOrder.status}
                </span>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  12 Apr 2026
                </p>
              </div>
            </div>

            {/* Items */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Items ({activeOrder.items.length})
              </h2>

              <div className="space-y-4">
                {activeOrder.items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm"
                  >
                    <img
                      src={item.image[0]}
                      className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <h4 className="text-gray-900 font-bold text-sm md:text-base leading-tight max-w-[80%]">
                        {item.name}
                      </h4>

                      <p className="text-gray-500 text-sm mt-1">
                        ₹ {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                Shipping Address
              </h2>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-1">{name}</h3>
                <p className="text-gray-500 text-sm mb-2">+91 98765 43210</p>
                <div className="text-gray-400 text-sm leading-relaxed">
                  B-{houseNo} {street}, {district}
                  <br />
                  {state} — {pincode}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Summary Sidebar) */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹ {formatPrice(activeOrder.totalAmount)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CreditCard size={16} />
                    Payment
                  </div>
                  <span className="font-semibold">COD</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    Order Date
                  </div>
                  <span className="font-semibold">8 Apr 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
