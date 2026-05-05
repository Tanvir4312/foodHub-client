import { getOwnOrderAction } from "@/action/order.action";
import OrdersTable from "@/components/modules/ordersTable/ordersTable";
import React from "react";
import OrderFilters from "@/components/modules/ordersTable/OrderFilters";
import PaginationControls from "@/components/ui/pagination-controll";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";

const CustomerDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    sortOrder?: string;
  }>;
}) => {
  const query = await searchParams;
  const res = await getOwnOrderAction({
    ...query,
    limit: query.limit || "5",
  });

  const orders = res?.data?.data || [];
  const pagination = res?.data?.pagination || {
    limit: 5,
    total_meal: 0,
    current_Page: 1,
    totatl_page: 1,
  };

  return (
    <UserManagementProvider>
      <div className="px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              My Orders
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Track your deliveries and manage your recent orders.
            </p>
          </div>
        </div>

        <OrderFilters />

        <TableLoaderWrapper>
          <div className="min-h-[400px]">
            <OrdersTable orders={orders} />
          </div>
        </TableLoaderWrapper>

        {orders.length > 0 && (
          <div className="mt-12">
            <PaginationControls meta={pagination} />
          </div>
        )}
      </div>
    </UserManagementProvider>
  );
};

export default CustomerDashboard;
