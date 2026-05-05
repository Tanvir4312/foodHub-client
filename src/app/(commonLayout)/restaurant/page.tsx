import ProviderCard from "@/components/modules/homePage/homePageCards/provider";
import { providerServices } from "@/services/provider.services";
import { ProviderType } from "@/types/provider.type";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";
import PaginationControls from "@/components/ui/pagination-controll";
import RestaurantFilter from "@/components/modules/restaurant/RestaurantFilter";

const ProvidewrPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    searchTerm?: string;
    isAvailable?: string;
  }>;
}) => {
  const { page, limit, searchTerm, isAvailable } = await searchParams;

  const { data } = await providerServices.getProviderService({
    page,
    limit: limit || "9",
    searchTerm,
    isAvailable,
  });

  const providers = data?.data || [];
  console.log(providers)
  const pagination = data?.pagination || {
    current_Page: 1,
    limit: Number(limit) || 9,
    total_meal: 0,
    totatl_page: 1,
  };

  // Filter available providers
  const availableCount = providers?.filter(
    (p: ProviderType) => p.isAvailable === true
  ).length;

  return (
    <UserManagementProvider>
      <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-sm font-black text-green-600 dark:text-green-500 uppercase tracking-[0.2em]">
                {availableCount} Kitchens Live
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight">
              THE BEST KITCHENS <br className="hidden md:block" /> IN YOUR CITY
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-6 max-w-xl text-lg font-medium leading-relaxed">
              Experience authentic flavors delivered straight to your door from our
              handpicked partner restaurants.
            </p>
          </div>
        </div>

        <RestaurantFilter />

        {/* Content Wrapper with Loader */}
        <TableLoaderWrapper>
          <div className="min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {providers?.map((provider: ProviderType) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>

            {/* Empty State */}
            {providers?.length === 0 && (
              <div className="text-center py-32 bg-slate-50 dark:bg-zinc-900/50 rounded-[48px] border border-dashed border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-black text-slate-400 dark:text-slate-500">
                  No kitchens found.
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  We couldn't find any restaurants at the moment.
                </p>
              </div>
            )}
          </div>
        </TableLoaderWrapper>

        {/* Pagination */}
        <div className="mt-20">
          <PaginationControls meta={pagination} />
        </div>
      </div>
    </UserManagementProvider>
  );
};

export default ProvidewrPage;
