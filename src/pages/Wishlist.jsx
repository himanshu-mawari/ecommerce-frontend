import React from "react";
import ProductCard from "../components/ProductCard";
import {
  useGetUserWishlistQuery,
  useRemoveWishlistProductMutation,
} from "../services/userService";
import EmptyWishlist from "../components/EmptyWishlist";

const Wishlist = () => {
  const { data: wishlist, isLoading } = useGetUserWishlistQuery();
  const [removeWishlistProduct] = useRemoveWishlistProductMutation();

  if (isLoading) {
    return <div>hey dev be patient , nature reward only to patient person</div>;
  }
  const wishlistData = wishlist.wishlist;

  if (!wishlistData) {
    return <EmptyWishlist />;
  }

  const handleRemoveWishlist = async (productId) => {
    try {
      await removeWishlistProduct({productId});
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 border-t">
      <div className="py-8 xl:py-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl  font-semibold">
          Wishlist
        </h1>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        {wishlistData.map((product) => (
          <div className="relative" key={product._id}>
            <ProductCard data={product} variant="wishlist" />
            <div
              className="absolute top-1 right-2 z-10"
              onClick={() => handleRemoveWishlist(product._id)}
            >
              <span
                className="bg-gray-100 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-200 transition-colors
              w-8 h-8 p-1.5 
                     sm:w-10 sm:h-10 sm:p-2 
                     md:w-12 md:h-12 md:p-2.5 
                     lg:w-14 lg:h-14 lg:p-3 
                     xl:w-16 xl:h-16 xl:p-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x w-full h-full"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </span>
            </div>
            <div className="border border-gray-300 my-1  rounded-full inline-block text-xs md:text-lg">
              <button className="py-1.5 px-5 md:px-10 md:py-2">
                Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
