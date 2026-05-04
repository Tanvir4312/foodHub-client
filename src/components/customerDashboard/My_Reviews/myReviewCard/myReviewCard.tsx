import Image from "next/image";
import { StarDisplay } from "../starDisplay/starDispaly";
import { RatingBadge } from "../ratingBadge/ratingBadge";
import { timeAgo } from "../helper/helper";


function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

// ─── ReviewCard ───────────────────────────────────────────────────────────────
export function ReviewCard({ review }: { review: any }) {
    console.log(review)
    const mealName = review.meal?.name ?? "Unknown Meal";
    const imageUrl = review.meal?.image_url;

    return (
        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #F0F0F0",
                borderRadius: 16,
                padding: "1.25rem",
                display: "flex",
                gap: "1rem",
                transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)")
            }
            onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
            }
        >
            {/* meal image */}
            <div
                style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                }}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={mealName}
                        width={72}
                        height={72}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                ) : (
                    "🍛"
                )}
            </div>

            {/* content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                {/* top row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: 6,
                    }}
                >
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                            {mealName}
                        </div>
                        <StarDisplay rating={review.rating} size={13} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                        <RatingBadge rating={review.rating} />
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{timeAgo(review.createdAt)}</span>
                    </div>
                </div>

                {/* comment */}
                <p
                    style={{
                        fontSize: 13,
                        color: "#6B7280",
                        lineHeight: 1.6,
                        margin: "8px 0 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {review.comment}
                </p>

                {/* date */}
                <div style={{ fontSize: 11, color: "#D1D5DB", marginTop: 8 }}>
                    Reviewed on {formatDate(review.createdAt)}
                </div>
            </div>
        </div>
    );
}
