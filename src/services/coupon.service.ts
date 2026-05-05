

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const couponServices = {
  createCouponService: async (payload: {
    code: string;
    discount: number;
    expiresAt: string;
    usageLimit?: number;
    isActive?: boolean;
  }) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data || "Failed to create coupon" } };
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Internal Server Error" } };
    }
  },

  updateCouponService: async (id: string, payload: {
    code?: string;
    discount?: number;
    expiresAt?: string;
    usageLimit?: number;
    isActive?: boolean;
  }) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/coupons/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data || "Failed to update coupon" } };
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Internal Server Error" } };
    }
  },

  deleteCouponService: async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/coupons/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data || "Failed to delete coupon" } };
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message || "Internal Server Error" } };
    }
  },

  getAllCouponService: async () => {
    try {
      const url = new URL(`${API_URL}/coupons`);

      const res = await fetch(url.toString(), {

        next: { tags: ["all-coupons"] }
      });

      const allCoupon = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: allCoupon.message || allCoupon || "Something went wrong!" },
        };
      }
      return { data: allCoupon, error: null };
    } catch (err: any) {
      console.error("Error fetching coupons:", err);
      return { data: null, error: { message: err.message || "Something went wrong" } };
    }
  },
};
