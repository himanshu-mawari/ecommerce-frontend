import React from "react";
import AdminProductForm from "../components/AdminProductForm";

const AdminProductAdd = () => {
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

      <AdminProductForm />

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
