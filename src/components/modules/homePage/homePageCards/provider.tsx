import { cn } from "@/lib/utils";
import { MealType } from "@/types/meal.type";
import { ProviderType } from "@/types/provider.type";
import Image from "next/image";
import Link from "next/link";

const ProviderCard = ({ provider }: { provider: ProviderType }) => {
  return (
    <div className={cn("group flex flex-col h-full", !provider.isAvailable && "opacity-70")}>
      <Link href={`/restaurant/menu/${provider.id}`} className="flex-grow flex flex-col">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl dark:hover:border-orange-500/30 flex flex-col h-full">
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-zinc-800">
            <Image
              src={provider.logo_url}
              alt={provider.name}
              fill
              unoptimized
              className={`object-cover transition-transform duration-700
                ${!provider.isAvailable ? "grayscale opacity-50" : "group-hover:scale-110"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {provider.isAvailable ? (
                <div className="bg-white/95 dark:bg-black/80 backdrop-blur-md text-green-600 dark:text-green-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available
                </div>
              ) : (
                <div className="bg-red-500/90 dark:bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-xl">
                  Closed
                </div>
              )}
            </div>

            <div className="absolute bottom-4 left-4">
              <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg">
                Quick Delivery
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2 group-hover:text-orange-500 transition-colors">
              {provider.name}
            </h3>
            
            <div className="flex flex-wrap gap-1.5 mb-6">
              {provider.meals?.length > 0 ? (
                Array.from(
                  new Set(
                    provider?.meals
                      ?.map((meal: MealType) => meal.categories?.name)
                      .filter(Boolean)
                  )
                ).slice(0, 3).map((categoryName, index) => (
                  <span key={index} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-lg">
                    {categoryName as string}
                  </span>
                ))
              ) : (
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-lg">
                  General Food
                </span>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Experience</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Premium Dining</span>
              </div>

              {provider.isAvailable ? (
                <div className="bg-orange-500 text-white p-2.5 rounded-2xl group-hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 dark:shadow-none transform group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              ) : (
                <div className="bg-slate-100 dark:bg-white/5 text-slate-400 p-2.5 rounded-2xl">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProviderCard;
