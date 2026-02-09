import { mealServices } from "@/services/meal.services";

import React from "react";
import TopMealCard from "./homePageCards/topMeal";
import { MealType } from "@/types/meal.type";

const TopRatngMeal = async () => {
  const { data: meals } = await mealServices.getTopMealService();
 
  return (
    <div>
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Our Highest Rated Delights
        </h2>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl">
          Experience the culinary excellence that our community loves most.
          Hand-picked dishes with consistent 4-star ratings and glowing reviews.
        </p>
        <div className="mt-4 h-1 w-20 bg-orange-500 rounded-full"></div>{" "}
    
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {meals?.map((meal: MealType) => (
          <TopMealCard key={meal.id} meal={meal}></TopMealCard>
        ))}
      </div>
    </div>
  );
};

export default TopRatngMeal;
