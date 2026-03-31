import { FiStar, FiThumbsUp } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Reviews = ({ productReview = [] }) => {
  const rating = [5, 4, 3, 2, 1];
  const totalReview = productReview.length || 0;

  const ratingCount = rating.map((star) => ({
    star,
    count: productReview.filter((p) => p.rating === star).length,
  }));

  const ratingStats = ratingCount.map((item) => ({
    ...item,
    percent: totalReview ? (item.count / totalReview) * 100 : 0,
  }));

  const totalRating = productReview.reduce((acc, item) => acc + item.rating, 0);
  const averageRating = totalRating / totalReview;

  return (
    <>
      <div className="flex flex-col items-center  lg:items-start pt-5 bg-white font-mono">
        <h2 className="text-2xl md:text-3xl xl:text-4xl  tracking-tight text-black mb-3">
          Customer Reviews
        </h2>

        {!productReview || productReview.length === 0 ? (
<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
  
  <div className="flex flex-col items-center lg:items-start">
    <div className="flex gap-1 my-2">
      <FiStar className="text-yellow-500 text-xl" />
      <FiStar className="text-yellow-500 text-xl" />
      <FiStar className="text-yellow-500 text-xl" />
      <FiStar className="text-yellow-500 text-xl" />
      <FiStar className="text-yellow-500 text-xl" />
    </div>

    <p className="text-gray-400 text-sm tracking-tight mb-8 lg:mb-0">
      Be the first to review this product
    </p>
  </div>

  <button className="text-white bg-[#222222] py-3 px-10 tracking-[0.15em] w-full lg:w-auto rounded-xl transition-all hover:bg-black active:scale-[0.98] cursor-pointer">
    Write a review
  </button>
</div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-18 w-full px-4 lg:px-0">
            <div className="flex flex-col gap-4 w-full max-w-md  lg:max-w-xs mx-auto lg:mx-0 mt-8 font-sans border border-gray-100 bg-white px-8 py-7 lg:px-4  rounded-2xl shadow-sm lg:sticky lg:top-10">
              <div className="flex flex-col items-center justify-center gap-1 mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-6xl text-[#222222] font-bold tracking-widest">
                    {averageRating}
                  </h1>
                  <FaStar className="text-yellow-500 text-4xl mb-1" />
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Based on {totalReview.toLocaleString()} reviews
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:gap-1">
                {ratingStats.map((item) => (
                  <div
                    key={item.star}
                    className="flex items-center gap-4 text-sm"
                  >
                    <div className="flex items-center gap-1.5 w-8">
                      <span className="font-semibold text-[#222222]">
                        {item.star}
                      </span>
                      <FaStar className="text-yellow-500 text-[10px]" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#222222] rounded-full transition-all duration-700"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <div className="w-10 text-right text-gray-400 font-mono text-xs">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 lg:mt-4">
                <button className="w-full bg-[#222222] text-white py-3.5 lg:py-3 text-sm font-bold tracking-widest rounded-xl transition-all hover:bg-black active:scale-[0.98] cursor-pointer">
                  Write a review
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0 mt-10 divide-y divide-gray-200 font-sans">
              {productReview.map((review, index) => (
                <div
                  key={review.id || index}
                  className="py-10 flex flex-col gap-4 first:pt-0"
                >
                  {/* 1. Stars Section - Increased gap below stars */}
                  <div className="flex text-[#FFA41C] text-lg">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} />
                      ) : (
                        <FiStar key={i} className="opacity-30" />
                      ),
                    )}
                  </div>

                  {/* 2. User Info - Made bold and clean */}
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold lg:font-bold  text-gray-900">
                      {review.user}
                    </span>

                    {/* 3. Review Comment - Added leading-loose for better readability */}
                    <p className="text-sm text-gray-700 leading-relaxed font-mono tracking-tight mt-1">
                      {review.comment}
                    </p>
                  </div>

                  {/* 4. Footer Section */}
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-black transition-colors">
                      <span>Helpful?</span>
                      <FiThumbsUp className="text-sm" />
                      <span className="tabular-nums">
                        {review.helpfulCount || 0}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
