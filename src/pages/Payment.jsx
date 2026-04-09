import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { products } from "../assets/frontend_assets/assets";

const Payment = () => {
  const addresses = useSelector((store) => store.address.addresses);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
  const cart = useSelector((store) => store.cart.items);

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId,
  );
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [method, setMethod] = useState();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const cartData = cart.map((item) => {
    const product = products.find((p) => p._id === item.id);

    if (!product) {
      return null;
    }

    return product
      ? { ...product, quantity: item.quantity, size: item.size }
      : null;
  });
  const subTotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee = 100;
  const total = subTotal + shippingFee;

  return (
    <div>
      {" "}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 py-3 ml-0 px-5  flex gap-4 items-center">
        <Link to="/address/saved">
          {" "}
          <p className="cursor-pointer">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 md:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </p>
        </Link>
        <h1 className="text-md md:text-xl font-semibold">Select Address </h1>
      </div>
      <div className="pt-7 px-4 py-10">
        <div className="max-w-sm rounded-3xl border border-gray-300 p-5 mb-10 ">
          {/* Header Section */}
          <h2 className="mb-3 text-lg font-semibold geist text-gray-900">
            Deliver to {selectedAddress.name}, {selectedAddress.pincode}
          </h2>

          {/* Address Details */}
          <div className="mb-6 space-y-1 text-md text-gray-600 leading-5 font-medium geist">
            <p className="truncate">122 {selectedAddress.street}</p>
            <p className="uppercase">
              {selectedAddress.district}-{selectedAddress.pincode}
            </p>
            <p>{selectedAddress.phoneNumber || "+91-9873490461"}</p>
          </div>

          {/* Action Button */}
          <button className="w-full rounded-full border border-gray-500 py-3 text-md geist font-semibold transition-colors hover:bg-gray-50">
            Change or Add Address
          </button>
        </div>
        <div>
          <h1 className="text-lg  font-semibold inter mb-4">
            Order Information
          </h1>
          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
            {/* Trigger Header - Removed the conditional border-b */}
            <button
              onClick={() => setIsBagOpen(!isBagOpen)}
              className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50"
            >
              <span className="font-semibold inter text-gray-800">
                Delivery Estimate
              </span>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`size-4 text-gray-600 transition-transform duration-300 ${
                    isBagOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={` transition-all duration-400  ${
                isBagOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* Using a subtle bg-gray-50 here helps separate the list from the header without needing a line */}
              <div className="divide-y divide-gray-100 bg-gray-50/50">
                {cart.map((item) => {
                  const product = products.find((p) => p._id === item.id);
                  if (!product) return null;

                  return (
                    <div key={item.id} className="flex gap-4 p-5">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="h-20 w-16 rounded-lg border border-gray-100 object-cover bg-white shadow-sm"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm">Size: {item.size}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 pb-10">
          <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
            {/* Trigger Header */}
            <button
              className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsDetailOpen(!isDetailOpen)}
            >
              <span className="font-semibold inter text-gray-800">
                Price Details
              </span>

              <div className="flex items-center gap-3">
                {/* Total Price (Only shows when closed) */}
                {!isDetailOpen && (
                  <p className="font-geist text-lg font-semibold tabular-nums text-gray-900 tracking-tight">
                    ₹{formatPrice(total)}
                  </p>
                )}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`size-4 text-gray-500 transition-transform duration-300 ${
                    isDetailOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>

            {/* Expanded Details */}
            {isDetailOpen && (
              <div className="bg-gray-50/50 px-5 py-5 space-y-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                {/* Breakdown Items */}
                <div className="space-y-2.5">
                  <div className="flex justify-between text-md text-gray-500 font-medium">
                    <p className="geist">Bag Total</p>
                    <p className="font-geist  tabular-nums text-gray-900">
                      ₹{formatPrice(subTotal)}
                    </p>
                  </div>

                  <div className="flex justify-between text-md text-gray-600">
                    <p className=" geist">Shipping Fee</p>
                    <p
                      className={`font-geist font-medium tabular-nums ${shippingFee === 0 ? "text-green-600" : "text-gray-900"}`}
                    >
                      {shippingFee === 0 ? "FREE" : `+ ₹${shippingFee}`}
                    </p>
                  </div>
                </div>

                {/* Separator */}
                <div className="border-t border-dashed border-gray-300" />

                {/* Grand Total */}
                <div className="flex justify-between items-baseline">
                  <p className="font-geist font-bold text-gray-900">
                    Order Total
                  </p>
                  <p className="font-geist text-xl font-bold text-gray-900 tabular-nums tracking-tighter">
                    ₹{formatPrice(total)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-3 ">
          <h2 className="text-lg font-semibold">Payment Method</h2>

          <label className="flex items-center gap-3 border border-gray-300 p-4 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={method === "COD"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-3 border border-gray-300 p-4 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="ONLINE"
              checked={method === "ONLINE"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>Pay Online</span>
          </label>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 z-50">
        <div className="max-w-md md:max-w-full   mx-auto">
          <button
            className="w-full bg-black text-white py-3 rounded-full font-semibold  text-md geist active:scale-[0.98] transition-all shadow-lg"
          >
            Ship to this Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
