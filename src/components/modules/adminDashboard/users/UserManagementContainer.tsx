"use client";

import { useTransition, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface UserManagementContainerProps {
  children: ReactNode;
}

const UserManagementContainer = ({ children }: UserManagementContainerProps) => {
  const [isPending] = useTransition();

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-slate-950/40 backdrop-blur-[2px] transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-orange-500/20" />
            </div>
            <p className="text-orange-500 font-black tracking-widest uppercase text-xs">Updating List...</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`transition-all duration-300 ${isPending ? "blur-[1px] pointer-events-none brightness-95" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default UserManagementContainer;
