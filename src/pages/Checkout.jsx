import { useSelector, useDispatch } from "react-redux";
import { products } from "../assets/frontend_assets/assets";
import { increaseQuantity, decreaseQuantity } from "../store/cartSlice.js";

const Cart = () => {
  const items = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch();
  const shippingCharges = 100;

  const cartData = items
    .map((item) => {
      const product = products.find((p) => p._id === item.id);

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

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);
  console.log(cartData);

  const handleIncreaseQuantity = (id, size, quantity) => {
    return dispatch(increaseQuantity({ id, size, quantity }));
  };

  const handleDecreaseQuantity = (id, size, quantity) => {
    return dispatch(decreaseQuantity({ id, size, quantity }));
  };

  return (
    <div className="border-t border-gray-300">
      <div className="max-w-7xl lg:max-w-full mx-auto lg:grid lg:grid-cols-12 lg:gap-28 lg:items-start px-4 md:px-8  lg:px-14 xl:px-28">
        <div className="lg:col-span-8">
          <div className="">
            <div className="bg-white">
              <div className="flex flex-col items-center md:items-start pt-8 pb-6 bg-white">
                <h1 className="text-3xl lg:text-3xl font-semibold text-black mb-1">
                  Bag
                </h1>
                <div className="flex items-center text-gray-500">
                  <span className="font-medium text-lg lg:text-sm">
                    {cartData.length} {cartData.length === 1 ? "item" : "items"}
                  </span>
                  <span className="text-gray-300 text-lg  mx-2">|</span>
                  <span className="text-black font-semibold text-lg lg:text-sm">
                    ₹ {formatPrice(subTotal)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                {cartData.map((item) => (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="py-8 border-t border-gray-200"
                  >
                    <div className="flex items-start gap-5 md:gap-8">
                      <div className="w-28 h-36 lg:w-32 lg:h-44 bg-gray-50 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
                        <img
                          src={item.image[0] || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1 min-h-[144px]">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xl md:text-2xl font-medium text-black tabular-nums">
                            ₹ {formatPrice(item.price)}
                          </span>
                        </div>

                        <h2 className="text-md md:text-lg font-medium mt-1 outfit leading-tight text-gray-900">
                          {item.name}
                        </h2>

                        <p className="text-gray-400 text-sm md:text-md mt-2 font-medium">
                          14 Day Return
                        </p>

                        <div className="mt-auto">
                          <span className="text-gray-500 text-md  font-semibold border-b border-gray-500 text-md cursor-pointer inline-block ">
                            Size {item.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 ">
                      
                      <div className="flex items-center justify-between border border-gray-200 rounded-full px-2  w-28 bg-white shadow-sm">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(
                              item._id,
                              item.size,
                              item.quantity,
                            )
                          }
                          className="text-black active:scale-75 transition-transform p-1"
                        >
                          {item.quantity > 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 12h14"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          )}
                        </button>
                        <span className="text-base font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(
                              item._id,
                              item.size,
                              item.quantity,
                            )
                          }
                          className="text-black text-xl mb-1 active:scale-75 transition-transform p-1"
                        >
                          +
                        </button>
                      </div>
                      <button className="p-3 border border-gray-200 rounded-full active:bg-gray-100 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-lg md:max-w-full lg:max-w-xs lg:col-span-4 lg:sticky lg:top-24 mt-10 lg:mt-24">
          <div className="space-y-4 bg-gray-50 md:bg-white mx-4 md:mx-0 p-6 md:p-0 rounded-3xl md:rounded-none border md:border-0 border-gray-100 shadow-sm md:shadow-none">
            <h2 className="text-xl font-bold text-black md:text-2xl mb-6">
              Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between font-medium">
                <span className="text-gray-500 ">Bag Total</span>
                <span className="text-black font-semibold">
                  ₹ {formatPrice(subTotal)}
                </span>
              </div>

              <div className="flex justify-between font-medium">
                <span className="text-gray-500 ">Shipping</span>
                <span className="text-black font-semibold">
                  ₹ {shippingCharges}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-semibold text-lg lg:text-xl">Total</span>
                <span className="font-semibold text-xl lg:text-2xl text-black tabular-nums">
                  ₹ {formatPrice(subTotal + shippingCharges)}
                </span>
              </div>
            </div>

            <button className="hidden lg:block w-full bg-black text-white py-2 mt-8 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md md:max-w-full mx-auto">
          <button className="w-full bg-black text-white py-4 rounded-full font-bold text-lg active:scale-[0.97] transition-all">
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
