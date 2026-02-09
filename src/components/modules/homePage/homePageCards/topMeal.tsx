import { MealType } from "@/types/meal.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TopMealCard = ({ meal }: { meal: MealType }) => {
  return (
    <div>
      <Link href={`/meals/${meal.id}`} className="group cursor-pointer">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Meal Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={meal.image_url}
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

          {/* Rating with star */}
          {meal?.averageRating > 0 && (
            <div className="flex items-center gap-1 mt-3 px-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-4 h-4 ${
                      i < Math.floor(meal.averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500 ml-1">
                ({meal.averageRating.toFixed(1)})
              </span>
            </div>
          )}

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
