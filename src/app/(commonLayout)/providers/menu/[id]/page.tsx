import { providerServices } from "@/services/provider.services";
import { MealType } from "@/types/meal.type";
import { Info, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProviderDetailsWithMenu = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: providerData } = await providerServices.getProviderById(
    id as string,
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <section className="w-full lg:w-3/4 mx-auto mb-16 bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <Image
                src={providerData?.logo_url}
                alt={providerData?.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {providerData?.name}
              </h1>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600 gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>{providerData?.location}</span>
                </div>

                <div className="flex items-center text-gray-600 gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>{providerData?.phone_number}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <Info className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                    <p className="leading-relaxed">
                      {providerData?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="mb-16 border-gray-100" />

        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Our Menu
            </h2>
            <p className="text-gray-500 mt-2">
              Choose from our variety of fresh and healthy meals
            </p>
          </div>

          {/* Meal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {providerData?.meals?.map((meal: MealType) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden"
              >
                {/* Meal Image */}
                <div className="h-48 overflow-hidden">
                  <Image
                    src={meal.image_url}
                    alt={meal.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Meal Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">
                    {meal.name}
                  </h3>
                  <p className="text-orange-600 font-bold text-lg mt-1">
                    ${meal.price}
                  </p>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-2">
                    <button className="flex-1 px-3 py-2 text-sm font-semibold border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors">
                      Add to Cart
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-semibold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProviderDetailsWithMenu;
