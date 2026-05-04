"use server";

import { addToCartServices } from "@/services/addToCart.services";
import { revalidatePath, revalidateTag } from "next/cache";

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

export const getCartByIdAction = async (id : string) => {
  return await addToCartServices.getCartsServiceById(id);
};

export const deleteCartAction = async (id: string) => {
  const res = await addToCartServices.deleteCartsService(id);
  revalidateTag("cart-post", "max");
  revalidatePath("/", "layout");
  return res;
};

export const deleteCartItemAction = async (id: string) => {
  const res = await addToCartServices.deleteCartItemsService(id);
  revalidateTag("cart-post", "max");
  revalidatePath("/", "layout");
  return res;
};
