import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyOrders = () => {
  return (
    <div className=" px-4 md:px-12 lg:px-24 border-t py-10 flex flex-col justify-center mb-20 md:mb-64">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 md:mb-20 lg:mb-10">
        My Orders
      </h1>

      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-2xl py-16 px-6 text-center bg-white shadow-sm max-w-2xl mx-auto w-full">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400 stroke-[1.5]" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          No orders yet
        </h2>

        <p className="text-gray-500 max-w-md mb-8 text-sm md:text-base leading-relaxed">
          Looks like you haven't placed any orders yet. Explore our latest
          collections and find something you love!
        </p>

        <Link
          to={"/"}
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EmptyOrders;
