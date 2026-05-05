import { getMyMealAction } from "@/action/meals.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MealType } from "@/types/meal.type";
import { Plus, UtensilsCrossed, ExternalLink, Edit3 } from "lucide-react";
import Link from "next/link";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";
import MyMealFilters from "@/components/modules/providerDashboard/MyMealFilters";
import PaginationControls from "@/components/ui/pagination-controll";

const MyMeals = async ({
  searchParams,
}: {
  searchParams: Promise<{
    searchTerm?: string;
    isAvailable?: string;
    page?: string;
    limit?: string;
  }>;
}) => {
  const params = await searchParams;
  const res = await getMyMealAction(params);

  if (res?.error) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h3 className="text-xl font-bold text-rose-600">Error Loading Meals</h3>
        <p className="text-slate-500 mt-2">{res.error.message}</p>
      </div>
    );
  }

  const meals = res?.data?.data || [];
  const pagination = res?.data?.pagination || {
    current_Page: 1,
    limit: Number(params.limit) || 10,
    total_meal: 0,
    totatl_page: 1,
  };

  return (
    <UserManagementProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              My <span className="text-indigo-600">Culinary Catalog</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Manage your dishes, availability, and pricing.
            </p>
          </div>
          <Link
            href="/provider-dashboard/add-meal"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} />
            Add New Meal
          </Link>
        </div>

        {/* Filters */}
        <MyMealFilters />

        {/* Table Section with Loader */}
        <TableLoaderWrapper>
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            {meals.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                    <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                      <TableHead className="w-20 font-black uppercase tracking-wider text-[10px] text-slate-400 py-6 pl-8">SR</TableHead>
                      <TableHead className="font-black uppercase tracking-wider text-[10px] text-slate-400 py-6">Meal Details</TableHead>
                      <TableHead className="font-black uppercase tracking-wider text-[10px] text-slate-400 py-6">Price</TableHead>
                      <TableHead className="font-black uppercase tracking-wider text-[10px] text-slate-400 py-6">Status</TableHead>
                      <TableHead className="font-black uppercase tracking-wider text-[10px] text-slate-400 py-6 text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meals?.map((meal: MealType, idx: number) => (
                      <TableRow key={meal.id} className="group border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell className="py-6 pl-8 font-bold text-slate-400">
                          {(pagination.current_Page - 1) * pagination.limit + idx + 1}
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                              {meal?.name}
                            </span>
                            <span className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[200px]">
                              {meal?.description || "No description provided"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-black text-sm">
                            ${meal?.price}
                          </span>
                        </TableCell>
                        <TableCell className="py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs ${
                            meal?.isAvailable 
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" 
                              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${meal?.isAvailable ? "bg-indigo-600" : "bg-rose-600"}`} />
                            {meal?.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </TableCell>
                        <TableCell className="py-6 text-right pr-8">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/provider-dashboard/my-meals/update/${meal?.id}`}
                              className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md"
                              title="Update Meal"
                            >
                              <Edit3 size={18} />
                            </Link>
                            <Link
                              href={`/provider-dashboard/my-meals/details/${meal?.id}`}
                              className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md"
                              title="View Details"
                            >
                              <ExternalLink size={18} />
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-20 text-center">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6">
                  <UtensilsCrossed size={48} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No dishes found</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  {params.searchTerm || params.isAvailable 
                    ? "We couldn't find any meals matching your current filters. Try resetting them."
                    : "Your culinary catalog is currently empty. Start by adding your first masterpiece!"}
                </p>
                {(params.searchTerm || params.isAvailable) && (
                  <Link
                    href="/provider-dashboard/my-meals"
                    className="mt-6 font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Clear all filters
                  </Link>
                )}
              </div>
            )}
          </div>
        </TableLoaderWrapper>

        {/* Pagination */}
        <div className="pt-4">
          <PaginationControls meta={pagination} />
        </div>
      </div>
    </UserManagementProvider>
  );
};

export default MyMeals;
