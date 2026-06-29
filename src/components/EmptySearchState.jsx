import React from "react";
import { SearchX } from "lucide-react";

const EmptySearchState = ({ value }) => {
  return (
  <div className="flex flex-col items-center text-center px-4 mt-6 md:mt-24 lg:mt-16">
  {/* Icon: Using responsive sizes that scale gracefully without becoming 'childish' */}
  <div className="opacity-20 text-gray-400 mb-2">
    <SearchX 
      className="size-20 md:size-36 lg:size-32 transition-all duration-300" 
      strokeWidth={1} 
    />
  </div>

  {/* Text block: Using standard font sizes that don't jump aggressively */}
  <div className="space-y-1">
    <h2 className="text-lg md:text-2xl lg:text-xl font-medium text-gray-800">
      We couldn't find any products
    </h2>
    <p className="text-sm text-gray-500">
      "{value}"
    </p>
  </div>

  {/* Instructions: Kept compact */}
  <div className="mt-2 max-w-xs md:max-w-sm">
    <p className="text-xs md:text-sm text-gray-500">
      Check the spelling or use a different word or phrase.
    </p>
  </div>

  {/* Button: Keeps mobile touch-friendly but desktop-refined */}
  <div className="mt-6 md:mt-10 ">
    <button className="text-sm font-medium text-gray-700 py-2 md:py-3 md:px-8 px-5 rounded-md border border-gray-200 hover:bg-gray-50 transition-all">
      Clear search
    </button>
  </div>
</div>
  );
};

export default EmptySearchState;
