"use client";

import { useRouter, useSearchParams } from "next/navigation";


export default function MealFilterBar() {

    
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
  
    <div className="bg-white p-6 rounded-2xl shadow-sm border mb-10 flex flex-wrap gap-6 items-end justify-between">
      {/* Search Input */}
      <div className="flex-1 min-w-62.5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search Meals
        </label>
        <input
          type="text"
          placeholder="Search by name (e.g. Burger) or Categories (e.g. Bangladeshi)"
          className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          onChange={(e) => handleFilter("search", e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="flex gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Min Price
          </label>
          <input
            type="number"
            placeholder="0"
            className="w-24 border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={(e) => handleFilter("minPrice", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Max Price
          </label>
          <input
            type="number"
            placeholder="500"
            className="w-24 border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            onChange={(e) => handleFilter("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Dietary Select */}
      <div className="min-w-45">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Dietary Preference
        </label>
        <select
          className="w-full border-gray-200 border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none bg-white"
          onChange={(e) => handleFilter("dietary", e.target.value)}
        >
          <option value="">All Preferences</option>
          <option value="VEGAN">Vegan</option>
          <option value="VEGETARIAN">Vegetarian</option>
          <option value="NON_VEGETARIAN">Non Vegetarian</option>
          <option value="GLUTEN_FREE">Gluten Free</option>
          <option value="KETO">Keto</option>
          <option value="DAIRY_FREE">Dairy Free</option>
          <option value="NUT_FREE">Nut Free</option>
          <option value="EGG_FREE">Egg Free</option>
          <option value="LOW_CARB">Low Cabe</option>
          <option value="LOW_FAT">Low Fat</option>
          <option value="HIGH_PROTEIN">Hight Protein</option>
        </select>
      </div>
    </div>
  
  );
}
  