import { useParams } from "react-router-dom";
import { useState } from "react";
import QuantitySelector from "../components/QuantitySelector.jsx";
import DescriptionAccordion from "../components/DescriptionAccordion.jsx";
import RelatedProduct from "../components/RelatedProduct.jsx";
import Reviews from "../components/Reviews.jsx";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { addProduct } from "../store/cartSlice.js";
import { useDispatch } from "react-redux";
import Toast from "../components/Toast.jsx";
import {
  useGetProductByIdQuery,
} from "../services/productService.js";

const Product = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { data, isLoading } = useGetProductByIdQuery(id);

  
  if (isLoading) return <div>Loading....</div>;

  const activeProduct = data?.data;
  const formatPrice = (price) =>
    "Rs. " +
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleAddProduct = () => {
    if (!selectedSize) {
      return setError("Please select a size");
    }

    setError("");
    dispatch(
      addProduct({
        id: activeProduct._id,
        size: selectedSize,
        quantity,
      }),
    );
    setSelectedSize(null);
    setToastMessage("Item added to cart");
    setShowToast(true);
  };
  return (
    <div className="border-t border-gray-200  px-3 w-full md:px-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
        <div className="flex flex-col md:flex-row-reverse gap-4 items-start justify-start">
          <img
            src={activeProduct.images[0].url}
            className="w-full max-w-xs md:max-w-xl lg:max-w-lg xl:max-w-120 rounded-xl object-cover"
          />

          <div className="flex md:flex-col gap-2">
            <img
              src={activeProduct.images[0].url}
              alt="Thumbnail"
              className="w-16 md:w-20 rounded-lg border border-gray-200 cursor-pointer hover:border-black"
            />
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <div className="pt-4">
            <h1 className="text-2xl md:text-3xl  font-bold tracking-tight text-gray-900">
              {activeProduct.name}
            </h1>

            <div className="flex items-center pt-2 gap-1">
              {[...Array(5)].map((_, i) =>
                i < 1 ? (
                  <FaStar key={i} size={18} className="text-yellow-500" />
                ) : (
                  <FiStar key={i} size={18} className="text-yellow-500" />
                ),
              )}
              <p className="text-sm text-gray-500 ml-1">
                ({activeProduct.reviews ? activeProduct.reviews.length : 0})
              </p>
            </div>
          </div>

          <div className="py-4">
            <h2 className="text-3xl md:text-4xl text-black">
              {formatPrice(activeProduct.price)}
            </h2>
          </div>

          <div className="mt-5">
            <h3 className="text-base font-semibold md:font-bold mb-3">
              Select Size
            </h3>

            <div className="flex gap-2 md:gap-4 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-5 rounded-lg border font-medium transition-all ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-red-500 pt-2">{error}</p>}

          <div className="py-6">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          <div className="pt-2 pb-8">
            <button
              className="w-full md:w-md xl:w-full px-10 py-4 text-sm font-bold rounded-lg border text-black hover:bg-black hover:text-white active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer"
              onClick={() => handleAddProduct()}
            >
              Add to Cart
            </button>
          </div>

          <div className="border-b py-3">
            <DescriptionAccordion description={activeProduct.description} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <RelatedProduct productId={id} />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Reviews productReview={activeProduct.reviews} />
      </div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        setIsVisible={setShowToast}
        duration={2500}
      />
    </div>
  );
};

export default Product;
