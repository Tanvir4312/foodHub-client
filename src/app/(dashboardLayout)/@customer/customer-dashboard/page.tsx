import { getOwnOrderAction } from "@/action/order.action";
import OrdersTable from "@/components/modules/ordersTable/ordersTable";

import React from "react";

const CustomerDashboard = async () => {
  const res = await getOwnOrderAction();
  const orders = res?.data || [];
  return (
    <div>
        <div>
            <h1 className="text-2xl mb-5">My Orders</h1>
        </div>
      <OrdersTable orders={orders} />
    </div>
  );
};

export default CustomerDashboard;
