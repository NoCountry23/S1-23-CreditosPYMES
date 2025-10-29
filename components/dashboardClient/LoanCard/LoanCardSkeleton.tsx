"use client";

interface LoanCardSkeletonProps {
  count?: number;
}

export default function LoanCardSkeleton({ count = 1 }: LoanCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
          {/* Header Skeleton */}
          <div className="bg-gray-300 dark:bg-gray-700 p-6 h-24" />
          
          {/* Body Skeleton */}
          <div className="p-6 space-y-6">
            {/* Amounts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
            </div>

            {/* Payment Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>

            {/* Button */}
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-full" />
          </div>
        </div>
      ))}
    </>
  );
}
