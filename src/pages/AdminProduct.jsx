import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import {
  HiOutlineCube,
  HiOutlineCheckCircle,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import FilterBottomSheet from "../components/FilterBottomSheet";
import FilterRow from "../components/FilterRow";

const AdminProductPage = () => {
  const [stockItems, setStockItems] = useState([
    {
      _id: 1,
      name: "Apple Watch Ultra 3 Titanium",
      description:
        "Premium titanium smartwatch with advanced fitness tracking and rugged outdoor design.",
      stock: 30,
      category: "Watch",
      price: 34999,
      img: "https://m.media-amazon.com/images/I/81UVCW0LijL._SX679_.jpg",
    },
    {
      _id: 2,
      name: "AirPods Pro 3 - Active Noise",
      description:
        "Wireless earbuds with active noise cancellation and immersive spatial audio experience.",
      stock: 5,
      category: "Audio",
      price: 24900,
      img: "data:image/webp;base64,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",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);

  const getStockStatus = (qty) => {
    if (qty === 0) return "bg-red-50 text-red-600 border-red-100";
    if (qty < 10) return "bg-amber-50 text-amber-600 border-amber-100";
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  const handleDeleteModal = (item) => {
    setSelectedProduct(item);
    setOpen(true);
  };

  const handleProductDelete = () => {
    console.log("hey");
    setStockItems((prev) =>
      prev.filter((item) => item._id !== selectedProduct._id),
    );
    setOpen(false);
  };

  return (
    <div className="max-w-md sm:max-w-full sm:px-12 lg:px-6 mx-auto px-4 py-6 min-h-screen inter">
      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-4 md:space-y-0 md:flex md:justify-between lg:items-center lg:mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-2xl lg:font-semibold font-bold tracking-tight">
              Products
            </h1>
            <p className="mt-1 text-sm  lg:text-xs text-gray-500 lg:font-normal">
              Manage inventory and stock details.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-3 pb-2">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-1.5 lg:py-2.5 lg:rounded-xl text-xs md:text-sm font-semibold shadow-sm">
                <HiOutlineCube className="size-3.5 text-gray-400" />
                12 Total
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 lg:py-2.5 lg:rounded-xl text-xs md:text-sm font-semibold text-emerald-700 shadow-sm">
                <HiOutlineCheckCircle className="size-3.5 text-emerald-500" />
                10 In Stock
              </span>
            </div>
            <Link to="/admin/products/add">
              <button className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 font-semibold text-white shadow-md shadow-indigo-100 transition-all active:scale-95 hover:bg-indigo-700 md:w-52 lg:w-auto">
                <span className="text-lg">+</span>
                Add Product
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl sticky top-4 z-10">
          <div className="w-full flex items-center gap-2 md:gap-3">
            <div className="relative flex-1 max-w-xl">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="w-full border font-medium border-gray-200 rounded-full py-2.5 md:py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm md:text-[15px] text-gray-700 placeholder:text-gray-400"
                placeholder="Search by order ID or name..."
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center justify-center bg-white border border-gray-200 rounded-full h-10 w-10 md:h-auto md:w-auto md:rounded-xl px-0 md:px-4 py-0 md:py-3 gap-2 hover:bg-gray-50 active:scale-[0.98] transition-all text-gray-700 shrink-0 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 md:size-4.5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              <span className="hidden md:inline text-[15px] font-medium text-gray-800">
                Filters
              </span>
            </button>
            <button
              onClick={() => setIsDesktopFilterOpen(!isDesktopFilterOpen)}
              className="hidden lg:flex items-center justify-center bg-white border border-gray-200 rounded-full h-10 w-10 md:h-auto md:w-auto md:rounded-xl px-0 md:px-4 py-0 md:py-3 gap-2 hover:bg-gray-50 active:scale-[0.98] transition-all text-gray-700 shrink-0 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 md:size-4.5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              <span className="hidden md:inline text-[15px] font-medium text-gray-800">
                Filters
              </span>
            </button>
          </div>
        </div>
        <div>{
          isDesktopFilterOpen && <FilterRow />
   }   </div>

        <div className="space-y-5">
          {stockItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Top Section: Media + Title Details */}
              <div className="flex gap-4 items-start pb-3">
                <div className="size-16 shrink-0 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.img}
                    className="w-full h-full object-contain mix-blend-multiply"
                    alt={item.name}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-sm md:text-base font-bold text-gray-900 truncate leading-snug">
                      {item.name}
                    </h2>

                    {/* Threshold Logic: Add icon if stock is critically low (e.g., < 10) */}
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-full border whitespace-nowrap shadow-sm ${getStockStatus(item.stock)}`}
                    >
                      {item.stock <= 5 && (
                        <HiExclamationTriangle className="text-amber-500 size-3 shrink-0 animate-pulse" />
                      )}
                      {item.stock} in stock
                    </span>
                  </div>

                  <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                    {item.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-base md:text-lg font-extrabold text-gray-900 tracking-tight">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>

                <div className="flex items-center gap-3">
                  <Link to={`/admin/products/edit/${item._id}`}>
                    <button
                      className="p-2 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <CiEdit className="size-4 md:size-5.5" />
                    </button>
                  </Link>
                  <button
                    className="p-2 rounded-lg hover:bg-red-50 active:bg-red-100 text-red-500 transition-colors cursor-pointer"
                    onClick={() => handleDeleteModal(item)}
                    title="Delete Product"
                  >
                    <AiOutlineDelete className="size-4 md:size-5.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DeleteConfirmModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={handleProductDelete}
          productName={selectedProduct?.name}
        />
      </div>
      {isFilterOpen && (
        <FilterBottomSheet isOpen={isFilterOpen} onClose={setIsFilterOpen} />
      )}
    </div>
  );
};

export default AdminProductPage;
