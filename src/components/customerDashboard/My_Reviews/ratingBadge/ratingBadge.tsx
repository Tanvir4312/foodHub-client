// ─── RatingBadge ──────────────────────────────────────────────────────────────
export function RatingBadge({ rating }: { rating: number }) {
    const color =
        rating >= 4 ? { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" }
            : rating === 3 ? { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" }
                : { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" };

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                background: color.bg,
                color: color.text,
                border: `1px solid ${color.border}`,
            }}
        >
            ★ {rating}.0
        </span>
    );
}