"use server";

import { orderServices } from "@/services/order.services";
import { OrderDataType } from "@/types/orderData.type";
import { updateTag } from "next/cache";

export const createOrderAction = async (orderData: OrderDataType) => {
  const result = await orderServices.createOrderService(orderData);
  updateTag("order-data");
  return result;
};

export const getOwnOrderAction = async () => {
  return await orderServices.getOwnOrderSevice();
};

export const getOrderByIdAction = async (id: string) => {
  return await orderServices.getOrderByIdService(id);
};

export const getIncomingOrderAction = async () => {
  return await orderServices.getIncomigOrderService();
};

export const updateOrderStatusAction = async (
  id: string,
  statusData: {
    status : string
  },
) => {
  const result = await orderServices.updateOrderStatusService(id, statusData);
  updateTag("order-status");
  return result;
};


export const getAllOrderAction = async () => {
  return await orderServices.getAllOrderService();
};
