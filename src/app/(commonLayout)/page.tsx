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
import Link from "next/link";

export default async function Home() {

  const res = await getAllCouponAction();

  const coupons: CouponType[] = res?.data || [];

  const activeCoupons = coupons.filter((c) => c.isActive);


  const reviewsResponse = await getReviewsForHomePageAction();
  const reviewsRawData = reviewsResponse?.data;
  const reviews = reviewsRawData?.data || [];

  const blogResponse = await getAllFoodBlogAction();
  const blogs = blogResponse?.data?.data?.data || [];




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

      {/* Header Section */}
      <div className="lg:flex flex-col md:flex-row justify-between items-end mb-12 gap-4 px-5">
        <div className="max-w-2xl text-left mb-5 lg:mb-0">
          <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">
            Our Journal
          </h4>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
            Latest <span className="text-orange-500">Food</span> Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Discover tasty stories, food tips, and culinary inspiration from around the world.
          </p>
        </div>

        <Link href="/blogs" className="px-6 py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer md:w-[180px] text-center md:mt-5 lg:mt-0">
          View All Posts
        </Link>
      </div>
      <div className="mb-16 mx-4 lg:mx-0">
        <FoodBlogs blogs={blogs} />
      </div>
    </div>
  );
}
