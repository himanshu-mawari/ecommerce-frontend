import React from "react";
import Skeleton from "./Skeleton"; 

const ProfileSkeleton = () => {
  return (
    <div className="max-w-7xl lg:max-w-full mx-auto bg-white min-h-screen px-4 md:px-12 lg:px-24 pb-20 py-4 border-t border-gray-300">
      <div className="pt-6 pb-8">
        <Skeleton className="h-12 md:h-16 w-64 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-18 items-start">
        <div className="lg:col-span-2 space-y-12">
          <section className="pb-8 border-b border-gray-200">
            <Skeleton className="h-7 w-48 mb-6 rounded" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-40 rounded" />
                <div className="space-y-3">
                  <Skeleton className="h-5 w-56 rounded" />
                  <Skeleton className="h-5 w-44 rounded" />
                </div>
              </div>
              <Skeleton className="h-12 w-full md:w-40 rounded-full" />
            </div>
          </section>

          <section className="pb-8 border-b border-gray-100">
            <Skeleton className="h-7 w-56 mb-6 rounded" />
            <div className="p-6 border border-gray-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2 rounded" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
              </div>
              <Skeleton className="h-5 w-40 rounded" />
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="p-6 bg-gray-50 rounded-3xl">
            <Skeleton className="h-7 w-40 mb-6 rounded" />

            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                  </div>
                  <Skeleton className="w-5 h-5 rounded-full" />
                </div>
              ))}
            </div>

            <Skeleton className="w-full h-14 mt-6 rounded-2xl" />
          </section>

          <div className="mt-8 px-6">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
