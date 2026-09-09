import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50/50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-5 border border-gray-100 rounded-2xl bg-white space-y-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-gray-100 rounded-2xl bg-white p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-4 w-48 rounded-md" />
            </div>
            <Skeleton className="h-4 w-16 rounded" />
          </div>

          <div className="space-y-4 pt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-none"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm space-y-6">
            <Skeleton className="h-6 w-40 rounded-md" />

            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                </div>
              ))}
            </div>

            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          <div className="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm space-y-4">
            <Skeleton className="h-6 w-36 rounded-md" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
