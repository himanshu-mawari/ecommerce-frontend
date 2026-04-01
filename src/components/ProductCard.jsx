import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const ProductCard = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <NavLink to={`/product/${data._id}`}>
      <div className="pb-5">
        <img
          src={data.image[0]}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
        />
        <p className="text-sm pt-4 outfit text-gray-700 line-clamp-1 sm:line-clamp-2">
          {data.name}
        </p>
        <div className="flex items-center gap-3">
          <p className="text-md font-semibold pt-1 outfit text-gray-700">
            {formatPrice(data.price)}
          </p>
          <button
            className="mt-1 cursor-pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? <FaHeart /> : <FiHeart />}
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
