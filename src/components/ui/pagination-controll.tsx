"use client";

import {
  ChevronLeft,
  ChevronRight,
  LayoutList,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppTransition } from "../modules/adminDashboard/users/UserManagementProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface PaginationControlsProps {
  meta: {
    limit: number;
    current_Page: number;
    total_meal: number;
    totatl_page: number;
  };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
  const {
    limit: pageSize,
    current_Page: currentPage,
    total_meal: total,
    totatl_page: totalPages,
  } = meta;

  const searchParams = useSearchParams();
  const router = useRouter();
  const { startTransition } = useAppTransition();

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleLimitChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("limit", value);
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
          <LayoutList size={18} className="text-orange-500" />
          Rows per page:
        </div>
        <Select
          defaultValue={pageSize.toString()}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger className="w-[80px] h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 font-bold">
            <SelectValue placeholder={pageSize.toString()} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          Total <span className="text-slate-900 dark:text-slate-100 font-bold">{total}</span> meals
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Page <span className="text-orange-500">{currentPage}</span> of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 transition-all shadow-sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 transition-all shadow-sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
