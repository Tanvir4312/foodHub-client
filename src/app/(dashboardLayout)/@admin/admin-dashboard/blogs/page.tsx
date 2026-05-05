import { getAllFoodBlogAction } from "@/action/foodBlog.action";
import CreateBlogModal from "@/components/modules/adminDashboard/CreateBlogModal";
import FoodBlogs from "@/components/modules/homePage/FoodBlogs/FoodBlogs";
import { services } from "@/services/user.services";
import BlogFilters from "@/components/modules/adminDashboard/blogs/BlogFilters";
import BlogPagination from "@/components/modules/adminDashboard/blogs/BlogPagination";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";
import { BookOpen, Plus, Newspaper } from "lucide-react";

const BlogsPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | number | undefined>>;
}) => {
    const params = await searchParams;
    
    // Set defaults for pagination
    const queryParams = {
        ...params,
        page: params.page || 1,
        limit: params.limit || 6,
    };

    const blogResponse = await getAllFoodBlogAction(queryParams);
    const blogs = blogResponse?.data?.data?.data || [];
    const meta = blogResponse?.data?.data?.meta || { page: 1, limit: 6, total: 0, totalPage: 1 };

    const { data } = await services.getSessionService();
    const userRole = data?.user?.role;

    return (
        <UserManagementProvider>
            <div className="space-y-8 p-1 lg:p-4">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500 rounded-xl text-white">
                                <BookOpen size={24} />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                Blog <span className="text-orange-500">Journal</span>
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-100 font-medium">
                            Share culinary stories and food tips with your community.
                        </p>
                    </div>
                    
                    <CreateBlogModal />
                </div>

                {/* Blog Grid Section with Targeted Loader */}
                {blogs.length > 0 ? (
                    <>
                        <TableLoaderWrapper>
                            <div className="min-h-[400px]">
                                <FoodBlogs blogs={blogs} userRole={userRole} showAll={true} />
                            </div>
                        </TableLoaderWrapper>
                        
                        {/* Pagination Section */}
                        <BlogPagination meta={meta} />
                    </>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-[40px] p-20 text-center border border-dashed border-slate-200 dark:border-slate-800">
                        <div className="inline-flex p-6 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 mb-6">
                            <Newspaper size={64} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">No stories found</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
                            Try adjusting your search or create a new blog post to get started.
                        </p>
                    </div>
                )}
            </div>
        </UserManagementProvider>
    );
};

export default BlogsPage;