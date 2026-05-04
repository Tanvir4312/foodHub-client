import { Search, ShoppingBag, Zap } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Browse Restaurants",
        desc: "Explore top-rated restaurants and menus near you",
    },
    {
        icon: ShoppingBag,
        title: "Place Your Order",
        desc: "Add meals to cart and checkout in seconds",
    },
    {
        icon: Zap,
        title: "Fast Delivery",
        desc: "Your food arrives hot and fresh at your door",
    },
];

export default function HowItWorks() {
    return (
        <section className="px-4 bg-white dark:bg-zinc-950">
            <div className="max-w-5xl mx-auto text-center">

                {/* Header */}
                <p className="text-xs font-semibold tracking-widest text-[#f54a00] uppercase mb-2">
                    Simple Process
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-widest tracking-tighter text-gray-900 mb-3">
                    How It Works
                </h2>
                <p className="text-gray-400 dark:text-zinc-500 text-sm mb-14">
                    Order your favorite food in just 3 easy steps
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">

                    {/* Dashed connector line — desktop only */}
                    <div className="hidden md:block absolute top-9 left-[22%] right-[22%] border-t-2 border-dashed border-orange-200 dark:border-orange-900 z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex flex-col items-center px-6 relative z-10 mb-10 md:mb-0">

                                {/* Icon circle */}
                                <div className="relative group mb-5">
                                    <div className="w-[72px] h-[72px] rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f54a00] group-hover:border-[#f54a00] group-hover:scale-110 cursor-default">
                                        <Icon
                                            size={26}
                                            className="text-[#f54a00] group-hover:text-white transition-colors duration-300"
                                        />
                                    </div>
                                    {/* Step number badge */}
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f54a00] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
                                        {index + 1}
                                    </span>
                                </div>

                                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-400 dark:text-zinc-500 leading-relaxed max-w-[160px]">
                                    {step.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}