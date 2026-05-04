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

const OrdersTable = ({ orders }: { orders: Order }) => {
  return (
    <div className="w-full">
      {orders.length > 0 ? (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-bold">Delivery Address</TableHead>
                <TableHead className="font-bold">Total Amount</TableHead>
                <TableHead className="font-bold">Order Status</TableHead>
                <TableHead className="font-bold">Action</TableHead>
                <TableHead className="font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="max-w-[220px] truncate">
                    {order.delivery_address}
                  </TableCell>

                  <TableCell className="font-medium">
                    {order.total_amount}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${order.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : order.status === "PENDING"
                          ? "bg-red-100 text-red-700"
                          : order.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "ON_THE_WAY"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "CANCELLED"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </TableCell>

                  {order.status === "DELIVERED" ? (
                    <TableCell>
                      <Link
                        href={`/customer-dashboard/reviews/${order.id}`}
                        className="text-amber-600 hover:underline font-medium"
                      >
                        Write Reviews
                      </Link>
                    </TableCell>
                  ) : (
                    <TableCell className="text-gray-400 text-sm">
                      —
                    </TableCell>
                  )}

                  <TableCell>
                    <Link
                      href={`/customer-dashboard/my-orders/${order.id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Details <FaArrowRightLong size={14} />
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