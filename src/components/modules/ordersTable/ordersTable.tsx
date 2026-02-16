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
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Delivery Address</TableHead>
            <TableHead className="font-bold">Total Amount</TableHead>
            <TableHead className="font-bold">Order Status</TableHead>
            <TableHead className="font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.delivery_address}</TableCell>
              <TableCell>{order.total_amount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="cursor-pointer hover:text-amber-600"><Link href={`/customer-dashboard/my-orders/${order.id}`} className="flex items-center gap-1">Details <FaArrowRightLong /></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
