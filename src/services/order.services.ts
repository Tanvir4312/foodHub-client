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

      if (!order) {
        return { data: null, error: { message: "Something went wrong" } };
      }
      return { data: order, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
