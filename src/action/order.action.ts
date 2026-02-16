"use server";

import { orderServices } from "@/services/order.services";
import { OrderDataType } from "@/types/orderData.type";
import { updateTag } from "next/cache";

export const createOrderAction = async (orderData: OrderDataType) => {
  const result = await orderServices.createOrderService(orderData);
  updateTag("create-order");
  return result;
};
