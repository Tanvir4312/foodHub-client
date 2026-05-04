"use client";

import { CouponType } from "@/types/coupon.type";
import { useEffect, useState } from "react";

// expiresAt তারিখের রাত ১১:৫৯:৫৯ পর্যন্ত কত সেকেন্ড বাকি
const getSecondsLeft = (expiresAt: string, currentMs: number): number => {
    const expiry = new Date(expiresAt);
    const endOfDay = new Date(
        expiry.getFullYear(),
        expiry.getMonth(),
        expiry.getDate(),
        23, 59, 59
    );
    const diff = Math.floor((endOfDay.getTime() - currentMs) / 1000);
    return Math.max(0, diff);
};

const formatTime = (totalSeconds: number) => ({
    d: String(Math.floor(totalSeconds / 86400)).padStart(2, "0"),
    h: String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0"),
    m: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"),
    s: String(totalSeconds % 60).padStart(2, "0"),
});

export default function SpecialOffers({ activeCoupons }: { activeCoupons: CouponType[] }) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (coupon: CouponType) => {
        navigator.clipboard.writeText(coupon.code).then(() => {
            setCopiedId(coupon.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    useEffect(() => {
        setIsMounted(true);
        setCurrentTime(Date.now());

        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl shadow">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-xs font-semibold tracking-widest text-[#f54a00] uppercase mb-2">
                        Limited Time
                    </p>
                    <h2 className="tracking-tighter text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                        Special Offers
                    </h2>
                    <p className="text-sm text-gray-400 dark:text-zinc-500">
                        Grab these deals before they&apos;re gone
                    </p>
                </div>

                {/* Coupon Cards from API */}
                {activeCoupons.length === 0 ? (
                    <p className="text-center text-gray-400 dark:text-zinc-500 text-sm">
                        No active coupons right now. Check back soon!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeCoupons.map((coupon, index) => {
                            const isFeatured = index === 0;
                            const isExpiringSoon = isMounted &&
                                new Date(coupon.expiresAt).getTime() - currentTime <
                                7 * 24 * 60 * 60 * 1000;

                            const usagePercent =
                                coupon.usageLimit
                                    ? Math.round(((coupon.usedCount || 0) / coupon.usageLimit) * 100)
                                    : null;

                            // usageLimit পূর্ণ হলে isMaxed = true
                            const isMaxed =
                                coupon.usageLimit !== null &&
                                coupon.usageLimit !== undefined &&
                                (coupon.usedCount || 0) >= coupon.usageLimit;

                            const secondsLeft = getSecondsLeft(coupon.expiresAt, currentTime);
                            const { d, h, m, s } = formatTime(secondsLeft);

                            return (
                                <div
                                    key={coupon.id}
                                    className={`relative rounded-2xl p-5 overflow-hidden border transition-all duration-300 cursor-pointer
                                        ${isMaxed
                                            ? "opacity-50 grayscale cursor-not-allowed"
                                            : "hover:-translate-y-1"
                                        }
                                        ${isFeatured
                                            ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800"
                                            : "bg-white dark:bg-zinc-800 border-gray-100 dark:border-zinc-700"
                                        }`}
                                >
                                    {isFeatured && (
                                        <>
                                            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20" />
                                            <div className="absolute right-5 -bottom-7 w-14 h-14 rounded-full bg-orange-100/60 dark:bg-orange-900/10" />
                                        </>
                                    )}

                                    <div className="relative z-10">
                                        <span
                                            className={`inline-block text-[11px] font-semibold px-3 py-0.5 rounded-full mb-3
                                                ${isFeatured
                                                    ? "bg-[#f54a00] text-orange-50"
                                                    : isExpiringSoon
                                                        ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                                        : "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300"
                                                }`}
                                        >
                                            {isFeatured ? "Hot Deal" : isExpiringSoon ? "Expiring Soon" : "Active"}
                                        </span>

                                        <p className={`font-extrabold mb-1 text-[#f54a00] ${isFeatured ? "text-3xl" : "text-2xl"}`}>
                                            {coupon.discount}% OFF
                                        </p>

                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-mono font-bold tracking-wider bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">
                                                {coupon.code}
                                            </span>
                                        </div>

                                        <p className={`text-xs leading-relaxed mb-3 ${isFeatured ? "text-orange-700 dark:text-orange-300" : "text-gray-400 dark:text-zinc-500"}`}>
                                            Valid until{" "}
                                            {new Date(coupon.expiresAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>

                                        {usagePercent !== null && (
                                            <div className="mb-4">
                                                <div className="flex justify-between text-[10px] text-gray-400 dark:text-zinc-500 mb-1">
                                                    <span>{coupon.usedCount} used</span>
                                                    <span>{coupon.usageLimit} max</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#f54a00] rounded-full transition-all"
                                                        style={{ width: `${usagePercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Countdown Timer */}
                                        <div className="flex gap-2 mb-4">
                                            {[
                                                { val: d, label: "days" },
                                                { val: h, label: "hrs" },
                                                { val: m, label: "min" },
                                                { val: s, label: "sec" },
                                            ].map(({ val, label }) => (
                                                <div key={label} className="text-center">
                                                    <div suppressHydrationWarning className="bg-[#f54a00] text-white text-sm font-bold px-2.5 py-1 rounded-md min-w-[36px]">
                                                        {isMounted ? val : "00"}
                                                    </div>
                                                    <span className="text-[9px] text-orange-600 dark:text-orange-400 mt-0.5 block">
                                                        {label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => !isMaxed && handleCopy(coupon)}
                                            disabled={isMaxed}
                                            className={`text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 w-full
                                                ${isMaxed
                                                    ? "bg-gray-300 dark:bg-zinc-600 text-gray-500 dark:text-zinc-400 cursor-not-allowed"
                                                    : copiedId === coupon.id
                                                        ? "bg-green-500 text-white"
                                                        : "bg-[#f54a00] hover:bg-orange-700 text-white"
                                                }`}
                                        >
                                            {isMaxed ? (
                                                "Offer Ended"
                                            ) : copiedId === coupon.id ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                                    Claim Offer
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
