"use client";

import { useAppTransition } from "./UserManagementProvider";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

const TableLoaderWrapper = ({ children }: { children: ReactNode }) => {
  const { isPending } = useAppTransition();

  return (
    <div className="relative">
      {/* Targeted Loading Overlay */}
      {isPending && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/40 backdrop-blur-[6px] rounded-[40px] transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[48px] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-orange-500/10" />
            </div>
            <p className="text-orange-500 font-black tracking-widest uppercase text-[10px]">Syncing Table...</p>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className={`transition-all duration-500 ${isPending ? "blur-[2px] grayscale-[0.5]" : "blur-0 grayscale-0"}`}>
        {children}
      </div>
    </div>
  );
};

export default TableLoaderWrapper;
