"use client";

import { useAppTransition } from "../users/UserManagementProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutList } from "lucide-react";

interface BlogPaginationProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const BlogPagination = ({ meta }: BlogPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startTransition } = useAppTransition();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value);
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-sm">
          <LayoutList size={18} className="text-orange-500" />
          Rows per page:
        </div>
        <Select
          defaultValue={meta.limit.toString()}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger className="w-[80px] h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <SelectValue placeholder={meta.limit.toString()} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-slate-400 font-medium">
          Total {meta.total} blog posts
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Page <span className="text-orange-500">{meta.page}</span> of {meta.totalPage}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 transition-all"
            disabled={meta.page <= 1}
            onClick={() => handlePageChange(meta.page - 1)}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 transition-all"
            disabled={meta.page >= meta.totalPage}
            onClick={() => handlePageChange(meta.page + 1)}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPagination;
