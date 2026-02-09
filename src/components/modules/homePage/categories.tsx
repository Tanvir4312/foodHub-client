

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
    <div>
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          A World of Flavors on Your Plate
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Embark on a culinary journey across borders. From the spicy streets of
          Dhaka to the authentic pizzerias of Italy, we bring you the finest
          dishes from every corner of the globe.
        </p>
      </div>

      <div className="grid lg:grid-cols-6 grid-cols-2 gap-5">
        {categories?.map((category: CategoryType) => (
          
          <CategoryCard key={category.id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
