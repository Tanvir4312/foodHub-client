import { StarDisplay } from "../StarDisplay/StarDispaly";

// ─── RatingSummary ────────────────────────────────────────────────────────────
export function RatingSummary({ reviews }: { reviews: any[] }) {
    const total = reviews.length;
    const avg = total ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / total : 0;
    const counts = [5, 4, 3, 2, 1].map((s: number) => ({
        star: s,
        count: reviews.filter((r: any) => r.rating === s).length,
    }));

    return (
        <div className="grid grid-cols-[auto_1fr] gap-6 items-center bg-gray-50 rounded-2xl p-5 md:p-6 mb-6 border border-gray-100">
            {/* average score */}
            <div className="text-center min-w-[90px]">
                <div className="text-5xl font-semibold leading-none text-gray-900">
                    {avg.toFixed(1)}
                </div>
                <div className="flex justify-center gap-0.5 my-1.5">
                    <StarDisplay rating={Math.round(avg)} size={16} />
                </div>
                <div className="text-xs text-gray-400">{total} reviews</div>
            </div>

            {/* bar breakdown */}
            <div className="space-y-1.5">
                {counts.map(({ star, count }) => (
                    <div key={star} className="flex items-center gap-2.5">
                        <span className="text-xs text-gray-500 w-2.5 text-right">
                            {star}
                        </span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                style={{ width: `${total ? Math.round((count / total) * 100) : 0}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-400 w-4.5">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}