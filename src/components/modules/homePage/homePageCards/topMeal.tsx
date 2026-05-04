import { MealType } from "@/types/meal.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TopMealCard = ({ meal }: { meal: MealType }) => {
  return (
    <div>
      <Link href={`/meals/${meal.id}`} className="group cursor-pointer">
        {/* card wrapper — shadow সরিয়ে border দিলাম, hover এ উপরে উঠবে */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200">

          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={meal.image_url as string}
              alt={meal.name as string}
              fill
              unoptimized
              className="object-cover group-hover:scale-[1.08] transition-transform duration-500"
            />
            {/* Rating badge — backdrop blur রাখলাম, size ছোট করলাম */}
            <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-800">
                {(meal.averageRating as number).toFixed(1)}
              </span>
            </div>
          </div>

          {/* Stars */}
          {(meal?.averageRating as number) > 0 && (
            <div className="flex items-center gap-1 pt-2.5 px-3.5">
              <div className="flex gap-px">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className={`w-3.5 h-3.5 ${i < Math.floor((meal.averageRating as number)) ? "text-yellow-400" : "text-gray-200"}`}>
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] text-gray-400 ml-0.5">
                ({(meal.averageRating as number).toFixed(1)})
              </span>
            </div>
          )}

          {/* Content */}
          <div className="px-3.5 pt-2 pb-3.5">
            <h3 className="text-[15px] font-bold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-1 mb-3">
              {meal.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-orange-600 font-extrabold text-xl">
                ${meal.price}
              </span>
              {/* button — rounded-full থেকে rounded-lg, border 0.5px */}
              <button className="text-xs font-medium text-orange-500 border border-orange-400 px-3.5 py-1.5 rounded-lg group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-200">
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
