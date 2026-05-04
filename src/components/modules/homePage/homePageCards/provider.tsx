import { cn } from "@/lib/utils";
import { MealType } from "@/types/meal.type";
import { ProviderType } from "@/types/provider.type";
import Image from "next/image";
import Link from "next/link";

const ProviderCard = ({ provider }: { provider: ProviderType }) => {
  return (
    <div className={cn("group", !provider.isAvailable && "pointer-events-none opacity-70")}>
      <Link href={`/restaurant/menu/${provider.id}`}>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 dark:hover:border-zinc-600 group">

          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-zinc-800">
            <Image
              src={provider.logo_url}
              alt={provider.name}
              fill
              unoptimized
              className={`object-cover transition-transform duration-500
        ${!provider.isAvailable ? "grayscale opacity-65" : "group-hover:scale-[1.07]"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/08 to-transparent " />

            {provider.isAvailable ? (
              <div className="absolute top-3 left-3 bg-black/45 dark:bg-white dark:text-gray-700 text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block " />
                Open
              </div>
            ) : (
              <div className="absolute top-3 right-3 bg-red-700 dark:bg-red-700 dark:text-red-200 text-red-100 text-[11px] font-medium px-2.5 py-1 rounded-full">
                Closed
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-4 bg-white dark:bg-zinc-900 group">
            <h3 className="text font-medium text-gray-900 tracking-tight uppercase tracking-wide mb-1">
              {provider.name}
            </h3>
            <div className="flex flex-wrap gap-x-1.5 text-gray-400 dark:text-zinc-500 text-xs italic mb-3">
              {provider.meals?.length > 0 ? (
                Array.from(
                  new Set(
                    provider?.meals
                      ?.map((meal: MealType) => meal.categories?.name)
                      .filter(Boolean),
                  ),
                )?.map((categoryName, index, array) => (
                  <span key={index}>
                    {categoryName as string}
                    {index < array.length - 1 ? " •" : ""}
                  </span>
                ))
              ) : (
                <span>General Food</span>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-zinc-700 pt-3 flex justify-between items-center">
              <span className="text-xs text-gray-400 dark:text-zinc-500">Quick Delivery</span>
              {provider.isAvailable ? (

                <button className="bg-orange-600 group-hover:bg-gray-900 group-hover:text-slate-50 dark:group-hover:bg-zinc-700 tracking-tight  text-xs font-medium px-4 py-1.5 rounded-lg transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]">
                  Menu
                </button>

              ) : (
                <button
                  disabled
                  className="bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 text-xs font-medium px-4 py-1.5 rounded-lg cursor-not-allowed"
                >
                  Menu
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProviderCard;
