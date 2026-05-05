import { getIncomingOrderAction } from "@/action/order.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import OrderFilters from "@/components/modules/ordersTable/OrderFilters";
import PaginationControls from "@/components/ui/pagination-controll";
import { UserManagementProvider } from "@/components/modules/adminDashboard/users/UserManagementProvider";
import TableLoaderWrapper from "@/components/modules/adminDashboard/users/TableLoaderWrapper";

type Order = {
  id: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  orderItems: [];
  createdAt: string;
};

const IncomingOrder = async ({
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
  const res = await getIncomingOrderAction({
    ...query,
    limit: query.limit || "5",
  });

  const incomingOrder = res?.data?.data || [];
  const pagination = res?.data?.pagination || {
    limit: 5,
    total_meal: 0,
    current_Page: 1,
    totatl_page: 1,
  };

  return (
    <UserManagementProvider>
      <div className="py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Incoming Orders
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Manage and track your latest kitchen orders in real-time.
            </p>
          </div>
        </div>

        <OrderFilters />

        <TableLoaderWrapper>
          <div className="bg-white dark:bg-zinc-950 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden min-h-[400px]">
            {incomingOrder?.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-100 dark:border-white/5">
                      <TableHead className="w-16 font-black uppercase tracking-widest text-[10px] text-slate-400 py-6 pl-8">SR</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-6">Date & Time</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-6">Delivery Address</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-6 text-right">Total Amount</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-6 text-center">Status</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-6 text-right pr-8">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomingOrder?.map((order: Order, idx: number) => (
                      <TableRow
                        key={order.id}
                        className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors border-slate-50 dark:border-white/5"
                      >
                        <TableCell className="font-bold text-slate-400 text-sm py-5 pl-8">{idx + 1}</TableCell>
                        <TableCell className="py-5">
                          <div className="font-bold text-slate-700 dark:text-slate-200">
                            {new Date(order.createdAt).toLocaleString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                            {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="py-5 max-w-[200px]">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                            {order.delivery_address}
                          </p>
                        </TableCell>
                        <TableCell className="text-right py-5 font-black text-slate-900 dark:text-slate-100">
                          ৳{order.total_amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center py-5">
                          <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${order.status === "DELIVERED"
                              ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                              : order.status === "PENDING"
                                ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                                : order.status === "PREPARING"
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                  : order.status === "OUTFORDELIVERY"
                                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                                    : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400"}
                    `}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${order.status === "DELIVERED" ? "bg-green-500" : order.status === "PENDING" ? "bg-orange-500" : order.status === "PREPARING" ? "bg-blue-500" : order.status === "OUTFORDELIVERY" ? "bg-indigo-500" : "bg-slate-500"
                              }`} />
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-5 pr-8">
                          <Link
                            href={`/provider-dashboard/incoming-order/${order.id}`}
                            className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md shadow-orange-200 dark:shadow-none hover:scale-105 active:scale-95"
                          >
                            View Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  Quiet for now
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs font-medium leading-relaxed">
                  You don&apos;t have any incoming orders yet. Once a customer orders, they&apos;ll appear here.
                </p>
              </div>
            )}
          </div>
        </TableLoaderWrapper>

        {incomingOrder?.length > 0 && (
          <div className="mt-12">
            <PaginationControls meta={pagination} />
          </div>
        )}
      </div>
    </UserManagementProvider>
  );
};

export default IncomingOrder;
