import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { products } from "../assets/frontend_assets/assets";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const order = useSelector((store) => store.order.order);

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const cartData = order[0].items
    .map((item) => {
      const product = products.find((p) => p._id === item._id);

      if (!product) {
        return null;
      }

      return product
        ? { ...product, quantity: item.quantity, size: item.size }
        : null;
    })
    .filter(Boolean);

  const subTotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subTotal + 100;
  return (
    <div className="flex flex-col  items-center py-10  px-4 border-t border-gray-300 min-h-screen">
      {/* Outer Container mimicking the screenshot's rounded layout */}
      <div className="bg-white rounded-[3rem] w-full max-w-3xl overflow-hidden text-center md:border border-gray-300 p-8 md:p-12">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#66bb6a] p-5 rounded-full text-white shadow-lg shadow-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        {/* Text Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Thank you for your purchase
        </h2>
        <p className="text-gray-500 text-lg">
          We've received your order and it will ship in 5-7 business days.
        </p>
        <p className="text-gray-500 text-lg mb-10">
          Your order number is{" "}
          <span className="font-semibold text-black">#102913320</span>
        </p>

        {/* Order Summary Section */}
        <div className="max-w-md mx-auto border border-gray-100 rounded-[2rem] bg-white shadow-sm overflow-hidden">
          {/* Accordion: Bag */}
          <button
            onClick={() => setIsBagOpen(!isBagOpen)}
            className="w-full flex justify-between items-center px-6 py-5 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <span className="text-lg font-semibold geist text-gray-800">
              Bag
            </span>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm font-medium">
                {order[0].items.length} Items
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-300 ${isBagOpen ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </button>

          {isBagOpen && (
            <div className="bg-[#fafafa] px-6 py-2 divide-y divide-gray-100">
              {order[0].items.map((item) => {
                const product = products.find((p) => p._id === item._id);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex gap-4 py-4 text-left">
                    <img
                      src={product.image[0]}
                      className="w-14 h-14 object-cover rounded-xl bg-gray-200"
                      alt=""
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Size: {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      ₹{formatPrice(product.price * item.quantity)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Accordion: Price Details */}
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full flex justify-between items-center px-6 py-5 hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-semibold geist text-gray-800">
              Total
            </span>
            <div className="flex items-center gap-2">
              {isPriceOpen ? (
                ""
              ) : (
                <span className="text-lg font-semibold text-black">
                  ₹{total}
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isPriceOpen ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </button>

          {isPriceOpen && (
            <div className="px-6 pb-6 pt-2 bg-white space-y-3 text-sm animate-in fade-in slide-in-from-top-1">
              <div className="flex justify-between text-gray-500">
                <span>Bag Total</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">+ ₹100</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-base text-black">
                <span>Order Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-12 px-12 py-3.5 border border-black rounded-full font-bold text-black hover:bg-black hover:text-white transition-all duration-300 transform active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
