import MealFilterBar from "@/components/modules/meals/mealFilter";
import PaginationControls from "@/components/ui/pagination-controll";
import { mealServices } from "@/services/meal.services";
import { MealType } from "@/types/meal.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MealsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    minPrice: string;
    maxPrice: string;
    dietary: string
    page : string
  }>;
}) => {
  const { search, minPrice, maxPrice, dietary, page } = await searchParams;

  const { data } = await mealServices.getMealService({
    search,
    minPrice,
    maxPrice,
    dietary,
    page
  });
  const meals = data?.data || [];
  const pagination = data?.pagination || {
    current_Page: 1,
    limit: 7,
    total_meal : 0,
    totatl_page: 1,
  };

  return (
    <div>
      <section className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Heading & Description */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Discover Our{" "}
              <span className="text-orange-600">Delicious Meals</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Explore a wide variety of healthy, fresh, and tasty meals. Filter
              by price, dietary preference, or search for your favorite dish.
            </p>
          </div>

          {/* Filters */}
          <MealFilterBar />

          {/* Meal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {meals?.map((meal: MealType) => (
              <div
                key={meal.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Meal Image */}
                <Link href={`/meal/${meal.id}`}>
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={meal.image_url}
                      alt={meal.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600 shadow-sm">
                      ${meal.price}
                    </div>
                  </div>
                </Link>

                {/* Meal Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                      {meal.name}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {meal.description ||
                      "Freshly prepared delicious meal made with premium ingredients."}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-50 text-sm transition-colors">
                      Add to Cart
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 text-sm shadow-lg shadow-orange-200 transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {meals?.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-medium text-gray-400">
                No meals found. Try adjusting your filters!
              </h3>
            </div>
          )}
        </div>
      <PaginationControls meta={pagination}></PaginationControls>
      </section>
    </div>
  );
};

export default MealsPage;
