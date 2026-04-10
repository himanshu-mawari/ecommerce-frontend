import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { products } from "../assets/frontend_assets/assets";
import { addOrder } from "../store/orderSlice";
import {clearCart} from "../store/cartSlice"

const Payment = () => {
  const addresses = useSelector((store) => store.address.addresses);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
  const user = useSelector((store) => store.user.user);
  const cart = useSelector((store) => store.cart.items);


  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId,
  );
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [method, setMethod] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = user.id;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const cartData = cart
    .map((item) => {
      const product = products.find((p) => p._id === item.id);
      return product
        ? { ...product, quantity: item.quantity, size: item.size }
        : null;
    })
    .filter(Boolean);

  const subTotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee = 100;
  const total = subTotal + shippingFee;

  const handleChangeAddress = () => {
    navigate("/address/saved");
  };

 const handlePlaceOrder = () => {
  console.log("handlePlaceOrder is execute")
  if (!selectedAddress) {
    setError("Select address");
    return;
  }

  if (!method) {
    setError("Select a payment method");
    return;
  }

  const orderData = {
    userId,
    items: cartData,
    shippingAddress: selectedAddress,
    subTotal,
    shippingFee,
    totalAmount: total,
    status: "pending",
    paymentDetails: { status: "pending", method },
  };

  if (method === "COD") {
    dispatch(addOrder(orderData));
    dispatch(clearCart())
    navigation("/order-sucess")
  } else {
    console.log("Online payment flow");
  }
};

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

      <div className="max-w-7xl mx-auto pt-7 px-4 md:px-10 pb-24 md:pb-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-12 xl:gap-16 lg:items-start">
          <div className="flex flex-col w-full lg:flex-1 lg:max-w-[700px] gap-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 ml-1">
                Delivery Address
              </h2>
              <div className="bg-white md:p-8 rounded-3xl border border-gray-300 p-5 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Deliver to {selectedAddress?.name}, {selectedAddress?.pincode}
                </h2>
                <div className="mb-6 space-y-1 text-md text-gray-600 leading-5 font-medium">
                  <p className="truncate">122 {selectedAddress?.street}</p>
                  <p className="uppercase">
                    {selectedAddress?.district}-{selectedAddress?.pincode}
                  </p>
                  <p>{selectedAddress?.phoneNumber || "+91-9873490461"}</p>
                </div>
                <button
                  className="w-full md:w-auto px-8 rounded-full border border-gray-300 py-3 text-sm font-bold transition-all hover:bg-gray-50"
                  onClick={() => handleChangeAddress()}
                >
                  Change or Add Address
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 ml-1">
                Payment Method
              </h2>
              <div className="bg-white rounded-3xl border border-gray-300 overflow-hidden shadow-sm">
                <div className="grid divide-y divide-gray-100">
                  <label className="flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={method === "COD"}
                      onChange={(e) => {
                        setMethod(e.target.value);
                        setError("");
                      }}
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
                      onChange={(e) => {
                        setMethod(e.target.value);
                        setError("");
                      }}
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

          <aside className="lg:w-95 xl:w-105 w-full mt-10 lg:mt-0 lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold mb-4 ml-1">Order Summary</h2>

            <div className="bg-white rounded-3xl border border-gray-300 overflow-hidden shadow-sm">
              <button
                onClick={() => setIsBagOpen(!isBagOpen)}
                className="flex w-full items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
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
                className={`transition-all duration-400 overflow-hidden ${isBagOpen ? "max-h-[350px] overflow-y-auto opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="divide-y divide-gray-100 bg-gray-50/30">
                  {cartData.map((item) => (
                    <div key={item._id} className="flex gap-4 p-5">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="h-16 w-14 rounded-lg border border-gray-100 object-cover bg-white shadow-sm"
                      />
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} | Size: {item.size}
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            ₹{formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsDetailOpen(!isDetailOpen)}
                className="flex w-full items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
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
                className={`transition-all duration-400 overflow-hidden ${isDetailOpen ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-5 space-y-3 bg-white">
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <p>Subtotal</p>
                    <p className="text-gray-900">₹{formatPrice(subTotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <p>Shipping Fee</p>
                    <p
                      className={
                        shippingFee === 0
                          ? "text-green-600 font-bold"
                          : "text-gray-900"
                      }
                    >
                      {shippingFee === 0 ? "FREE" : `+ ₹${shippingFee}`}
                    </p>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900 text-lg">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold geist tracking-tighter">
                      ₹ {formatPrice(total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm mt-3 ml-2 text-red-500">
              {error ? error : ""}
            </p>

            <div className="hidden lg:block mt-8">
              <button
                className="bg-black text-white py-4 w-full rounded-full font-semibold geist text-lg cursor-pointer flex items-center justify-center gap-3 active:scale-95 transition-all duration-400 shadow-xl hover:bg-gray-900 whitespace-nowrap px-6"
                onClick={() => handlePlaceOrder()}
              >
                <span>
                  Confirm & {method === "COD" ? "Place Order" : "Pay"}
                </span>
                <span className="pl-3 border-l border-white/30 font-semibold geist tracking-tight">
                  ₹ {formatPrice(total)}
                </span>
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium uppercase tracking-wider">
                  Secure SSL Checkout
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
              Total Amount
            </span>
            <span className="text-xl font-bold text-gray-900 leading-none">
              ₹{formatPrice(total)}
            </span>
          </div>
          <button className="flex-1 bg-black text-white py-4 px-6 rounded-full font-semibold geist   text-md active:scale-95 transition-all shadow-lg whitespace-nowrap">
            Confirm & {method === "COD" ? "Order" : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
