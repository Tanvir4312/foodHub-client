
import { Hero } from "@/components/modules/homePage/hero";

import CategoriesPage from "@/components/modules/homePage/categories";
import AllProvider from "@/components/modules/homePage/allProvider";
import TopRatngMeal from "@/components/modules/homePage/topRatngMeal";

// import { services } from "@/services/user.services";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto">
     <div className="my-10">
       <Hero />
     </div>
      <div className="my-20">
         <CategoriesPage/>
      </div>
      <div className="my-20">
         <AllProvider/>
      </div>
      <div className="my-20">
         <TopRatngMeal/>
      </div>
     
    </div>
  );
}
