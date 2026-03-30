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
      <div className="flex flex-col items-center  pt-5 bg-white font-mono">
        <h2 className="text-2xl  tracking-tight text-black mb-3">
          Customer Reviews
        </h2>
        {!productReview || productReview.length === 0 ? (
          <>
            <div className="flex justify-center gap-1 my-2">
              <FiStar className="text-yellow-500 text-xl" />
              <FiStar className="text-yellow-500 text-xl" />
              <FiStar className="text-yellow-500 text-xl" />
              <FiStar className="text-yellow-500 text-xl" />
              <FiStar className="text-yellow-500 text-xl" />
            </div>

            <p className="text-gray-400 text-sm tracking-tight mb-8">
              Be the first to review this product
            </p>

            <button className="w-full md:max-w-sm bg-[#222222] text-white py-3 tracking-[0.15em] rounded-xl  transition-all hover:bg-black active:scale-[0.98] cursor-pointer">
              Write a review
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-8 font-sans border border-gray-100 bg-white px-8 py-7 rounded-2xl shadow-sm">
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

              <div className="flex flex-col gap-3">
                {ratingStats.map((item) => (
                  <div
                    key={item.star}
                    className="flex items-center gap-4 text-sm"
                  >
                    {/* Label: Star Number */}
                    <div className="flex items-center gap-1.5 w-8">
                      <span className="font-semibold text-[#222222]">
                        {item.star}
                      </span>
                      <FaStar className="text-yellow-500 text-[10px]" />
                    </div>

                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#222222] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>

                    <div className="w-10 text-right text-gray-400 font-mono text-xs tabular-nums">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="w-full bg-[#222222] text-white py-3.5 text-sm font-bold  tracking-widest rounded-xl transition-all hover:bg-black hover:shadow-lg active:scale-[0.98] cursor-pointer">
                  Write a review
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full max-w-2xl mx-auto mt-10 divide-y divide-gray-100 font-sans">
              {productReview.map((review, index) => (
                <div
                  key={review.id || index}
                  className="py-4 px-4 flex flex-col gap-2"
                >
                  <div className="flex text-[#FFA41C] text-lg">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} />
                      ) : (
                        <FiStar key={i} className="opacity-30" />
                      ),
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {review.user}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed font-mono tracking-tight max-w-prose">
                    {review.comment}
                  </p>

                  {/* Row 5: Helpful Action */}
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors">
                      <span>Helpful?</span>
                      <FiThumbsUp className="mb-0.5" />
                      <span className="tabular-nums">
                        {review.helpfulCount || 0}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Reviews;
