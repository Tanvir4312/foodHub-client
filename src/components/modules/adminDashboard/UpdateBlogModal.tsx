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
import { Edit2, Type, AlignLeft, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { updateFoodBlogAction } from "@/action/foodBlog.action";
import { useRouter } from "next/navigation";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters"),
  image: z.string().url("Invalid image URL"),
});

interface UpdateBlogModalProps {
  blog: any;
}

const UpdateBlogModal = ({ blog }: UpdateBlogModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
    };

    // Zod Validation
    const validation = blogSchema.safeParse(rawData);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await updateFoodBlogAction(blog.id, rawData);
      if (res.data) {
        toast.success("Blog updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.error?.message || "Failed to update blog");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer group" title="Edit Blog">
          <Edit2 size={16} className="group-hover:scale-110 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-[95%] rounded-3xl p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
        
        <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600">
                <AlignLeft size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Update <span className="text-blue-500">Food Blog</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                  Modify the details for your blog post
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup className="space-y-5">
              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Blog Title</FieldLabel>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    name="title"
                    required
                    defaultValue={blog.title}
                    placeholder="The Secret of Perfect Sushi"
                    className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 font-bold"
                  />
                </div>
              </Field>

              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Image URL</FieldLabel>
                <div className="relative group">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    name="image"
                    required
                    defaultValue={blog.image}
                    placeholder="https://example.com/image.jpg"
                    className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
                  />
                </div>
                <p className="text-[10px] text-slate-400 ml-1 italic">
                  Tip: Upload to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">imgbb.com</a> and use the Direct Link.
                </p>
              </Field>

              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</FieldLabel>
                <Textarea
                  name="description"
                  required
                  defaultValue={blog.description}
                  placeholder="Share the story behind this delicious meal..."
                  className="min-h-[200px] rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 p-5 leading-relaxed"
                />
              </Field>
            </FieldGroup>

            <div className="pt-4">
              <Button
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black shadow-xl shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Update Blog <Sparkles size={18} />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBlogModal;
