import React from 'react';
import Skeleton from './Skeleton'; 

const CategorySkeleton = () => {
  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 border-t border-gray-300">
      <div className="pt-8 pb-8">
        <Skeleton className="h-14 md:h-20 lg:h-24 xl:h-28 w-64 md:w-96 rounded-xl" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
            
            <div className="space-y-2">
              <Skeleton className="h-5 w-5/6 rounded" /> {/* Name */}
              <Skeleton className="h-4 w-1/4 rounded" /> {/* Price */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;