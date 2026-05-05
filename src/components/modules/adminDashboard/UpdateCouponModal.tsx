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
import { Edit2, Ticket, Calendar, Percent, Users, Loader2, Sparkles, Power } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { updateCouponAction } from "@/action/coupon.action";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { CouponType } from "@/types/coupon.type";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20),
  discount: z.number().min(1, "Discount must be at least 1%").max(100, "Discount cannot exceed 100%"),
  expiresAt: z.string().min(1, "Expiry date is required"),
  usageLimit: z.number().optional(),
  isActive: z.boolean(),
});

interface UpdateCouponModalProps {
  coupon: CouponType;
}

const UpdateCouponModal = ({ coupon }: UpdateCouponModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);
    const rawData = {
      code: formData.get("code") as string,
      discount: Number(formData.get("discount")),
      expiresAt: formData.get("expiresAt") as string,
      usageLimit: formData.get("usageLimit") ? Number(formData.get("usageLimit")) : undefined,
      isActive: formData.get("isActive") === "true",
    };

    // Zod Validation
    const validation = couponSchema.safeParse(rawData);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await updateCouponAction(coupon.id, rawData);
      if (res.data) {
        toast.success("Coupon updated successfully!", {
          description: `Code ${rawData.code.toUpperCase()} has been updated.`,
        });
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.error?.message || "Failed to update coupon");
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
        <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer group" title="Edit Coupon">
          <Edit2 size={16} className="group-hover:scale-110 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-[95%] rounded-3xl p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
        
        <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600">
                <Ticket size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Update <span className="text-blue-500">Coupon</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                  Modify the details for code: {coupon.code}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup className="space-y-5">
              <Field className="space-y-2">
                <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Coupon Code</FieldLabel>
                <div className="relative group">
                  <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    name="code"
                    required
                    defaultValue={coupon.code}
                    placeholder="FOODHUB50"
                    className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 font-mono font-bold uppercase"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Discount (%)</FieldLabel>
                  <div className="relative group">
                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      name="discount"
                      type="number"
                      required
                      defaultValue={coupon.discount}
                      min="1"
                      max="100"
                      placeholder="20"
                      className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 font-bold"
                    />
                  </div>
                </Field>

                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Usage Limit</FieldLabel>
                  <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      name="usageLimit"
                      type="number"
                      defaultValue={coupon.usageLimit}
                      min="1"
                      placeholder="100"
                      className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 font-bold"
                    />
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Expiry Date</FieldLabel>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      name="expiresAt"
                      type="date"
                      required
                      defaultValue={coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().split('T')[0] : ''}
                      className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 font-bold text-sm"
                    />
                  </div>
                </Field>

                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Status</FieldLabel>
                  <div className="relative group">
                    <Power className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <select
                      name="isActive"
                      defaultValue={String(coupon.isActive)}
                      className="w-full h-14 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500/20 font-bold outline-none appearance-none cursor-pointer"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </Field>
              </div>
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
                    Update Coupon <Sparkles size={18} />
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

export default UpdateCouponModal;
