import Skeleton from "./Skeleton";
const AdminOrderDetailsSkeleton = () => {
  return (
    <div className="max-w-2xl lg:max-w-full mx-auto px-4 sm:px-0 lg:px-6 py-6 pb-24 inter">
      <div className="flex items-center gap-4 sm:gap-0 md:gap-1 w-full">
        <Skeleton className="w-9 h-9 rounded-full shrink-0" />

        <div className="flex justify-between items-center flex-1 ml-2">
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-36 rounded-md" />
            <Skeleton className="h-3.5 w-28 rounded" />
          </div>
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      </div>

      <div className="md:grid md:grid-cols-[60%_1fr] gap-4 md:items-start pt-6">
        <div className="space-y-6 pb-6 md:pb-0">
          <div className="p-5 border border-gray-200 bg-white rounded-2xl shadow-sm flex flex-col space-y-4">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-6 w-48 rounded" />
            <div className="pt-2 flex gap-3 justify-start md:justify-end">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="h-10 w-36 rounded-xl hidden md:block" />
            </div>
          </div>

          <div className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-3 w-32 rounded" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <div className="flex justify-between py-2 border-b border-gray-50">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:order-first">
          <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white space-y-6">
            <Skeleton className="h-3 w-32 rounded" />

            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Skeleton className="size-8 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-3 w-36 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white space-y-4">
            <Skeleton className="h-3 w-24 rounded" />

            <div className="divide-y divide-gray-100">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex py-4 gap-4 first:pt-0 last:pb-0 items-center"
                >
                  <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <Skeleton className="h-4 w-3/5 rounded" />
                      <Skeleton className="h-5 w-16 rounded" />
                    </div>
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white space-y-4">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-3.5 w-28 rounded" />
              </div>
            </div>

            <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white space-y-4">
              <Skeleton className="h-3 w-32 rounded" />
              <div className="flex gap-3">
                <Skeleton className="size-5 rounded shrink-0 mt-0.5" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-2/3 rounded" />
                  <Skeleton className="h-3 w-4/5 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <Skeleton className="w-full h-12 rounded-xl" />
      </div>
    </div>
  );
};

export default AdminOrderDetailsSkeleton;
