import React from "react";
import Skeleton from "./Skeleton";

const AdminProductSkeleton = () => {
  return (
    <div className="w-full  min-h-screen inter space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-2xl bg-white p-4 shadow-sm space-y-4"
        >
          <div className="flex items-start gap-4">
            {/* Product Thumbnail */}
            <Skeleton className="h-20 w-20 rounded-xl shrink-0" />

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <Skeleton className="h-5 w-3/5 rounded" />
                <Skeleton className="h-6 w-16 rounded" />
              </div>

              <Skeleton className="h-3 w-32 rounded" />

              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-6 w-20 rounded-full" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <Skeleton className="h-3.5 w-64 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductSkeleton;
