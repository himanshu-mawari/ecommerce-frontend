import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

const ErrorState = ({
  onRetry,
  message = "Failed to load data",
  showRetry = true,
  isRetrying = false,
}) => {
  return (
    <div className="border-t">
    <div className="w-full px-4 md:px-8 lg:px-14 xl:px-24  sm:my-10 my-48 md:my-52 lg:my-32 ">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-gray-200/80 bg-white p-6 text-center shadow-xs sm:p-12">
        {/* Icon Wrapper */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 sm:h-16 sm:w-16">
          <AlertCircle className="h-7 w-7 stroke-[1.5] sm:h-8 sm:w-8" />
        </div>

        {/* Heading */}
        <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900 sm:text-2xl">
          Something went wrong
        </h3>

        {/* Message */}
        <p className="mb-6 max-w-xs text-xs font-normal leading-relaxed text-gray-500 sm:max-w-sm sm:text-sm">
          {message}
        </p>

        {/* Retry Button */}
        {onRetry && showRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center gap-2 rounded-none bg-black px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RotateCcw
              className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`}
            />
            <span>{isRetrying ? "Retrying..." : "Try again"}</span>
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default ErrorState;