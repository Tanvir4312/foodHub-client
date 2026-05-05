"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Ticket, Calendar, Percent, Users, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { createCouponAction } from "@/action/coupon.action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateCouponModal = () => {
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
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      code: formData.get("code") as string,
      discount: Number(formData.get("discount")),
      expiresAt: formData.get("expiresAt") as string,
      usageLimit: formData.get("usageLimit") ? Number(formData.get("usageLimit")) : undefined,
      isActive: formData.get("isActive") === "true",
    };

    try {
      const res = await createCouponAction(payload);
      if (res.data) {
        toast.success("Coupon created successfully!", {
          description: `Code ${payload.code.toUpperCase()} is now active.`,
        });
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.error?.message || "Failed to create coupon");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-6 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center gap-2 group">
          <Plus className="group-hover:rotate-90 transition-transform" />
          Create New Coupon
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-[95%] rounded-3xl p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

        <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-600">
                <Ticket size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Create <span className="text-orange-500">Coupon</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                  Add a new discount code for your customers
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup className="space-y-5">
              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Coupon Code</FieldLabel>
                <div className="relative group">
                  <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    name="code"
                    required
                    placeholder="FOODHUB50"
                    className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 font-mono font-bold uppercase placeholder:font-sans placeholder:text-slate-400"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Discount (%)</FieldLabel>
                  <div className="relative group">
                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                      name="discount"
                      type="number"
                      required
                      min="1"
                      max="100"
                      placeholder="20"
                      className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 font-bold"
                    />
                  </div>
                </Field>

                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Usage Limit</FieldLabel>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                      name="usageLimit"
                      type="number"
                      min="1"
                      placeholder="100"
                      className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 font-bold"
                    />
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Expiry Date</FieldLabel>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                      name="expiresAt"
                      type="date"
                      required
                      className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 font-bold"
                    />
                  </div>
                </Field>

                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Status</FieldLabel>
                  <select
                    name="isActive"
                    defaultValue="true"
                    className="w-full h-14 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-orange-500/20 font-bold outline-none appearance-none cursor-pointer"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </Field>
              </div>
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
                    Generate Coupon <Sparkles size={18} />
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

export default CreateCouponModal;
