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
import { Plus, Type, AlignLeft, Image as ImageIcon, Loader2, Sparkles, PencilLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { createFoodBlogAction } from "@/action/foodBlog.action";
import { useRouter } from "next/navigation";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters"),
  image: z.string().url("Invalid image URL"),
});

const CreateBlogModal = () => {
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
      const res = await createFoodBlogAction(rawData);
      if (res.data) {
        toast.success("Blog post created successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.error?.message || "Failed to create blog");
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
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 h-12 rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center gap-2">
          <Plus size={20} strokeWidth={3} />
          Create New Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-[95%] rounded-3xl p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />
        
        <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-600">
                <PencilLine size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Publish <span className="text-orange-500">New Blog</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                  Share your latest culinary stories and tips with the world.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup className="space-y-5">
              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Blog Title</FieldLabel>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    name="title"
                    required
                    placeholder="The Secret of Perfect Sushi"
                    className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 font-bold"
                  />
                </div>
              </Field>

              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Image URL</FieldLabel>
                <div className="relative group">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    name="image"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20"
                  />
                </div>
                <p className="text-[10px] text-slate-400 ml-1 italic">
                  Tip: Upload to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline font-bold">imgbb.com</a> and use the Direct Link.
                </p>
              </Field>

              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</FieldLabel>
                <Textarea
                  name="description"
                  required
                  placeholder="Share the story behind this delicious meal..."
                  className="min-h-[200px] rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 p-5 leading-relaxed"
                />
              </Field>
            </FieldGroup>

            <div className="pt-4">
              <Button
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black shadow-xl shadow-orange-500/25 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Publish Blog <Sparkles size={18} />
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

export default CreateBlogModal;
