"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "./emptyState/emptyState";
import { ReviewCard } from "./myReviewCard/myReviewCard";
export default function MyReviews({ myReviews }: { myReviews: any[] }) {
    const [reviews, setReviews] = useState(myReviews);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setReviews(myReviews);
            setLoading(false);
        };
        fetchReviews();
    }, []);

    // ── stats ──
    const total = reviews.length;
    const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
    const fiveStars = reviews.filter((r) => r.rating === 5).length;

    return (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 0" }}>
            {/* header */}
            <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111827", margin: 0 }}>
                    My Reviews
                </h1>
                <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>
                    Your feedback on past orders
                </p>
            </div>

            {/* stats row */}
            {total > 0 && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 12,
                        marginBottom: "1.5rem",
                    }}
                >
                    {[
                        { label: "Total Reviews", value: total, icon: "📝" },
                        { label: "Average Rating", value: `${avg.toFixed(1)} ★`, icon: "⭐" },
                        { label: "5-Star Reviews", value: fiveStars, icon: "🏆" },
                    ].map(({ label, value, icon }) => (
                        <div
                            key={label}
                            style={{
                                background: "#F9FAFB",
                                borderRadius: 12,
                                padding: "1rem",
                                textAlign: "center",
                                border: "1px solid #F0F0F0",
                            }}
                        >
                            <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                            <div style={{ fontSize: 20, fontWeight: 600, color: "#111827" }}>{value}</div>
                            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* list */}
            {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                height: 110,
                                borderRadius: 16,
                                background: "linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.4s infinite",
                            }}
                        />
                    ))}
                    <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
                </div>
            ) : total === 0 ? (
                <EmptyState />
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
}
