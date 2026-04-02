import { useSelector } from "react-redux";
import { products } from "../assets/frontend_assets/assets";

const Cart = () => {
  const items = useSelector((store) => store?.cart?.items);

  const cartData = items.map((item) => {
    const product = products.find((p) => p._id === item.id);

    return product
      ? { ...product, quantity: item.quantity, size: item.size }
      : null;
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);
  console.log(cartData);

  return (
    <div className="max-w-md px-4 border-t border-b pb-12 border-gray-300">
      <div className="bg-white">
        <div className="flex flex-col items-center pt-8 pb-6 bg-white">
          <h1 className="text-3xl font-semibold text-black mb-3">Bag</h1>

          <div className="flex items-center text-gray-500  ">
            <span className="font-medium text-lg">{cartData.length} items</span>

            <span className="mx-1 text-gray-300 text-lg mx-2">|</span>

            <span className="text-black geist text-lg">₹28,422</span>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {cartData.map((item) => (
            <div className="pt-10  border-t border-gray-200">
              <div className="flex items-start gap-5">
                <div className="w-28 h-36 bg-gray-50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt="product image"
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>

                <div className="flex flex-col flex-1 min-h-[144px]">
                  {/* Price Section */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl archivo font-semibold text-black tracking-normal">
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
                <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-5 bg-white ">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  <span className="text-lg font-semibold min-w-[12px] text-center">
                    1
                  </span>

                  <button className="text-2xl font-medium hover:text-black transition-colors leading-none pb-1">
                    +
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
    </div>
  );
};

export default Cart;
