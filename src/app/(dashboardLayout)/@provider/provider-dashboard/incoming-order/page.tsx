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
type Order = {
  id: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  orderItems: [];
  createdAt: string;
};

const IncomingOrder = async () => {
  const res = await getIncomingOrderAction();
  const incomingOrder = res?.data;
  return (
    <div>
      {incomingOrder?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl">SR</TableHead>
              <TableHead className="text-xl">Date</TableHead>
              <TableHead className="text-xl">Total Amount</TableHead>
              <TableHead className="text-xl">Status</TableHead>

              <TableHead className="text-xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomingOrder?.map((order: Order, idx: number) => (
              <TableRow key={order.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{order.total_amount}</TableCell>
                <TableCell className={`${order.status === "DELIVERED" && "text-green-600 font-bold"}
                ${order.status === "PENDING" && "text-red-600"}
                `}>{order.status}</TableCell>

                <TableCell className="font-bold hover:text-amber-600 cursor-pointer">
                  <Link href={`/provider-dashboard/incoming-order/${order.id}`}>
                    DETAILS
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-red-500 text-2xl">
          You do not have any incoming orders right now
        </p>
      )}
    </div>
  );
};

export default IncomingOrder;
