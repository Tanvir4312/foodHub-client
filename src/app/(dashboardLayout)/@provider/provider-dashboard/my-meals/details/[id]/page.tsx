import { getMyMealByIdAction } from "@/action/meals.action";
import { Review } from "@/types/review.type";
import Image from "next/image";
import React from "react";

const MyMealsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await getMyMealByIdAction(id);
  const meal = res?.data || {};

  const {
    averageRating,
    description,
    dietary,
    image_url,
    isAvailable,
    name,
    price,
    totalReviews,
    reviews,
  } = meal || {};
  return (
    <div className="md:w-5xl mx-auto space-y-8 p-3">
      {/* Main Meal Card */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
        {/* Left: Image Section */}
        <div className="lg:w-1/2 relative h-112.5 lg:h-auto overflow-hidden">
          <Image
            src={image_url || null}
            alt={name}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-700"
            priority
            unoptimized
          />
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest text-orange-600 shadow-sm">
              {dietary}
            </span>
            <span
              className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm ${isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
            >
              {isAvailable ? "Available" : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
                <span className="text-orange-500 text-lg">★</span>
                <span className="font-bold text-orange-700">
                  {averageRating}
                </span>
                <span className="text-orange-300 text-sm font-medium">
                  ({totalReviews} Reviews)
                </span>
              </div>
              <p className="text-4xl font-black text-gray-900">৳{price}</p>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {name}
            </h1>

            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
                Description
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed italic">
                {description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 py-6 border-t border-gray-100">
              <div className="flex -space-x-4">
                {reviews?.slice(0, 4).map((review: Review, i: number) => (
                  <div
                    key={i}
                    className="relative w-12 h-12 rounded-full border-4 border-white shadow-sm overflow-hidden bg-gray-100"
                  ></div>
                ))}
                {reviews?.length > 4 && (
                  <div className="w-12 h-12 relative rounded-full border-4 border-white bg-gray-900 text-white flex items-center justify-center text-xs font-bold z-10">
                    +{reviews.length - 4}
                  </div>
                )}
              </div>
              <p className="text-sm font-bold text-gray-500">
                Loved by local foodies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="pt-10">
        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
          Customer Feedback
          <span className="h-1 w-20 bg-orange-600 rounded-full"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews?.map((rev: Review, idx: number) => (
            <div
              key={idx}
              className="bg-gray-50/50 p-8 rounded-4xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
               
                <div>
                  <h4 className="font-bold text-gray-900">
                    {rev?.name || "Happy Customer"}
                  </h4>
                  {/*--------------- User er name nibo ----------------------------*/}
                  <div className="flex text-orange-400 text-xs">
                    {"★".repeat(rev.rating || 5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic group-hover:text-gray-900 transition-colors">
                {rev.comment ||
                  "The taste was absolutely amazing! Highly recommended."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyMealsDetails;
