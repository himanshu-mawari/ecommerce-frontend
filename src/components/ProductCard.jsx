import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  useAddWishlistProductMutation,
  useGetUserWishlistQuery,
  useRemoveWishlistProductMutation
} from "../services/userService";

const ProductCard = ({ data, variant }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const [addWishlistProduct] = useAddWishlistProductMutation();
  const { data: wishlist, isLoading } = useGetUserWishlistQuery();
    const [removeWishlistProduct] = useRemoveWishlistProductMutation();
  
  let isWishlistProduct = false;
  if (!isLoading) {
    isWishlistProduct = wishlist.wishlist.some(
      (product) => product._id === data._id,
    );
  }
  const [liked, setLiked] = useState(isWishlistProduct || false);

  useEffect(() => {
    //  // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!isLoading) {
      setLiked(isWishlistProduct);
    }
  }, [isWishlistProduct, isLoading]);

  const handleWishlist = async (productId) => {
    try {
      console.log(productId)
      if(!isWishlistProduct){

        await addWishlistProduct({ productId });
      } else {
        await removeWishlistProduct({productId})
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
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
            onClick={() => {
              setLiked(!liked);
              handleWishlist(data._id);
            }}
          >
            {liked ? <FaHeart /> : <FiHeart />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
