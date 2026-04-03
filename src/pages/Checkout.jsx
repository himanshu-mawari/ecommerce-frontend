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
    <div>
      <div className="max-w-md px-4 border-b border-gray-300">
        <div className=" border-t  pb-12 border-gray-300">
          <div className="bg-white">
            <div className="flex flex-col items-center pt-8 pb-6 bg-white">
              <h1 className="text-3xl font-semibold text-black mb-3">Bag</h1>

              <div className="flex items-center text-gray-500  ">
                <span className="font-medium text-lg">
                  {cartData.length} items
                </span>

                <span className=" text-gray-300 text-lg mx-2">|</span>

                <span className="text-black geist text-lg">
                  ₹ {formatPrice(subTotal)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              {cartData.map((item) => (
                <div className="pt-10  border-t border-gray-200">
                  <div className="flex items-start gap-5">
                    <div className="w-28 h-36 bg-gray-50 flex-shrink-0">
                      <img
                        src={item.image[0] || item.image}
                        alt="product image"
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-h-[144px]">
                      {/* Price Section */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl geist font-semibold text-black tracking-normal">
                          ₹ {formatPrice(item.price)}
                        </span>
                      </div>

                      <h2 className="text-[17px] font-semibold text-black mt-1 leading-tight">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 text-sm mt-2 font-medium">
                        14 Day Return
                      </p>

                      <div className="mt-3">
                        <span className="text-gray-600 font-semibold border-b-2 border-gray-500  text-[15px] cursor-pointer inline-block">
                          Size {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2 w-32 bg-white ">
                      {/* Decrease / Delete Button */}
                      <button
                        onClick={() =>
                          handleDecreaseQuantity(
                            item._id,
                            item.size,
                            item.quantity,
                          )
                        }
                        className="text-gray-500 hover:text-black flex items-center justify-center cursor-pointer"
                        aria-label={
                          item.quantity > 1
                            ? "Decrease quantity"
                            : "Remove item"
                        }
                      >
                        {item.quantity > 1 ? (
                          // Minus Icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14"
                            />
                          </svg>
                        ) : (
                          // Trash Icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        )}
                      </button>

                      {/* Quantity Display */}
                      <span className="text-base font-bold tabular-nums text-gray-800 select-none">
                        {item.quantity}
                      </span>

                      {/* Increase Button */}
                      <button
                        onClick={() =>
                          handleIncreaseQuantity(
                            item._id,
                            item.size,
                            item.quantity,
                          )
                        }
                        className="text-gray-500 hover:text-black  flex items-center justify-center cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>

                    <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-3 z-50">
            <div className="max-w-md mx-auto">
              <button className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-900 active:scale-[0.98] transition-all">
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 space-y-4">
        <h2 className="text-xl font-semibold">Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between font-medium">
            <span>Bag Total</span>
            <span className="text-gray-700">₹ {formatPrice(subTotal)}</span>
          </div>

          <div className="flex justify-between font-medium">
            <span>Shipping Charges</span>
            <span className="text-gray-700">{shippingCharges}</span>
          </div>

          <hr className="mt-5 border-gray-200" />

          {/* Order Total */}
          <div className="flex justify-between items-center py-2">
            <span className="font-semibold text-lg">Total</span>
            <span className="font-semibold text-lg">
              ₹ {formatPrice(subTotal + shippingCharges)}
            </span>
          </div>
          <hr className="mt-2 border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
