import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AllUserLoading = () => {
  return (
    <div className="space-y-8 p-1 lg:p-4">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-48 rounded-xl" />
          </div>
          <Skeleton className="h-5 w-72 rounded-lg" />
        </div>
      </div>

      {/* Filter Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800">
        <Skeleton className="flex-1 h-12 rounded-2xl" />
        <div className="flex gap-4">
          <Skeleton className="w-[140px] h-12 rounded-2xl" />
          <Skeleton className="w-[140px] h-12 rounded-2xl" />
          <Skeleton className="w-[140px] h-12 rounded-2xl" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="h-16 bg-slate-50 dark:bg-slate-800/50 flex items-center px-8 gap-8">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-32 rounded ml-auto" />
        </div>
        <div className="p-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
              <div className="flex-1">
                <Skeleton className="h-5 w-32 rounded-lg" />
              </div>
              <div className="flex-[1.5] space-y-2">
                <Skeleton className="h-5 w-48 rounded-lg" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
              <div className="flex-1">
                 <Skeleton className="h-7 w-20 rounded-full" />
              </div>
              <div className="flex-1 flex justify-center">
                 <Skeleton className="h-7 w-20 rounded-full" />
              </div>
              <div className="flex-1 flex justify-end">
                <Skeleton className="h-10 w-32 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-40 rounded" />
            <Skeleton className="h-10 w-20 rounded-xl" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24 rounded" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default AllUserLoading;
