"use client"
import { ReviewsShowHomePage } from "@/types/review.type";
import { useEffect, useState } from "react";
import { RatingSummary } from "../homePage/ReviewShow/RatingSummary/RatingSummary";
import { ReviewCardHomePage } from "../homePage/ReviewShow/ReviewCaer/ReviewCard";



// ─── ReviewsSection (main export) ────────────────────────────────────────────
export default function ShowAllReview({ reviews }: { reviews: ReviewsShowHomePage[] }) {
    return (
        <section className="py-10">
            {/* header */}
            <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                    What customers say
                </h2>

            </div>

            {/* rating summary */}
            <RatingSummary reviews={reviews} />

            {/* review cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {reviews.map((review: any, i: number) => (
                    <ReviewCardHomePage key={i} review={review} index={i} />
                ))}
            </div>
        </section>
    );
}
