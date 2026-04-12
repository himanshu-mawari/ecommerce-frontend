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
    <div className="max-w-3xl mx-auto  md:p-8 font-sans border-t border-gray-300 py-8 pb-20 min-h-screen">
      <div className=" mb-10 px-4">
        <h1 className="text-5xl tracking-tight font-semibold">Order Detail</h1>
        <p className="text-gray-600 text-md ml-2 mt-2 ">
          69bd765ab3250abe9b9f141d
        </p>
      </div>
      <p className="border-t border-gray-100 pb-4"></p>
      <div className="px-4">
        {/* 1. Order Status Header */}
        <div className="bg-white border border-gray-200 rounded-2xl  p-4 mb-6 flex items-center gap-3 shadow-sm">
          <div className=" p-3 rounded-xl">
            <Package className=" w-6 h-6" />
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

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4">
            <span className="text-gray-500 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              ₹ {formatPrice(activeOrder.totalAmount)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CreditCard size={16} /> <span>Payment</span>
              </div>
              <span className="font-semibold  text-sm">COD</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={16} /> <span>Order Date</span>
              </div>
              <span className="font-semibold  text-sm">8 Apr 2026</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            Items <span className="text-gray-400 font-normal text-sm">(3)</span>
          </h2>
          {activeOrder.items.map((item) => (
            <div
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              key={item._id}
            >
              <div className={`p-4 flex gap-4 items-center `}>
                <img
                  src={item.image[0]}
                  className="w-20 h-20  rounded-xl border border-gray-100 bg-gray-50"
                  alt={item.image}
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 font-bold text-sm leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹ {formatPrice(item.price)}
                    <span className="mx-1">×</span> {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-gray-400" /> Shipping Address
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-1">{name}</h3>
            <p className="text-gray-500 text-sm mb-2">+91 98765 43210</p>
            <div className="text-gray-400 text-sm leading-relaxed">
              B-{houseNo}{" "}
              {street},{" "}{district}
              <br />
              {state} — {pincode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
