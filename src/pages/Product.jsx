import { useParams } from "react-router-dom";
import { products } from "../assets/frontend_assets/assets";
import { useState } from "react";
import QuantitySelector from "../components/QuantitySelector.jsx";
import DescriptionAccordion from "../components/DescriptionAccordion.jsx";
import RelatedProduct from "../components/RelatedProduct.jsx";
import Reviews from "../components/Reviews.jsx";
import { FiStar } from "react-icons/fi";

const Product = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");

  const activeProduct = [...products].find((p) => p._id === id);
  console.log(activeProduct);
  const formatPrice = (price) =>
    "Rs. " +
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="px-5 md:pt-10 max-w-2xl md:max-w-full md:px-10 flex flex-col xl:flex-row">
      <div className="flex flex-col md:flex-row-reverse items-center md:items-start justify-center md:justify-end gap-3 md:gap-7">
        <img
          src={activeProduct.image}
          className="mb-3 w-7/12 xl:w-9/12 rounded-xl object-cover"
          alt="Product Main"
        />
        <div className="flex md:flex-col gap-2">
          <img
            src={activeProduct.image}
            className="w-20  rounded-lg border border-gray-200 cursor-pointer hover:border-black transition-all object-cover"
            alt="Product Thumb"
          />
        </div>
      </div>
      <div>
        <div>

        <div className="pt-10">
          <h1 className="text-2xl md:text-3xl font-bold outfit tracking-tight text-gray-900">
            {activeProduct.name}
          </h1>
          <div className="flex items-center pt-2 gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar className="w-4 text-yellow-500 " key={i} />
            ))}

            <p className="text-sm text-gray-500 ml-1">
              ({activeProduct.reviews ? activeProduct.reviews.length : 0})
            </p>
          </div>
        </div>

        <div className="py-4">
          <h1 className="text-3xl md:text-4xl text-black">
            {formatPrice(activeProduct.price)}
          </h1>
        </div>

        <div className="mt-5">
          <div>
            <h1 className="text-base md:font-bold font-semibold mb-3">
              Select Size
            </h1>
          </div>
          <div className="flex gap-2 md:gap-4">
            {sizes.map((size) => (
              <button
              key={size}
              className={`py-3 px-5 rounded-lg border transition-all duration-200  font-medium ${
                selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="py-6 flex flex-col gap-2">
          <QuantitySelector />
        </div>

        <div className="pt-4 pb-10">
          <button className="w-full sm:w-auto md:w-sm text-black border px-10 py-4 text-sm font-bold rounded-lg hover:bg-black hover:text-white cursor-pointer active:scale-[0.98] transition-all uppercase tracking-widest">
            Add to Cart
          </button>
        </div>
            </div>

        <div className="border-b py-3 ">
          <DescriptionAccordion description={activeProduct.description} />
        </div>

        <div className="pt-28">
          <RelatedProduct currentProduct={activeProduct} />
        </div>
        <div className="py-6 flex flex-col justify-center">
          <Reviews productReview={activeProduct.reviews} />
        </div>
      </div>
    </div>
  );
};

export default Product;
