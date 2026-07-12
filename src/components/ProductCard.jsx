import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const ProductCard = ({ data, variant }) => {
  const [liked, setLiked] = useState(false);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div >
      <div className="aspect-3/4 rounded-lg overflow-hidden">
        <NavLink to={`/product/${data._id}`}>
          <img
            src={data.images[0].url}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        </NavLink>
      </div>
      <p className="text-sm pt-4 outfit text-gray-700 line-clamp-1 sm:line-clamp-2">
        {data.name}
      </p>
      <div className="flex items-center gap-3">
        <p className="text-md font-semibold pt-1 outfit text-gray-700">
          {formatPrice(data.price)}
        </p>
        {variant === "wishlist" ? (
          ""
        ) : (
          <button
            className="mt-1 cursor-pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? <FaHeart /> : <FiHeart />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
