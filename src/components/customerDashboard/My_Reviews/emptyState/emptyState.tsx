// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState() {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "4rem 2rem",
                background: "#FAFAFA",
                borderRadius: 16,
                border: "1px dashed #E5E7EB",
            }}
        >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                No reviews yet
            </div>
            <div style={{ fontSize: 14, color: "#9CA3AF" }}>
                Order something delicious and share your experience!
            </div>
        </div>
    );
}