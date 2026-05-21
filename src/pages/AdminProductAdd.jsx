import React from "react";
import AdminProductForm from "../components/AdminProductForm";

const AdminProductAdd = () => {
  return (
    <div className="max-w-md md:max-w-full mx-auto px-5 md:px-12 py-6 min-h-screen font-sans pb-32 inter">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Add Product
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Create a new product for your store
        </p>
      </div>

      <AdminProductForm />

      {/* Fixed bar — mobile and md only */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white  z-50 lg:hidden">
        <div className="max-w-md mx-auto md:max-w-lg">
          <button className="w-full bg-black text-white py-4 md:py-3 rounded-2xl font-bold text-sm md:text-lg active:scale-[0.98] transition-all">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductAdd;
