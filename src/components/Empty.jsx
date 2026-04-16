import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-36 border-t border-gray-300 md:py-28 lg:py-44  px-20 text-center">
      <FiSearch size={50} className="text-gray-400 mb-4" />

      <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>

      <p className="text-gray-500 mb-6 max-w-md">
        sorry, we couldn't find any products 
      </p>

      <div className="flex gap-3">
  
          <button
            onClick={() => navigate("/collections/shop-all")}
            className="px-5 py-2 bg-black text-white rounded-md"
          >
            Shop All
          </button>
 
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border rounded-md"
          >
            Go Back
          </button>
      </div>
    </div>
  );
};
export default EmptyState;
