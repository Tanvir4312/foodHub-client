
import { Hero } from "@/components/modules/homePage/hero";
import Categories from "./categories/page";

// import { services } from "@/services/user.services";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto">
     <div className="my-10">
       <Hero />
       <Categories/>
     </div>
     
    </div>
  );
}
