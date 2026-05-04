

import { CategoryType } from "@/types/categories.type";
import { categoryServices } from "@/services/category.services";
import CategoryCard from "./homePageCards/category";


const CategoriesPage = async () => {
  const res = await categoryServices.getCategoriesService();

  const categories = res?.data?.data || [];

  if (categories?.length === 0) {
    return null;
  }

  return (
    <div className="md:px-4 bg-gradient-to-b from-gray-50 to-white py-4 rounded-xl">
      <div className="text-center space-y-5 mb-10 md:mb-14">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          A World of Flavors on Your Plate
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
          Embark on a culinary journey across borders. From the spicy streets of
          Dhaka to the authentic pizzerias of Italy, we bring you the finest
          dishes from every corner of the globe.
        </p>

        {/* optional subtle divider */}
        <div className="w-20 h-1 bg-[#f54a00] mx-auto rounded-full opacity-80"></div>
      </div>

      <div className="grid lg:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-4 md:gap-5">
        {categories?.map((category: CategoryType) => (
          <div key={category.id} className="transform transition duration-300 hover:scale-105 hover:-translate-y-1">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
