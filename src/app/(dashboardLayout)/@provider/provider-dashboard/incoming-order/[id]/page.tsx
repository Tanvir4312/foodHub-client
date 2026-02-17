import { getOwnOrderByIdAction } from "@/action/order.action";
import OrderStatusUpdate from "@/components/orderStatusUpdate/orderStatusUpdate";

import { OrderItemType } from "@/types/orderItems.type";
import { CreditCard, Info, MapPin, Package } from "lucide-react";
import React from "react";

const IncomingOrdersDetalis = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await getOwnOrderByIdAction(id);
  const incomingOrder = (await res?.data) || {};


  const { delivery_address, total_amount, status, orderItems, id : orderId } = incomingOrder || {};

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-[#E21B70] p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide">
            Order Details
          </h2>
          <p className="text-pink-100 text-sm mt-1">
            Order ID:{" "}
            <span className="font-mono">
              #{orderItems?.[0]?.order_id?.slice(-8)}
            </span>
          </p>
        </div>
        <div className="px-4 py-1 bg-white/20 rounded-full backdrop-blur-md border border-white/30 text-xs font-bold uppercase">
          <OrderStatusUpdate initialStatus={status} id={orderId}/>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Delivery Address Section */}
        <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <MapPin className="text-[#E21B70] w-6 h-6 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase">
              Delivery To
            </h3>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              {delivery_address || "Address details not available"}
            </p>
          </div>
        </div>

        {/* Order Items List */}
        <div>
          <div className="flex items-center gap-2 mb-4 px-1">
            <Package className="text-gray-400 w-5 h-5" />
            <h3 className="font-bold text-gray-700 text-sm uppercase">
              Items Ordered
            </h3>
          </div>

          <div className="space-y-3">
            {orderItems?.map((item: OrderItemType) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center font-bold text-[#E21B70]">
                    {item.quantity}x
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.meal?.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Unit Price: Tk {item.price}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">Tk {item.total_price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Note Section */}
        <div className="space-y-4">
          <div className="bg-gray-900 text-white p-6 rounded-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E21B70] opacity-10 rounded-full -mr-16 -mt-16"></div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold mb-1 tracking-widest">
                  Grand Total
                </p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 uppercase">
                  <CreditCard className="w-3 h-3" /> Cash on Delivery
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#E21B70]">
                  Tk {total_amount}
                </span>
              </div>
            </div>
          </div>

          {/* Simple Text Note as requested */}
          <div className="flex items-start gap-2 px-2 py-1">
            <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed italic">
              Note: This total amount is inclusive of a delivery fee (Tk 70) and
              a 10% service fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingOrdersDetalis;
