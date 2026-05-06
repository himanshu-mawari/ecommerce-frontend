import React from 'react';
import Skeleton from './Skeleton'; 

const ProductDetailSkeleton = () => {
  return (
    <div className="border-t border-gray-200 px-3 w-full md:px-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div className="flex flex-col md:flex-row-reverse gap-4 items-start justify-start">
          <Skeleton className="w-full h-100 md:h-150 md:max-w-xl lg:max-w-lg xl:max-w-120 rounded-xl" />
          
          <div className="flex md:flex-col gap-2">
            {[1,2].map((i) => (
              <Skeleton key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <div className="pt-4">
            <Skeleton className="h-10 w-3/4 mb-3 rounded" />
            
            <div className="flex items-center pt-2 gap-1">
              <Skeleton className="h-5 w-32 rounded" />
            </div>
          </div>

          <div className="py-4">
            <Skeleton className="h-12 w-40 rounded" />
          </div>

          <div className="mt-5">
            <Skeleton className="h-6 w-24 mb-4 rounded" />
            <div className="flex gap-2 md:gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="py-6 px-8 w-14 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="py-6">
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>

          <div className="pt-2 pb-8">
            <Skeleton className="h-14 w-full md:w-md xl:w-full rounded-lg" />
          </div>

          <div className="border-b py-3 space-y-2">
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-6 w-full rounded" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20">
        <Skeleton className="h-8 w-48 mb-6 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;