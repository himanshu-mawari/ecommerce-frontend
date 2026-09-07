import Skeleton from "./Skeleton";

const AddressSkeleton = () => {
  return (
    <div className="w-full px-4 md:px-12 lg:px-24 py-6">
      <div className="block lg:hidden space-y-6">
        <Skeleton className="h-10 w-48 rounded-md mb-4" />

        {[1, 2, 3].map((item) => (
          <div key={item} className="border-b border-gray-200 pb-6 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
            <div className="pt-2">
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <div className="h-52 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center space-y-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-32 rounded-md" />
          </div>

          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="h-52 border border-gray-200 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
              <div className="flex gap-3 pt-4">
                <Skeleton className="h-9 w-16 rounded-full" />
                <Skeleton className="h-9 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="border border-gray-200 rounded-2xl p-4 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSkeleton;
