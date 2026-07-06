import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import {
  HiOutlineCube,
  HiOutlineCheckCircle,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import FilterProductBottomSheet from "../components/FilterProductBottomSheet";
import ProductFilterBar from "../components/ProductFilterBar";
import { useGetProductPageDataQuery , useDeleteProductMutation } from "../services/AdminService";
import { Dot } from "lucide-react";
import useDebounce from "../helpers/useDebounce";
import EmptySearchState from "../components/EmptySearchState";
import Pagination from "../components/Pagination";

const AdminProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);
  const currentPage = Number(searchParams.get("page")) || 1;

  const [inputValue, setInputValue] = useState("");
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const [draftFilter, setDraftFilter] = useState({
    category: capitalize(searchParams.get("category")) || "All",
    subCategory: capitalize(searchParams.get("sub_category")) || "All",
    stockStatus: searchParams.get("stock_status") || "All",
  });

  const [activeFilter, setActiveFilter] = useState({
    category: searchParams.get("category") || "",
    subCategory: searchParams.get("sub_category") || "",
    stockStatus: searchParams.get("stock_status") || "",
  });


  const handleApply = () => {
    const filters = {
      category: draftFilter.category,
      sub_category: draftFilter.subCategory,
      stock_status: draftFilter.stockStatus,
    };

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "All") {
          params.set(key, value.toLowerCase());
        } else {
          params.delete(key);
        }
      });

      return params;
    });
  };

  const debounceSearch = useDebounce(inputValue);

  const queryParams = {
    ...(debounceSearch && { q: debounceSearch }),
    ...(activeFilter.category && { category: activeFilter.category }),
    ...(activeFilter.subCategory && { sub_category: activeFilter.subCategory }),
    ...(activeFilter.stockStatus && { stock_status: activeFilter.stockStatus }),
    ...(currentPage !== 1 && { page: currentPage }),
  };

  const { data, isLoading } = useGetProductPageDataQuery(queryParams);
  const displayProductData = data?.data;
  const { totalPages, pageSize, totalProductCount } = data?.metadata || {};
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalProductCount);

  const [deleteProduct ] = useDeleteProductMutation();

  const getStatusByValue = (value) => {
    if (value === "Out of Stock")
      return "bg-red-50 text-red-600 border-red-100";
    else if (value === "Low Stock")
      return "bg-amber-50 text-amber-600 border-amber-100";
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  const handleDeleteModal = (item) => {
    setSelectedProduct(item);
    setOpen(true);
  };

  const handleProductDelete = async () => {
    await deleteProduct({productId:selectedProduct._id})
    setOpen(false);
  };

  const handleDraftFilterState = (key, value) => {
    setDraftFilter((prev) => ({ ...prev, [key]: value }));
  };

  const cleanFilterValue = (value) => {
    return value === "all" || value === "" ? "" : value;
  };

  const handleApplyDraftFilter = () => {
    setActiveFilter({
      category: cleanFilterValue(draftFilter.category.toLowerCase()),
      subCategory: cleanFilterValue(draftFilter.subCategory.toLowerCase()),
      stockStatus: cleanFilterValue(draftFilter.stockStatus.toLowerCase()),
    });
  };

  const goToPage = (page) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (page === 1) return;

      params.set("page", page);
      return params;
    });
  };

  if (isLoading) {
    return (
      <div>
        Hey software developer wait until data comes , i see you r very
        inpatience
      </div>
    );
  }

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
                {data?.totalProducts} Total
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 lg:py-2.5 lg:rounded-xl text-xs md:text-sm font-semibold text-emerald-700 shadow-sm">
                <HiOutlineCheckCircle className="size-3.5 text-emerald-500" />
                {data?.totalInStockProducts} In Stock
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
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                className="w-full border font-medium border-gray-200 rounded-full py-2.5 md:py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm md:text-[15px] text-gray-700 placeholder:text-gray-400"
                placeholder="Search products..."
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
        <div>
          {isDesktopFilterOpen && (
            <ProductFilterBar
              setIsDesktopFilterOpen={setIsDesktopFilterOpen}
              draftFilter={draftFilter}
              handleDraftFilterState={handleDraftFilterState}
              handleApplyDraftFilter={handleApplyDraftFilter}
              handleApply={handleApply}
            />
          )}{" "}
        </div>
        {displayProductData?.length !== 0 ? (
          <div className="space-y-5">
            {displayProductData.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 items-center pb-3">
                  <div className="size-16 shrink-0  overflow-hidden flex items-center justify-center">
                    <img
                      src={item.images[0].url}
                      className="w-20 h-16 rounded-lg object-cover object-top mix-blend-multiply"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-6">
                      <h2 className="text-sm md:text-base font-semibold text-gray-900 truncate leading-snug">
                        {item.name}
                      </h2>

                      <span className="text-base md:text-lg font-bold text-gray-900 tracking-tight">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider ">
                        {item.category}
                      </p>
                      <Dot className="size-4 text-gray-400" />
                      <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider ">
                        {item.subCategory}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-1">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-4 py-1 md:py-1 rounded-full border whitespace-nowrap shadow-sm ${getStatusByValue(item.status)}`}
                  >
                    {item.stock <= 5 && (
                      <HiExclamationTriangle className="text-amber-500 size-3 shrink-0 animate-pulse" />
                    )}
                    {item.status}
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
                <div className="px-3  border-t pt-2 ">
                  <div className="flex gap-3">
                    {item.sizes.map((size) => (
                      <div className="flex text-xs ">
                        <p className="font-medium">{size.size}</p>:
                        <p className="text-gray-500">{size.stock}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <EmptySearchState value={inputValue} />
          </div>
        )}

        <DeleteConfirmModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={handleProductDelete}
          productName={selectedProduct?.name}
        />
      </div>
      <Pagination
        start={start}
        end={end}
        totalProductCount={totalProductCount}
        onPageChange={goToPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {isFilterOpen && (
        <FilterProductBottomSheet
          isOpen={isFilterOpen}
          onClose={setIsFilterOpen}
          draftFilter={draftFilter}
          setActiveFilter={setActiveFilter}
          handleDraftFilterState={handleDraftFilterState}
          handleApplyDraftFilter={handleApplyDraftFilter}
          handleApply={handleApply}
        />
      )}
    </div>
  );
};

export default AdminProductPage;
