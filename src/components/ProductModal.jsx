import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useAddToCartMutation } from "../services/cartService";
import { SIZES } from "../helpers/constant";
import { toast } from "sonner";
import { useRemoveWishlistProductMutation } from "../services/userService";

const ProductModal = ({ product, setActiveProduct }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [index, setIndex] = useState(0);

  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [removeWishlistProduct, { isLoading: isRemoving }] =
    useRemoveWishlistProductMutation();

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    const payload = {
      productId: product._id,
      size: selectedSize,
      quantity: 1,
    };
    try {
      await addToCart(payload).unwrap();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed add to cart");
      return;
    }
    try {
      await removeWishlistProduct({ productId: product._id }).unwrap();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed removed from wishlist");
      return;
    }
    setActiveProduct(null);
    toast.success("Successfully move to bag");
  };

  const formatPrice = (price) =>
    "Rs. " +
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  const isSubmitting = isAdding || isRemoving;
  const lastIndex = (product?.images?.length ?? 1) - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 sm:p-4 touch-none overscroll-contain"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col sm:flex-row max-h-[90vh] sm:max-h-[520px] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl touch-auto animate-in slide-in-from-bottom duration-300 sm:animate-none"
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-1 items-center justify-center bg-[#f5f5f5]  w-full min-h-[260px] sm:min-h-full">
          <img
            src={product?.images?.[index]?.url}
            alt={product?.name}
            className="w-full h-full max-h-56 sm:max-h-none object-contain object-center"
          />

          <button
            onClick={() => setActiveProduct(null)}
            className="absolute right-4 top-4 sm:hidden z-10 rounded-full p-1 text-gray-600 bg-white/80 hover:text-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2">
            <button
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Previous image"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Next image"
              disabled={index >= lastIndex}
              onClick={() => setIndex((i) => Math.min(i + 1, lastIndex))}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 bg-white overflow-y-auto overscroll-contain">
          <button
            onClick={() => setActiveProduct(null)}
            className="hidden sm:block absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div>
            <h2 className="text-xl font-semibold text-black">Nike</h2>
            <p className="mt-1 text-base text-gray-800">{product?.name}</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-black">
                {formatPrice(product?.price)}
              </span>
            </div>

            <div className="mt-4 sm:mt-6 max-h-48 sm:max-h-44 overflow-y-auto pr-1 overscroll-contain">
              <div className="grid grid-cols-2 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium text-center transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-black hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              disabled={!selectedSize || isSubmitting}
              className={`w-full rounded-full py-4 text-center text-sm font-medium transition-all ${
                selectedSize && !isSubmitting
                  ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                  : "bg-[#e5e5e5] text-[#8d8d8d] cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
            >
              {!isSubmitting ? "Move to bag" : "Moving..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
