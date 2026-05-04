import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const couponServices = {
    getAllCouponService: async () => {
        const cookieStore = await cookies();
        try {
            const url = new URL(`${API_URL}/coupons`);

            const res = await fetch(url.toString(), {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["all-coupon"] }
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
}

