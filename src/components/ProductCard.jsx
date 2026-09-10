import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  useAddWishlistProductMutation,
  useRemoveWishlistProductMutation,
} from "../services/userService";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

const ProductCard = ({ data, variant }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const { user } = useAuth();
  const [addWishlistProduct] = useAddWishlistProductMutation();
  const [removeWishlistProduct] = useRemoveWishlistProductMutation();

  const handleWishlist = async (productId, isWishlisted) => {
    if (isWishlisted) {
      try {
        await removeWishlistProduct({ productId }).unwrap();
        toast.success("Product removed successfully");
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || "Failed removing item from wishlist");
      }
    } else {
      try {
        await addWishlistProduct({ productId }).unwrap();
        toast.success("Product added successfully");
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || "Failed adding item on wishlist");
      }
    }
  };

  const isWishlisted = user?.wishlist?.includes(data?._id);

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
              handleWishlist(data._id, isWishlisted);
            }}
          >
            {isWishlisted ? <FaHeart /> : <FiHeart />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
