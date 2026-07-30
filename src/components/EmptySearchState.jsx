import React from "react";
import { SearchX } from "lucide-react";

const EmptySearchState = ({ value }) => {
  return (
    <div className="flex flex-col items-center text-center px-4 mt-6 md:mt-24 lg:mt-16">
      <div className="opacity-20 text-gray-400 mb-2">
        <SearchX
          className="size-20 md:size-36 lg:size-32 transition-all duration-300"
          strokeWidth={1}
        />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg md:text-2xl lg:text-xl font-medium text-gray-800">
          We couldn't find any products
        </h2>
        <p className="text-sm text-gray-500">"{value}"</p>
      </div>

      <div className="mt-2 max-w-xs md:max-w-sm">
        <p className="text-xs md:text-sm text-gray-500">
          Check the spelling or use a different word or phrase.
        </p>
      </div>
    </div>
  );
};

export default EmptySearchState;
