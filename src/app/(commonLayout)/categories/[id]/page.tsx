import { categoryServices } from "@/services/category.services";
import Image from "next/image";

import Link from "next/link";
import mealPic from "../../../../../public/images/hero-4.jpg"

const CategoryById = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: category } = await categoryServices.getCategoryServiceById(id);
  const { name, description, image_url, meals } = category || {};
 
  return (
    <div className="w-full max-w-7xl mx-auto mb-20 px-4">
      <div className="relative h-100 w-full rounded-[40px] overflow-hidden shadow-2xl group">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-16 text-white">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">
            {name}
          </h2>
          <p className="max-w-xl text-lg text-gray-200 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-12">
        {meals?.length === 0 && (
          <p className="text-red-500 text-2xl font-bold">
            No meals available now
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals?.map(
            (meal: {
              description: string;
              dietary: string;
              id: string;
              image_url: string;
              name: string;
              price: number;
            }) => (
              <div
                key={meal.id}
                className="group/card bg-white rounded-4xl shadow-sm hover:shadow-2xl border border-gray-100 p-3 transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/meals/${meal.id}`}
                  className="relative h-52 w-full block overflow-hidden rounded-3xl"
                >
                  <Image
                    src={meal.image_url ?? mealPic}
                    alt={meal.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-2xl text-orange-600 font-black shadow-sm">
                    ${meal.price}
                  </div>
                </Link>

                <div className="p-4 flex flex-col grow">
                  <Link href={`/meals/${meal.id}`}>
                    <h4 className="text-xl font-bold text-gray-900 group-hover/card:text-orange-600 transition-colors">
                      {meal.name}
                    </h4>
                  </Link>

                  <div className="flex items-center gap-1 mt-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
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
                      (4.5)
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 grow">
                    {meal.description}
                  </p>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/meals/${meal.id}`}
                      className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.644m17.623 0a1.012 1.012 0 010 .644M12 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z"
                        />
                      </svg>
                    </Link>

                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-orange-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryById;
