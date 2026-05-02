import React from 'react';
import Skeleton from './Skeleton'; // Adjust path as needed

const CheckoutSkeleton = () => {
  return (
    <div className="border-t border-gray-300">
      <div className="max-w-7xl lg:max-w-full mx-auto lg:grid lg:grid-cols-12 lg:gap-28 lg:items-start px-4 md:px-8 lg:px-14 xl:px-28">
        
        <div className="lg:col-span-8">
          <div className="bg-white">
            <div className="flex flex-col items-center md:items-start pt-8 pb-6">
              <Skeleton className="h-9 w-24 mb-2 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-md" />
                <div className="text-gray-300">|</div>
                <Skeleton className="h-5 w-12 rounded-md" />
              </div>
            </div>

            <div className="flex flex-col">
              {[1, 2].map((i) => (
                <div key={i} className="py-8 border-t border-gray-200">
                  <div className="flex items-start gap-5 md:gap-8">
                    <Skeleton className="w-28 h-36 lg:w-32 lg:h-44 rounded-xl flex-shrink-0" />

                    <div className="flex flex-col flex-1 min-h-[144px]">
                      <Skeleton className="h-7 w-24 mb-3 rounded-md" />
                      <Skeleton className="h-6 w-3/4 mb-2 rounded-md" />
                      <Skeleton className="h-4 w-20 mb-4 rounded-md" />
                      
                      <div className="mt-auto">
                        <Skeleton className="h-5 w-16 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Skeleton className="h-10 w-28 md:w-32 lg:w-36 rounded-full" />
                    <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-lg md:max-w-full lg:max-w-xs lg:col-span-4 lg:sticky lg:top-24 mt-10 lg:mt-24">
          <div className="space-y-6 bg-gray-50 md:bg-white mx-4 md:mx-0 p-6 md:p-0 rounded-3xl md:rounded-none border md:border-0 border-gray-100 shadow-sm md:shadow-none">
            <Skeleton className="h-8 w-32 mb-6 rounded-md" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <Skeleton className="h-7 w-16 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>

            <Skeleton className="hidden lg:block h-14 w-full rounded-full mt-8" />
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <Skeleton className="h-14 w-full rounded-full" />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;