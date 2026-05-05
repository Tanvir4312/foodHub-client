import { getAllOrderAction } from "@/action/order.action";
import OrderFilters from "@/components/modules/adminDashboard/orders/OrderFilters";
import OrderTable from "@/components/modules/adminDashboard/orders/OrderTable";
import OrderPagination from "@/components/modules/adminDashboard/orders/OrderPagination";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";
import { ShoppingBag, Package } from "lucide-react";

const AllOrder = async ({
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

  const res = await getAllOrderAction(queryParams);
  const allOrder = res?.data?.data || [];
  const meta = res?.data?.meta || { page: 1, limit: 5, total: 0, totalPage: 1 };

  return (
    <UserManagementProvider>
      <div className="space-y-8 p-1 lg:p-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-xl text-white">
                <ShoppingBag size={24} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Order <span className="text-orange-500">Management</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Monitor customer orders, track fulfillment status, and manage deliveries.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <OrderFilters />

        {/* Table Section with Targeted Loader */}
        {allOrder.length > 0 ? (
          <>
            <TableLoaderWrapper>
              <OrderTable orders={allOrder} />
            </TableLoaderWrapper>
            {/* Pagination Section */}
            <OrderPagination meta={meta} />
          </>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[40px] p-20 text-center border border-dashed border-slate-200 dark:border-slate-800">
            <div className="inline-flex p-6 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-300 mb-6">
              <Package size={64} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">No orders found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
              We couldn't find any orders matching your current search or filters.
            </p>
          </div>
        )}
      </div>
    </UserManagementProvider>
  );
};

export default AllOrder;
