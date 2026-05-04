// ─── helpers ──────────────────────────────────────────────────────────────────
export function timeAgo(dateStr: string): string {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 86400) return "Today";
    if (diff < 172800) return "Yesterday";
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    const w = Math.floor(diff / 604800);
    if (diff < 2592000) return `${w} week${w > 1 ? "s" : ""} ago`;
    const m = Math.floor(diff / 2592000);
    return `${m} month${m > 1 ? "s" : ""} ago`;
}