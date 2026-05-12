import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import {
  HiOutlineCube,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const AdminProductPage = () => {
  const stockItems = [
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
  ];

  const getStockStatus = (qty) => {
    if (qty === 0) return "bg-red-50 text-red-600 border-red-100";
    if (qty < 10) return "bg-amber-50 text-amber-600 border-amber-100";
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4  min-h-screen font-sans">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-gray-900">
            Products
          </h1>
          <div className="flex gap-1.5 mt-1">
            <span className="flex items-center gap-1 text-[10px] font-semibold bg-white px-4 py-2 rounded-md border border-gray-200 text-gray-500">
              <HiOutlineCube className="size-3" /> 12 Total
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 px-4 py-2 rounded-md border border-emerald-100 text-emerald-600">
              <HiOutlineCheckCircle className="size-3" /> 10 In Stock
            </span>
          </div>
        </div>
        <Link to="/admin/products/add">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm h-9 px-4 rounded-lg font-semibold active:scale-95 transition-transform flex items-center cursor-pointer">
            + Add
          </button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 sticky top-4 z-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all text-sm text-gray-600 placeholder:text-gray-400"
              placeholder="Search products by name..."
            />
          </div>

          <div className="flex gap-2">
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-xl focus:bg-gray-100 focus:border-black block w-full p-2.5 outline-none">
              <option value="all">All Categories</option>
              <option value="audio">Audio</option>
              <option value="wearables">Wearables</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-xl focus:bg-gray-100 focus:border-black block w-full p-2.5 outline-none">
              <option value="all">Stock Status</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stockItems.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm"
          >
            <div className="flex gap-3">
              <div className="size-16 shrink-0 bg-gray-50 rounded-lg border border-gray-50 overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-full object-contain mix-blend-multiply"
                  alt=""
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-sm font-bold text-gray-900 truncate pr-2 leading-tight">
                      {item.name}
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${getStockStatus(item.stock)}`}
                    >
                      {item.stock} in stock
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">
                    {item.category}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{item.price}
                  </span>

                  <div className="flex gap-1.5">
                    <Link to={`/admin/products/edit/${item._id}`}>
                      <button className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 cursor-pointer">
                        <CiEdit className="size-4" />
                      </button>
                    </Link>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-red-500  cursor-pointer">
                      <AiOutlineDelete className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductPage;
