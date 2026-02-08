import { MealType } from "@/types/meal.type";
import { ProviderType } from "@/types/provider.type";
import Image from "next/image";
import React from "react";

const ProviderCard = ({ provider }: { provider: ProviderType }) => {
 
  return (
    <div>
      <section className=" px-4 py-12 w-full">
        <div className="flex flex-col">
          {/* Image Box */}
          <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-lg mb-4">
            <Image
              src={provider.logo_url}
              alt={provider.name}
              fill
              className={`object-cover ${!provider.isAvailable ? "grayscale opacity-70" : "hover:scale-105"} transition-all duration-500`}
            />
            {!provider.isAvailable && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                Closed
              </div>
            )}
          </div>

          {/* Content Box */}
          <div className="px-2">
            <h3 className="text-2xl font-black text-gray-800 uppercase">
              {provider.name}
            </h3>

            {/* Categories */}
            <div className="mt-2 flex flex-wrap gap-x-2 text-gray-500 font-medium italic">
              {provider.meals?.length > 0 ? (
                Array.from(
                  new Set(
                    provider.meals
                      .map((meal: MealType) => meal.categories?.name)
                      .filter(Boolean)
                  ),
                ).map((categoryName, index, array) => (
                  <span key={index}>
                    {categoryName as string}
                    {index < array.length - 1 ? " •" : ""}
                  </span>
                ))
              ) : (
                <span>General Food</span>
              )}
            </div>

            <div className="mt-5 border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-400">
                Quick Delivery
              </span>
              <button className="bg-orange-600 hover:bg-black text-white px-6 py-2 rounded-xl font-bold transition-colors duration-300 cursor-pointer">
                MENU
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderCard;
