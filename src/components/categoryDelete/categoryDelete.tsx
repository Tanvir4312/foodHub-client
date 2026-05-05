/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { deleteCategoryAction } from "@/action/categories.action";
import { toast } from "sonner";

import { Trash2, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CategoryDelete = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setOpen(false);
    const toastId = toast.loading("Deleting Category...");
    try {
      const res = await deleteCategoryAction(id);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Category deleted successfully", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold transition-all flex items-center gap-2 group active:scale-90"
          title="Delete Category"
        >
          <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest">Delete</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] rounded-[32px] border-none p-0 overflow-hidden shadow-2xl">
        <div className="bg-red-500 h-2 w-full" />
        <div className="p-8 space-y-6">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <DialogTitle className="text-2xl font-black text-center text-slate-900 dark:text-slate-100">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-center text-slate-500 dark:text-slate-400 font-medium px-4">
              Are you sure you want to delete this category? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 rounded-2xl border-slate-200 dark:border-slate-800 font-bold text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <X size={18} className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20"
            >
              <Trash2 size={18} className="mr-2" />
              Delete Permanently
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDelete;
