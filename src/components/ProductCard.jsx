import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
const ProductCard = ({ data }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="pb-5">
      <img
        src={data.image[0]}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
      />
      <p className="text-sm pt-4 outfit text-gray-700 line-clamp-1 sm:line-clamp-2">
        {data.name}
      </p>
      <div className="flex items-center gap-3">
        <p className="text-md font-semibold pt-1 outfit text-gray-700">${data.price}</p>
        <button className="mt-1 cursor-pointer" onClick={() => setLiked(!liked)}>
          {liked ? <FaHeart /> : <FiHeart />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
