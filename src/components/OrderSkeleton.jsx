import React from 'react';
import Skeleton from './Skeleton'; 

const OrdersSkeleton = () => {
  return (
    <div className="min-h-screen border-t border-gray-300 py-8 pb-28 lg:pb-40 lg:pt-10 px-4 md:px-10 font-sans">
      <div className="max-w-5xl xl:max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8">
        
        <div className="pb-2">
          <Skeleton className="h-12 md:h-16 w-64 md:w-80 rounded-lg" />
        </div>

        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2 pt-8">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="flex justify-between items-start mb-6">
                <Skeleton className="h-4 w-32 rounded" /> {/* ORD ID */}
                <Skeleton className="h-6 md:h-8 w-24 md:w-28 rounded-full" /> 
              </div>

              <div className="flex gap-4 md:gap-6 items-start mb-6">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex-shrink-0" /> 
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-5 md:h-6 w-3/4 rounded" /> 
                  <Skeleton className="h-4 w-20 rounded" /> 
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-7 w-24 rounded" /> 
                  <Skeleton className="h-5 w-28 rounded" /> 
                </div>
                
                <div className="w-full md:w-48">
                  <Skeleton className="h-10 w-full rounded-lg" /> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
