import { getAllFoodBlogAction } from "@/action/foodBlog.action";
import FoodBlogs from "@/components/modules/homePage/FoodBlogs/FoodBlogs";
import BlogFilters from "@/components/modules/adminDashboard/blogs/BlogFilters";
import BlogPagination from "@/components/modules/adminDashboard/blogs/BlogPagination";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";
import { BookOpen, Newspaper } from "lucide-react";

const BlogPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | number | undefined>>;
}) => {
    const params = await searchParams;

    // Set defaults for pagination
    const queryParams = {
        ...params,
        page: params.page || 1,
        limit: params.limit || 12, // Show more on public page
    };

    const res = await getAllFoodBlogAction(queryParams);
    const blogs = res?.data?.data?.data || [];
    const meta = res?.data?.data?.meta || { page: 1, limit: 12, total: 0, totalPage: 1 };

    return (
        <UserManagementProvider>
            <div className="max-w-7xl mx-auto px-5 my-12 space-y-12">
                {/* Page Header */}
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-500 rounded-xl text-white">
                            <BookOpen size={24} />
                        </div>
                        <h4 className="text-orange-500 font-black uppercase tracking-[0.2em] text-xs">
                            Our Culinary Journal
                        </h4>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                        Latest <span className="text-orange-500">Food</span> Stories
                    </h1>
                    <p className="text-slate-500 dark:text-slate-100 mt-6 text-lg font-medium leading-relaxed">
                        Explore our curated collection of tasty stories, culinary tips, and food inspiration from around the world.
                    </p>
                </div>

                {/* Blog Grid Section with Targeted Loader */}
                {blogs.length > 0 ? (
                    <>
                        <TableLoaderWrapper>
                            <div className="min-h-[400px]">
                                <FoodBlogs blogs={blogs} showAll={true} />
                            </div>
                        </TableLoaderWrapper>

                        {/* Pagination Section */}
                        <div className="pt-8">
                            <BlogPagination meta={meta} />
                        </div>
                    </>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-[40px] p-20 text-center border border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="inline-flex p-8 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 mb-6">
                            <Newspaper size={64} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-3">No stories discovered</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto text-lg">
                            We couldn't find any stories matching your search. Try broadening your keywords.
                        </p>
                    </div>
                )}
            </div>
        </UserManagementProvider>
    );
};

export default BlogPage;