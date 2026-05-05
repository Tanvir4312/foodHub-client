"use server";

import { couponServices } from "@/services/coupon.service";
import { revalidateTag } from "next/cache";

export const createCouponAction = async (payload: {
  code: string;
  discount: number;
  expiresAt: string;
  usageLimit?: number;
  isActive?: boolean;
}) => {
  const res = await couponServices.createCouponService(payload);
  if (res.data) {
    revalidateTag("all-coupons", "max");
  }
  return res;
};

export const updateCouponAction = async (id: string, payload: {
  code?: string;
  discount?: number;
  expiresAt?: string;
  usageLimit?: number;
  isActive?: boolean;
}) => {
  const res = await couponServices.updateCouponService(id, payload);
  if (res.data) {
    revalidateTag("all-coupons", "max");
  }
  return res;
};

export const deleteCouponAction = async (id: string) => {
  const res = await couponServices.deleteCouponService(id);
  if (res.data) {
    revalidateTag("all-coupons", "max");
  }
  return res;
};

export const getAllCouponAction = async () => {
  return await couponServices.getAllCouponService();
};
