"use server";

import { addToCartServices } from "@/services/addToCart.services";
import { revalidateTag } from "next/cache";

export const addToCartAction = async (
  mealId: string,
  price: number,
  quantity: number,
) => {
  const res = await addToCartServices.createCart(mealId, price, quantity);
  revalidateTag("cart-post", "max");
  return res;
};

export const getCartCountAction = async () => {
  return await addToCartServices.getCartCount();
};

export const getCartAction = async () => {
  return await addToCartServices.getCartsService();
};

export const deleteCartAction = async (id : string) => {
  return await addToCartServices.deleteCartsService(id);
};

export const deleteCartItemAction = async (id : string) => {
  return await addToCartServices.deleteCartItemsService(id);
};
