"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAppTransition } from "../users/UserManagementProvider";

const CategoryFilters = () => {
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

  const handleClearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
      <div className="flex flex-col xl:flex-row gap-6 items-end">
        {/* Search */}
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Search Category</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
            <Input
              placeholder="Search by category name..."
              className="pl-11 pr-11 h-12 rounded-2xl border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            {searchValue && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Clear All Button */}
        {searchParams.get("searchTerm") && (
          <div className="pb-0.5">
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="h-12 px-6 rounded-2xl text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 font-bold transition-all flex items-center gap-2 mt-auto"
            >
              <RotateCcw size={16} />
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
