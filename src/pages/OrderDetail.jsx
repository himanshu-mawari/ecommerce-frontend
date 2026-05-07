import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../services/orderService";

import { Package, Calendar, CreditCard, MapPin } from "lucide-react";

const OrderDetail = () => {
  const { orderId } = useParams();

  const { data: order, isLoading } = useGetSingleOrderQuery(orderId);
  if (isLoading) return <div></div>;

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

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const { name, phone, houseNo, state, street, district, pincode } =
    order.shippingAddress;

  return (
    <div className="min-h-screen border-t border-gray-300 py-8 pb-20 px-4 md:px-10 font-sans">
      <div className="max-w-5xl xl:max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl tracking-tight font-semibold">
            Order Detail
          </h1>
          <p className="text-gray-600 text-sm md:text-md mt-2">{order._id}</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <div className="p-3 rounded-xl bg-gray-50">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span
                  className={`${statusStyles["pending"]} text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider`}
                >
                  {order.status}
                </span>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Items ({order.items.length})
              </h2>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={order._id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm"
                  >
                    <img
                      src={item.image}
                      className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50"
                      alt="nick jonas"
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

            <div className="max-w-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                Shipping Address
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 capitalize">
                    {name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    +91 {phone}
                  </p>
                </div>

                <div className="h-px bg-gray-100 w-full mb-4" />

                <div className="text-sm leading-relaxed">
                  <div className="font-medium text-gray-900">
                    {houseNo}, {street}
                  </div>
                  <div className="text-gray-500 mt-0.5">
                    {district}, {state}
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="tracking-wider text-gray-600">
                      {pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹ {formatPrice(order.totalAmount)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CreditCard size={16} />
                    Payment
                  </div>
                  <span className="font-semibold">
                    {order.paymentDetails.method}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    Order Date
                  </div>
                  <span className="font-semibold">
                    {formatDate(order.createdAt)}
                  </span>
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
