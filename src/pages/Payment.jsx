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
  const [method, setMethod] = useState("COD");

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
    <div className="min-h-screen bg-gray-50/50">
      <div className="sticky top-0 z-20 bg-white border-b border-gray-300 py-3 md:py-4 px-5 md:px-11 xl:px-24 flex gap-4 items-center">
        <Link to="/address/saved">
          <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
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
          </div>
        </Link>
        <h1 className="text-md md:text-xl font-semibold">
          Select Address & Pay
        </h1>
      </div>

      <div className="max-w-350 mx-auto pt-7 px-4 md:px-10 pb-24 md:pb-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-16 lg:items-start">
          {/* LEFT COLUMN: Actions Section (Address + Payment) */}
          <div className="flex flex-col w-full lg:max-w-[700px] gap-8">
            <section>
              <h2 className="text-lg font-semibold geist  mb-4 ml-1">
                Delivery Address
              </h2>
              <div className="bg-white md:p-8 rounded-3xl border border-gray-300 p-5 ">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Deliver to {selectedAddress.name}, {selectedAddress.pincode}
                </h2>
                <div className="mb-6 space-y-1 text-md text-gray-600 leading-5 font-medium">
                  <p className="truncate">122 {selectedAddress.street}</p>
                  <p className="uppercase">
                    {selectedAddress.district}-{selectedAddress.pincode}
                  </p>
                  <p>{selectedAddress.phoneNumber || "+91-9873490461"}</p>
                </div>
                <button className="w-full md:w-auto px-8 rounded-full border border-gray-300 py-3 text-sm font-bold transition-all hover:bg-gray-50 hover:border-gray-900">
                  Change or Add Address
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold geist  mb-4 ml-1">
                Payment Method
              </h2>
              <div className="bg-white rounded-3xl border border-gray-300 overflow-hidden">
                <div className="grid divide-y divide-gray-100">
                  <label className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={method === "COD"}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold block text-gray-900">
                        Cash on Delivery
                      </span>
                      <span className="text-xs text-gray-500">
                        Pay at your doorstep
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="ONLINE"
                      checked={method === "ONLINE"}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold block text-gray-900">
                        Pay Online
                      </span>
                      <span className="text-xs text-gray-500">
                        Cards, UPI, or Netbanking
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:flex-1 w-full mt-10 lg:mt-0 lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold geist  mb-4 ml-1">
              Order Summary
            </h2>

            <div className="bg-white rounded-3xl border border-gray-300  overflow-hidden">
              {/* Bag Accordion */}
              <button
                onClick={() => setIsBagOpen(!isBagOpen)}
                className="flex w-full items-center justify-between px-6 py-5 transition-colors hover:bg-gray-50"
              >
                <span className="font-bold text-gray-800">
                  Items in Bag ({cart.length})
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`size-4 text-gray-600 transition-transform duration-300 ${isBagOpen ? "rotate-180" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-400 overflow-hidden ${isBagOpen ? "max-h-[500px] overflow-y-auto opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="divide-y divide-gray-100 bg-gray-50/30">
                  {cart.map((item) => {
                    const product = products.find((p) => p._id === item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex gap-4 p-5">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="h-16 w-14 rounded-lg border border-gray-100 object-cover bg-white "
                        />
                        <div className="flex flex-col justify-center">
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Size: {item.size}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setIsDetailOpen(!isDetailOpen)}
                className="flex w-full items-center justify-between px-6 py-5 transition-colors hover:bg-gray-50"
              >
                <span className="font-bold text-gray-800">Price Details</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`size-4 text-gray-600 transition-transform duration-300 ${isDetailOpen ? "rotate-180" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-400 overflow-hidden ${isDetailOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-5 space-y-3 bg-white">
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <p>Subtotal</p>
                    <p className="text-gray-900">₹{formatPrice(subTotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <p>Shipping Fee</p>
                    <p
                      className={`${shippingFee === 0 ? "text-green-600" : "text-gray-900"}`}
                    >
                      {shippingFee === 0 ? "FREE" : `+ ₹${shippingFee}`}
                    </p>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50/20">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900 text-lg">
                      Total Amount
                    </p>
                    <p className="text-2xl font-black text-gray-900 tracking-tighter">
                      ₹{formatPrice(total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block active:scale-95 transition-all duration-400 mt-8">
              <button className=" bg-black text-white py-4 w-full   rounded-full font-bold text-lg cursor-pointer  flex px-36">
                Confirm & {method === "COD" ? "Place Order" : "Pay"}  <p>₹
                {formatPrice(total)}</p>
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-medium">Secure SSL Checkout</span>
            </div>
          </aside>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-300 p-4 z-50">
        <div className="max-w-md md:max-w-lg mx-auto flex items-center justify-between md:gap-8  gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
              Total Amount
            </span>
            <span className="text-xl font-bold text-gray-900">
              ₹{formatPrice(total)}
            </span>
          </div>
          <button className="flex-1 bg-black   text-white py-3.5 px-4 rounded-full font-semibold geist text-md  active:scale-[0.98] transition-all">
            Confirm & {method === "COD" ? "Place Order" : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Payment;
