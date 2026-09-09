import Skeleton from "./Skeleton";
const AdminOrderSkeleton = () => {
  return (
    <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/60 border-b border-gray-100 items-center">
        <Skeleton className="col-span-2 h-3.5 w-16 rounded" />
        <Skeleton className="col-span-2 h-3.5 w-16 rounded" />
        <Skeleton className="col-span-3 h-3.5 w-16 rounded" />
        <Skeleton className="col-span-2 h-3.5 w-16 rounded" />
        <Skeleton className="col-span-2 h-3.5 w-14 rounded" />
        <Skeleton className="col-span-1 h-3.5 w-12 rounded justify-self-end" />
      </div>

      <div className="divide-y divide-gray-50">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
          >
            <div className="col-span-2 space-y-1.5">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>

            <div className="col-span-2">
              <Skeleton className="h-4 w-16 rounded" />
            </div>

            <div className="col-span-3 space-y-1.5">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>

            <div className="col-span-2">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="col-span-2">
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            <div className="col-span-1 justify-self-end">
              <Skeleton className="h-4 w-10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminOrderSkeleton;
