/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { Review } from "@/types/review.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const reviewServices = {
  createReviewService: async (reviewData: Review, id: string) => {
    try {
      const url = new URL(`${API_URL}/customer/customer-review/${id}`);
      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      const review = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: review.message || "Something went wrong!" },
        };
      }
      return { data: review, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
