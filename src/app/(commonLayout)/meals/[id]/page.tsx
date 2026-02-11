import MealDetailsClient from "@/components/modules/meals/mealDetailsClient";
import { mealServices } from "@/services/meal.services";
import { Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

const MealDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { data: meal, error } = await mealServices.getTopMealById(id);


  if (error || !meal || meal.id !== id) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 h-80 md:h-auto relative">
          <Image
            src={meal.image_url}
            alt={meal.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600">
            {meal.dietary}
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-orange-500 uppercase tracking-wider">
                {meal.categories.name}
              </span>
              <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span className="font-bold text-orange-700">
                  {meal.averageRating}
                </span>
                <span className="text-gray-400 text-xs">
                  ({meal.totalReviews})
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              {meal.name}
            </h1>
            <p className="text-gray-500 leading-relaxed mb-6">
              {meal.description}
            </p>

            <div className="text-4xl font-black text-gray-900 mb-8">
              ${meal.price}
            </div>
          </div>
        </div>
      </div>

      {/* --- Review Section (Bottom) --- */}
      {meal.totalReviews > 0 && (
        <div className="border-t border-gray-100 p-8 bg-gray-50/50">
          <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
          
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(meal.averageRating) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic">
                The taste was amazing! Highly recommended.
              </p>
            </div>
          </div>
        </div>
      )}

     <div className="m-3">
         <MealDetailsClient meal={meal}></MealDetailsClient>
     </div>
    </div>
  );
};

export default MealDetails;
