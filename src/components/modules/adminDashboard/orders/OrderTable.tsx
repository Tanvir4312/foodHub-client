"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/types/order.type";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, BadgeDollarSign, Store, Tag } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "PENDING": return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "CANCELLED": return "bg-rose-500/10 text-rose-600 border-rose-200";
      case "SHIPPED": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "CONFIRMED": return "bg-indigo-500/10 text-indigo-600 border-indigo-200";
      default: return "bg-slate-500/10 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50 h-16">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="pl-8 text-slate-900 dark:text-slate-100 font-bold">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                Delivery Address
              </div>
            </TableHead>
            <TableHead className="text-slate-900 dark:text-slate-100 font-bold">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-orange-500" />
                Order Date
              </div>
            </TableHead>
            <TableHead className="text-slate-900 dark:text-slate-100 font-bold text-center">
              <div className="flex items-center justify-center gap-2">
                <BadgeDollarSign size={16} className="text-orange-500" />
                Amount
              </div>
            </TableHead>
            <TableHead className="text-slate-900 dark:text-slate-100 font-bold">
              <div className="flex items-center gap-2">
                <Store size={16} className="text-orange-500" />
                Provider
              </div>
            </TableHead>
            <TableHead className="text-slate-900 dark:text-slate-100 font-bold">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-orange-500" />
                Status
              </div>
            </TableHead>
            <TableHead className="pr-8 text-right font-bold text-slate-900 dark:text-slate-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="group border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors h-20">
              <TableCell className="pl-8 font-medium text-slate-600 dark:text-slate-400">
                <p className="max-w-[200px] truncate">{order.delivery_address}</p>
              </TableCell>
              <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                <p className="text-sm">
                  {new Date(order.createdAt).getMonth() + 1}/{new Date(order.createdAt).getDate()}/{new Date(order.createdAt).getFullYear()}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {new Date(order.createdAt).getHours() % 12 || 12}:
                  {new Date(order.createdAt).getMinutes().toString().padStart(2, "0")} 
                  {new Date(order.createdAt).getHours() >= 12 ? " PM" : " AM"}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-black text-sm">
                  ${order.total_amount}
                </span>
              </TableCell>
              <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                {order.provider?.name || "N/A"}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full border text-[11px] font-black tracking-widest uppercase ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="pr-8 text-right">
                <Link
                  href={`/admin-dashboard/all-order/details/${order.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-95"
                >
                  View Details
                  <ArrowRight size={14} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
