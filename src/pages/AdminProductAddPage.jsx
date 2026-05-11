import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

const AdminProductAdd = () => {
  const sizes = [
    { label: "S", stock: 0 },
    { label: "M", stock: 0 },
    { label: "L", stock: 0 },
    { label: "XL", stock: 0 },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-4 min-h-screen font-sans pb-32">
      <div className="mb-6">
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">
          Add Product
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Create a new product for your store
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            General Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-semibold  uppercase ">
                Product Title
              </label>
              <input
                type="text"
                placeholder="e.g. Slim Fit Cotton Shirt"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase ">
                Description
              </label>
              <textarea
                placeholder="Material, fit, and care instructions..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-1">
            Product Images
          </h2>
          <p className="text-[10px] text-gray-400 mb-3">
            Upload up to 4 images
          </p>

          <label
            htmlFor="file-upload"
            className="group flex flex-col items-center justify-center size-28 border-2 border-dashed border-indigo-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer"
          >
            <div className="size-10 bg-indigo-50 group-hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors">
              <HiOutlinePlus className="text-indigo-600 size-5" />
            </div>
            <span className="text-[10px] font-bold text-indigo-600 mt-2">
              Add Image
            </span>
            <input id="file-upload" type="file" className="hidden" />
          </label>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Pricing</h2>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Selling Price
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                ₹
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            Stock Per Size
          </h2>
          <div className="space-y-2">
            {sizes.map((size) => (
              <div
                className="flex items-center justify-between bg-gray-50 p-2 rounded-xl"
                key={size.label}
              >
                <div className="flex items-center justify-center bg-black text-white text-[10px] font-bold size-8 rounded-lg uppercase">
                  {size.label}
                </div>
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-20 bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-right focus:outline-none focus:border-indigo-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Organization</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Category
              </label>
              <select className="w-full mt-1 bg-gray-50 border border-gray-200 text-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-100">
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Sub Category
              </label>
              <select className="w-full mt-1 bg-gray-50 border border-gray-200 text-sm rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-100 ">
                <option value="top">Top Wear</option>
                <option value="bottom">Bottom Wear</option>
                <option value="winter">Winter Wear</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50">
        <div className="max-w-md mx-auto">
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-md shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductAdd;
