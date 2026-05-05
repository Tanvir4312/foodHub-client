"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteFoodBlogAction } from "@/action/foodBlog.action";

interface DeleteBlogModalProps {
  blogId: string;
  blogTitle: string;
}

const DeleteBlogModal = ({ blogId, blogTitle }: DeleteBlogModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteFoodBlogAction(blogId);
      if (res.data) {
        toast.success("Blog deleted successfully");
        setIsOpen(false);
      } else {
        toast.error(res.error?.message || "Failed to delete blog");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer group" title="Delete Blog">
          <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-[95%] rounded-3xl p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
        
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-full text-red-600 mb-4">
                <AlertTriangle size={32} />
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Delete <span className="text-red-500">Blog?</span>
              </DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                Are you sure you want to permanently remove <span className="font-bold text-slate-900 dark:text-white">"{blogTitle}"</span>? This action cannot be undone.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Cancel
            </Button>
            <Button
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/25 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Delete Now"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogModal;
