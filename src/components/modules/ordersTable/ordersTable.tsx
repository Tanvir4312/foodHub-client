import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/order.type";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const OrdersTable = ({ orders }: { orders: any }) => {
  console.log(orders)
  return (
    <div className="w-full">
      {orders.length > 0 ? (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-zinc-900/50">
              <TableRow className="border-slate-100 dark:border-white/5">
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-5 pl-6">Delivery Address</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-5">Total Amount</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-5">Order Date & Time</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-5 text-center">Order Status</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-5 text-center">Reviews</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px] text-slate-400 py-5 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders?.map((order: any) => (
                <TableRow
                  key={order.id}
                  className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors border-slate-50 dark:border-white/5"
                >
                  <TableCell className="max-w-[220px] truncate py-5 pl-6 font-medium text-slate-600 dark:text-slate-400">
                    {order.delivery_address}
                  </TableCell>

                  <TableCell className="font-black text-slate-900 dark:text-slate-100 py-5">
                    ৳{order.total_amount.toLocaleString()}
                  </TableCell>

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

                  <TableCell className="text-center py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === "DELIVERED"
                        ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                        : order.status === "PENDING"
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                          : order.status === "PREPARING"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                            : order.status === "OUTFORDELIVERY"
                              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                              : order.status === "CANCELLED"
                                ? "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        order.status === "DELIVERED" ? "bg-green-500" : 
                        order.status === "PENDING" ? "bg-orange-500" : 
                        order.status === "PREPARING" ? "bg-blue-500" :
                        order.status === "OUTFORDELIVERY" ? "bg-indigo-500" : "bg-slate-500"
                      }`} />
                      {order.status.replace("_", " ")}
                    </span>
                  </TableCell>

                  <TableCell className="text-center py-5">
                    {order.status === "DELIVERED" ? (
                      <Link
                        href={`/customer-dashboard/reviews/${order.id}`}
                        className="text-orange-500 hover:text-orange-600 font-bold text-xs uppercase tracking-tight hover:underline transition-colors"
                      >
                        Write Review
                      </Link>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-700 text-xs font-bold uppercase tracking-widest">
                        Locked
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-right py-5 pr-6">
                    <Link
                      href={`/customer-dashboard/my-orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-slate-400 group-hover:text-orange-500 font-bold text-xs uppercase tracking-widest transition-all"
                    >
                      Details <FaArrowRightLong size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="text-7xl mb-4">📦</div>

          <h2 className="text-2xl font-bold text-gray-800">
            No Orders Yet!
          </h2>

          <p className="text-gray-500 mt-2 max-w-sm">
            It looks like you haven’t placed any orders. Discover delicious food
            and start your first order today.
          </p>

          <Link
            href="/meals"
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition"
          >
            Order Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;