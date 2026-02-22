/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { OrderDataType } from "@/types/orderData.type";

import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const orderServices = {
  createOrderService: async (orderData: OrderDataType) => {
    try {
      const url = new URL(`${API_URL}/order/orders`);
      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const order = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: order.message || "Something went wrong!" },
        };
      }
      return { data: order, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getOwnOrderSevice: async () => {
    const cookieStore = await cookies();

    try {
      const url = new URL(`${API_URL}/order/orders`);
      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["order-data"] },
      });

      const ownOrder = await res.json();
      if (!ownOrder) {
        return { data: null, error: { message: "Something went wrong" } };
      }
      return { data: ownOrder, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getOrderByIdService: async (id: string) => {
    const cookiStore = await cookies();
    try {
      const url = new URL(`${API_URL}/order/orders/${id}`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookiStore.toString(),
        },
      });

      const myOrder = await res.json();

      if (!myOrder) {
        return { data: null, error: { message: "Something went wrong" } };
      }
      return { data: myOrder, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getIncomigOrderService: async () => {
    const cookiStore = await cookies();
    try {
      const url = new URL(`${API_URL}/order/incoming-orders/`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookiStore.toString(),
        },
        next: { tags: ["order-status"] },
      });

      const incomingOrders = await res.json();

      if (!incomingOrders) {
        return { data: null, error: { message: "Something went wrong" } };
      }
      return { data: incomingOrders, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateOrderStatusService: async (
    id: string,
    statusData: {
      status: string;
    },
  ) => {
    const cookiStore = await cookies();
    try {
      const url = new URL(`${API_URL}/order/orders/${id}`);

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Cookie: cookiStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      });

      const updateIncomingOrder = await res.json();

      if (!updateIncomingOrder) {
        return { data: null, error: { message: "Something went wrong" } };
      }
      return { data: updateIncomingOrder, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAllOrderService: async () => {
    const cookiStore = await cookies();
    try {
      const url = new URL(`${API_URL}/admin/orders`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookiStore.toString(),
        },
        next: { tags: ["order-data"] },
      });

      const allOrder = await res.json();

      if (!allOrder) {
        return { data: null, error: { message: "Something went wrong" } };
      }
      return { data: allOrder, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
