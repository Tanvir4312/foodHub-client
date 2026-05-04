import { StarDisplay } from "../StarDisplay/StarDispaly";
import { timeAgo } from "../Time/TimeAgo";
// ─── helper functions ─────────────────────────────────────────────────────────
const AVATAR_COLORS = [
    { bg: "#E6F1FB", text: "#0C447C" },
    { bg: "#E1F5EE", text: "#085041" },
    { bg: "#FAEEDA", text: "#633806" },
    { bg: "#EEEDFE", text: "#3C3489" },
    { bg: "#FCEBEB", text: "#791F1F" },
    { bg: "#FBEAF0", text: "#72243E" },
];

function getInitials(name = "") {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}


// ─── ReviewCard ───────────────────────────────────────────────────────────────
export function ReviewCardHomePage({ review, index = 0 }: { review: any; index?: number }) {
    const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
    const initials = getInitials(review.name || review.user?.name);
    const displayName = review.name || review.user?.name || "Anonymous";
    const mealName = review.meal?.name || "";

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 flex flex-col gap-2 shadow-sm">
            {/* top row */}
            <div className="flex items-center gap-2.5">
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                    style={{ background: color.bg, color: color.text }}
                >
                    {initials}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                        {displayName}
                    </div>
                    <div className="text-xs text-gray-400">
                        {timeAgo(review.createdAt)}
                    </div>
                </div>
            </div>

            {/* stars */}
            <StarDisplay rating={review.rating} size={14} />

            {/* meal tag */}
            {mealName && (
                <span className="inline-block text-[11px] px-2.5 py-0.5 bg-gray-100 rounded-full text-gray-500 w-fit">
                    {mealName}
                </span>
            )}

            {/* comment */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {review.comment}
            </p>
        </div>
    );
}
