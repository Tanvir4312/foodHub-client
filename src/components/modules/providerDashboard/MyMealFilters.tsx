"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search, Filter, X, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAppTransition } from "@/components/modules/adminDashboard/users/UserManagementProvider";

const MyMealFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startTransition } = useAppTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get("searchTerm") || "");

  useEffect(() => {
    setSearchValue(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("searchTerm", term);
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, 300);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearAll = () => {
    setSearchValue("");
    startTransition(() => {
      router.push(window.location.pathname);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-end">
        {/* Search */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Search Meal</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <Input
              placeholder="Search by meal name..."
              className="pl-11 h-12 rounded-2xl border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center w-full md:w-auto">
          {/* Availability Filter */}
          <div className="flex flex-col gap-2 relative group min-w-[160px]">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Availability</label>
            <div className="relative">
              <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
              <select
                value={searchParams.get("isAvailable") || "all"}
                onChange={(e) => handleFilterChange("isAvailable", e.target.value)}
                className="h-12 pl-10 pr-10 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer font-bold text-slate-600 dark:text-slate-400"
              >
                <option value="all">All Status</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Reset Button */}
          {(searchParams.get("searchTerm") || searchParams.get("isAvailable")) && (
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="h-12 px-6 rounded-2xl text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 font-bold transition-all flex items-center gap-2 mt-auto"
            >
              <RotateCcw size={16} />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMealFilters;
