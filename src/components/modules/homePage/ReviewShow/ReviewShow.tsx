"use client"
import { ReviewsShowHomePage } from "@/types/review.type";
import { useEffect, useState } from "react";
import { RatingSummary } from "./RatingSummary/RatingSummary";
import { ReviewCardHomePage } from "./ReviewCaer/ReviewCard";

// ─── ReviewsSection (main export) ────────────────────────────────────────────
export default function ReviewsSection({ reviews }: { reviews: ReviewsShowHomePage[] }) {
    const sliceReviews = reviews.slice(0, 6)
    const [allReviews, setAllReviews] = useState<ReviewsShowHomePage[]>(sliceReviews);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setAllReviews(allReviews);
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <section className="py-10">
                <div className="text-sm text-gray-400 text-center">
                    Loading reviews...
                </div>
            </section>
        );
    }

    const displayReviews = reviews.slice(0, 6);

    return (
        <section className="py-10">
            {/* header */}
            <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                    What customers say
                </h2>
                <a
                    href="/reviews"
                    className="text-sm text-blue-600 hover:underline font-medium"
                >
                    See all →
                </a>
            </div>

            {/* rating summary */}
            <RatingSummary reviews={reviews} />

            {/* review cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {displayReviews.map((review: any, i: number) => (
                    <ReviewCardHomePage key={i} review={review} index={i} />
                ))}
            </div>
        </section>
    );
}
