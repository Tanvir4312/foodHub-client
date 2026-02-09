import { MealType } from "@/types/meal.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import mealPic from "../../../../../public/images/hero-5.jpg"

const TopMealCard = ({ meal } : {meal : MealType}) => {
  return (
    <div>
      <Link href={`/meals/${meal.id}`} className="group cursor-pointer">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Meal Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={meal.image_url || mealPic}
              alt={meal.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Badge for Rating */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-800">
                {meal.averageRating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-1">
                {meal.name}
              </h3>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-orange-600 font-extrabold text-xl">
                ${meal.price}
              </span>
              <button className="text-sm font-medium text-orange-500 border border-orange-500 px-4 py-1.5 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopMealCard;
