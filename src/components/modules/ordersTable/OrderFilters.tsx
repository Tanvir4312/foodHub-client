"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAppTransition } from "../adminDashboard/users/UserManagementProvider";
import { Filter, SortAsc, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startTransition } = useAppTransition();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleClearAll = () => {
    startTransition(() => {
      router.push(window.location.pathname);
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-white/5 mb-8">
      <div className="flex flex-wrap gap-6 items-end justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Status Filter */}
          <div className="flex flex-col gap-2 relative group min-w-[160px]">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Order Status</label>
            <div className="relative">
              <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
              <select
                value={searchParams.get("status") || "all"}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="h-11 pl-10 pr-10 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-zinc-900 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none appearance-none cursor-pointer font-bold text-slate-600 dark:text-slate-400 text-sm"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PREPARING">Preparing Food</option>
                <option value="OUTFORDELIVERY">Out For Delivery</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
            </div>
          </div>

          {/* Sorting */}
          <div className="flex flex-col gap-2 relative group min-w-[160px]">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Sort By Date</label>
            <div className="relative">
              <SortAsc size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
              <select
                value={searchParams.get("sortOrder") || "desc"}
                onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
                className="h-11 pl-10 pr-10 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-zinc-900 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none appearance-none cursor-pointer font-bold text-slate-600 dark:text-slate-400 text-sm"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Clear All Button */}
        {(searchParams.get("status") || searchParams.get("sortOrder")) && (
          <Button
            variant="ghost"
            onClick={handleClearAll}
            className="h-11 px-6 rounded-2xl text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 font-bold transition-all flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;
