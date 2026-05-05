import MealDetailsClient from "@/components/modules/meals/mealDetailsClient";
import MealFilterBar from "@/components/modules/meals/mealFilter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaginationControls from "@/components/ui/pagination-controll";
import { mealServices } from "@/services/meal.services";
import { MealType } from "@/types/meal.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";

const MealsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    searchTerm: string;
    minPrice: string;
    maxPrice: string;
    dietary: string;
    page: string;
    limit: string;
  }>;
}) => {
  const { searchTerm, minPrice, maxPrice, dietary, page, limit } = await searchParams;

  const { data } = await mealServices.getMealService({
    searchTerm,
    minPrice,
    maxPrice,
    dietary,
    page,
    limit,
  });
  const meals = data?.data || [];
  const pagination = data?.pagination || {
    current_Page: 1,
    limit: Number(limit) || 7,
    total_meal: 0,
    totatl_page: 1,
  };

  return (
    <UserManagementProvider>
      <section className="py-16 px-4 bg-gray-50 dark:bg-black min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Heading & Description */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 mb-6 tracking-tight">
              Discover Our{" "}
              <span className="text-orange-600">Delicious Meals</span>
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
              Explore a wide variety of healthy, fresh, and tasty meals. Filter
              by price, dietary preference, or search for your favorite dish.
            </p>
          </div>

          {/* Filters */}
          <MealFilterBar />

          {/* Meal Grid with Loader Wrapper */}
          <TableLoaderWrapper>
            <div className="min-h-[500px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {meals?.map((meal: MealType) => (
                  <div
                    key={meal.id}
                    className="bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl dark:hover:border-orange-500/30 transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Meal Image */}
                    <Link href={`/meals/${meal.id}`} className="relative block h-64 overflow-hidden">
                      <Image
                        src={meal.image_url as string}
                        alt={meal.name as string}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-orange-600 shadow-xl border border-white/20">
                        ${meal.price}
                      </div>
                    </Link>

                    {/* Meal Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-black text-gray-800 dark:text-slate-100 line-clamp-1 group-hover:text-orange-500 transition-colors">
                          {meal.name}
                        </h3>
                      </div>

                      <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2 mb-8 min-h-[2.5rem]">
                        {meal.description ||
                          "Freshly prepared delicious meal made with premium ingredients."}
                      </p>

                      {/* Actions */}
                      <div className="flex flex-col gap-3 mt-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-200 dark:shadow-none">
                              Order Now
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader className="sr-only">
                              <DialogTitle>Meal Details</DialogTitle>
                            </DialogHeader>

                            <MealDetailsClient
                              meal={meal as MealType}
                              forceOpen={true}
                              text="order"
                            />
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="w-full border-2 cursor-pointer border-orange-500/20 dark:border-orange-500/30 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                              Add to Cart
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader className="sr-only">
                              <DialogTitle>Meal Details</DialogTitle>
                            </DialogHeader>

                            <MealDetailsClient
                              meal={meal as MealType}
                              forceOpen={true}
                              text="cart"
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {meals?.length === 0 && (
                <div className="text-center py-32 bg-gray-50 dark:bg-zinc-900/50 rounded-[40px] border border-dashed border-gray-200 dark:border-white/5">
                  <h3 className="text-2xl font-black text-gray-400 dark:text-slate-500">
                    No delicious meals found.
                  </h3>
                  <p className="text-gray-500 dark:text-slate-400 mt-2">Try adjusting your filters to find your favorite dish!</p>
                </div>
              )}
            </div>
          </TableLoaderWrapper>
        </div>
        <div className="mt-12">
          <PaginationControls meta={pagination}></PaginationControls>
        </div>
      </section>
    </UserManagementProvider>
  );
};

export default MealsPage;
