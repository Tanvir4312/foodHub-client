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
    <div>
      {orders.length > 0 ? (
        <Table className="border">
          <TableHeader>
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
              <TableRow key={order.id}>
                <TableCell>{order.delivery_address}</TableCell>
                <TableCell>{order.total_amount}</TableCell>
                <TableCell
                  className={`${order.status === "DELIVERED" ? "text-green-600 font-bold" : ""}`}
                >
                  {order.status}
                </TableCell>
                {order.status === "DELIVERED" ? (
                  <TableCell className="hover:text-amber-600 cursor-pointer">
                    <Link href={`/customer-dashboard/reviews/${order.id}`}>
                      Write Reviews
                    </Link>
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
                <TableCell className="cursor-pointer hover:text-amber-600">
                  <Link
                    href={`/customer-dashboard/my-orders/${order.id}`}
                    className="flex items-center gap-1"
                  >
                    Details <FaArrowRightLong />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          {/* Visual Element */}
          <div className="text-8xl mb-6">📦</div>

          {/* Text Content */}
          <h2 className="text-2xl font-bold text-gray-800">No Orders Yet!</h2>
          <p className="text-gray-500 mt-2 max-w-sm">
            It looks like you haven’t placed any orders. Discover the best food
            from our top-rated restaurants and satisfy your cravings!
          </p>

          {/* Call to Action */}
          <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md">
            <Link href={`/meals`}> Order Now</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
