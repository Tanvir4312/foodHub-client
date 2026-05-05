import { getCategoriesAction } from "@/action/categories.action";
import CategoryFilters from "@/components/modules/adminDashboard/categories/CategoryFilters";
import CategoryTable from "@/components/modules/adminDashboard/categories/CategoryTable";
import CategoryPagination from "@/components/modules/adminDashboard/categories/CategoryPagination";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";
import { Layers, Plus, PackageSearch } from "lucide-react";
import Link from "next/link";

const AllCategory = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | number | undefined>>;
}) => {
  const params = await searchParams;
  
  // Set defaults for pagination
  const queryParams = {
    ...params,
    page: params.page || 1,
    limit: params.limit || 5,
  };

  const res = await getCategoriesAction(queryParams);
  const categories = res?.data?.data || [];
  const meta = res?.data?.meta || { page: 1, limit: 5, total: 0, totalPage: 1 };

  return (
    <UserManagementProvider>
      <div className="space-y-8 p-1 lg:p-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-xl text-white">
                <Layers size={24} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Category <span className="text-orange-500">Hub</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Organize your menu by creating and managing food categories.
            </p>
          </div>
          <Link
            href="/admin-dashboard/categories/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <Plus size={20} />
            Add New Category
          </Link>
        </div>

        {/* Filters Section */}
        <CategoryFilters />

        {/* Table Section with Targeted Loader */}
        {categories.length > 0 ? (
          <>
            <TableLoaderWrapper>
              <CategoryTable categories={categories} page={Number(queryParams.page)} limit={Number(queryParams.limit)} />
            </TableLoaderWrapper>
            {/* Pagination Section */}
            <CategoryPagination meta={meta} />
          </>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[40px] p-20 text-center border border-dashed border-slate-200 dark:border-slate-800">
            <div className="inline-flex p-6 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 mb-6">
              <PackageSearch size={64} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">No categories found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
              Try adjusting your search or add a new category to get started.
            </p>
          </div>
        )}
      </div>
    </UserManagementProvider>
  );
};

export default AllCategory;
