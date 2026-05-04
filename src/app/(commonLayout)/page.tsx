import { Hero } from "@/components/modules/homePage/hero";

import CategoriesPage from "@/components/modules/homePage/categories";
import AllProvider from "@/components/modules/homePage/allProvider";
import TopRatngMeal from "@/components/modules/homePage/topRatngMeal";
import HowItWorks from "@/components/modules/homePage/How_It_Works/HowItWorks";
import SpecialOffers from "@/components/modules/homePage/SpecialOffers/SpecialOffers";
import { getAllCouponAction } from "@/action/coupon.action";
import { CouponType } from "@/types/coupon.type";

import ReviewsSection from "@/components/modules/homePage/ReviewShow/ReviewShow";
import { getReviewsForHomePageAction } from "@/action/review.action";

import FoodBlogs from "@/components/modules/homePage/FoodBlogs/FoodBlogs";
import { getAllFoodBlogAction } from "@/action/foodBlog.action";

export default async function Home() {

  const res = await getAllCouponAction();

  const coupons: CouponType[] = res?.data || [];

  const activeCoupons = coupons.filter((c) => c.isActive);


  const reviewsResponse = await getReviewsForHomePageAction();
  const reviewsRawData = reviewsResponse?.data;
  const reviews = reviewsRawData?.data || [];

  const blogResponse = await getAllFoodBlogAction();
  const blogs = blogResponse?.data?.data || [];




  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 mt-5">
        <Hero />
      </div>
      <div className="mb-16">
        <HowItWorks />
      </div>
      <div className="mb-16">
        <CategoriesPage />
      </div>
      <div className="mb-16 px-1">
        <SpecialOffers activeCoupons={activeCoupons} />
      </div>
      <div className="mb-16">
        <AllProvider />
      </div>
      <div className="mb-16">
        <TopRatngMeal />
      </div>
      <div className="mb-16 px-4">
        <ReviewsSection reviews={reviews} />
      </div>
      <div className="mb-16 mx-4 lg:mx-0">
        <FoodBlogs blogs={blogs} />
      </div>
    </div>
  );
}
