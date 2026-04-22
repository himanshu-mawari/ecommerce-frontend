const Skeleton = ({ className }) => (
  <div className={`relative overflow-hidden bg-[#f3f3f3]  ${className}`}>
    {/* 1. -translate-x-full starts it completely hidden to the left
      2. w-full makes it the same size as the container
      3. skew-x-[-20deg] gives it that premium slanted look
    */}
    <div className="absolute inset-0 -translate-x-full animate-shimmer">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" />
    </div>
  </div>
);
const HomePageSkeleton = () => {
  return (
    <div className="px-4 sm:px-12 lg:px-28">
      {/* Hero Section */}
      <div className="w-full h-[300px] md:h-[500px]">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      {/* Product Sections */}
      {[1, 2].map((section) => (
        <div key={section} className="flex flex-col items-center mt-14">
          {/* Section Title */}
          <div className="flex flex-col md:flex-row md:items-center md:pb-3 lg:justify-center gap-2">
            <Skeleton className="h-10 w-32 md:w-40 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-40 md:w-48 rounded" />
              <div className="hidden md:block w-12 h-[1.5px] bg-gray-200" />
            </div>
          </div>

          {/* Subtitle */}
          <Skeleton className="h-4 w-3/4 md:w-1/2 mt-4 mb-10 md:mb-12 rounded" />

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-[3/4] w-full rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Policy Section */}
      <div className="flex flex-col md:flex-row justify-center py-24 md:py-20 lg:py-24 gap-12 lg:gap-40">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col items-center text-center">
            <Skeleton className="w-16 h-16 rounded-full mb-4" />
            <Skeleton className="h-5 w-32 mb-2 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSkeleton;