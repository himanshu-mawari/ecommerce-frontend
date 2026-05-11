import React from "react";
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
      id: 1,
      name: "Apple Watch Ultra 3 Titanium",
      stock: 30,
      category: "Watch",
      price: "34,999",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MFTH4ref_VW_34FR+watch-case-49-titanium-natural-ultra3_VW_34FR+watch-face-49-alpine-ultra3_VW_34FR_GEO_IN?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=OWdzNm84VjF3NmhsVTNHd3Myb2gxM2pDV2hhem5qNnpDenFtKzI1OXdzYkpncG05NXptdno5VmVNOFY1RGFaTGY4aHdOQjBiNSszby9Kd0FnejRCcGlCYWZ0M2xobjlJWjF6VEVYcVFORGZDcEVTaFN0QUo1Y1N6Zkw5RjVkNWR1a2gzUUplbzlQZFY1dHUxcGoxNCtKR3ZiM1VVanlXUmVvN3dXbUd0SjFNcDIxSk5peW5HTWQ0c004MmJwMkNtdGl6SHg4ZE5NYmlWSVQ5akRTdGpCVVhmcktjOHZXcnlYaElpWVVIbHBSbw",
    },
    {
      id: 2,
      name: "AirPods Pro 3 - Active Noise",
      stock: 5,
      category: "Audio",
      price: "24,900",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=976&hei=916&fmt=jpeg&qlt=90&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eWVDYXovZDMyN1dXU211bjZoVlVUcWJGcXNRQnFCV0w3WVRjTExvdm1ic1YxRUxFRmRlWDBITzhnRmZ5OTRmaVdKTExiOEFsRmxtQ2Nua0tRSC83MkI",
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
            key={item.id}
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
                    <button className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 cursor-pointer">
                      <CiEdit className="size-4" />
                    </button>
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
