"use server";
import { reviewServices } from "@/services/review.services";
import { Review } from "@/types/review.type";
import { revalidateTag } from "next/cache";

export const createReviewAction = async (reviewData: Review, id: string) => {
  const result = await reviewServices.createReviewService(reviewData, id);
  revalidateTag("review-data", "max");
  return result;
};

export const getReviewsForHomePageAction = async () => {
  const result = await reviewServices.getReviewsForHomePageService();
  return result;
};
export const getMyReviewsAction = async () => {
  const result = await reviewServices.getMyReviewsService();
  return result;
};
