import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useAddToCartMutation } from "../services/cartService";
import { SIZES } from "../helpers/constant";
import { toast } from "sonner";
import { useRemoveWishlistProductMutation } from "../services/userService";

const ProductModal = ({ product, setActiveProduct }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  let [index, setIndex] = useState(0);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="relative flex flex-1 items-center justify-center bg-[#f5f5f5] p-8">
          <img
            src={product?.images?.[index]?.url}
            alt={product?.name}
            className="max-h-87.5 object-contain object-top"
          />

          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous image"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next image"
              disabled={product?.images?.length === 1}
              onClick={() => setIndex(index + 1)}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-between p-8 bg-white">
          <button
            onClick={() => setIndex((i) => Math.min(i + 1, lastIndex))}
            disabled={index >= lastIndex}
          >
            <X className="h-5 w-5" />
          </button>

          <div>
            <p className="mt-4 text-base text-gray-800">{product?.name}</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-black">
                {formatPrice(product?.price)}
              </span>
            </div>

            <div className="mt-6 max-h-40 overflow-y-auto pr-1">
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
                selectedSize
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
