"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAppTransition } from "../adminDashboard/users/UserManagementProvider";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";

export default function RestaurantFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startTransition } = useAppTransition();

  const handleSearch = useDebouncedCallback((value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set("searchTerm", value);
      else params.delete("searchTerm");
      params.set("page", "1"); // Reset page on search
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, 500);

  const handleAvailabilityChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") params.set("isAvailable", value);
      else params.delete("isAvailable");
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-12">
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by restaurant name..."
          className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 py-4 pl-14 pr-6 rounded-[24px] text-lg font-medium text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm hover:shadow-md"
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="relative min-w-[180px]">
        <select
          className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-[24px] text-lg font-medium text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm hover:shadow-md appearance-none cursor-pointer"
          defaultValue={searchParams.get("isAvailable") || "all"}
          onChange={(e) => handleAvailabilityChange(e.target.value)}
        >
          <option value="all">All Kitchens</option>
          <option value="true">Live Kitchens</option>
          <option value="false">Closed Kitchens</option>
        </select>
        <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
