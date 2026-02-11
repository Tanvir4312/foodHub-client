/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const addToCartServices = {
  createCart: async (mealId: string, price: number, quantity: number) => {
    try {
      const url = new URL(`${API_URL}/addToCart`);
      const cookiStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: cookiStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mealId, price, quantity }),
        cache: "no-store",
      });

      const cart = await res.json();

      if (!cart) {
        return { data: null, error: { message: "Cart not create" } };
      }
      return { data: cart, error: null };
    } catch (err) {
      return { data: null, error: { message: "Cart not create" } };
    }
  },

  getCartCount: async () => {
    try {
      const cookiStore = await cookies();

      const url = new URL(`${API_URL}/cart/count`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookiStore.toString(),
        },
        // cache: "no-store",
        next: { tags: ["cart-post"] },
      });
      const cartCount = await res.json();
      if (!cartCount) {
        return { data: null, error: { message: "No Cart available" } };
      }
      return { data: cartCount, error: null };
    } catch (err) {
      return { data: null, error: { message: "No Cart available" } };
    }
  },

  getCartsService: async () => {
    try {
      const cookiStore = await cookies();

      const url = new URL(`${API_URL}/cart`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookiStore.toString(),
        },
        next: { tags: ["cart-post"] },
      });
      const allCart = await res.json();
      if (!allCart) {
        return { data: null, error: { message: "No Cart available" } };
      }
      return { data: allCart, error: null };
    } catch (err) {
      return { data: null, error: { message: "No Cart available" } };
    }
  },

  deleteCartsService: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/cart/${id}`);

      const res = await fetch(url.toString(), {
        method: "DELETE",
      });
      const deleteCart = await res.json();
      if (!deleteCart) {
        return { data: null, error: { message: "No Cart available" } };
      }
      return { data: deleteCart, error: null };
    } catch (err) {
      return { data: null, error: { message: "No Cart available" } };
    }
  },

  deleteCartItemsService: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/cartItem/${id}`);

      const res = await fetch(url.toString(), {
        method: "DELETE",
      });
      const deleteCartitem = await res.json();
      if (!deleteCartitem) {
        return { data: null, error: { message: "No Cart available" } };
      }
      return { data: deleteCartitem, error: null };
    } catch (err) {
      return { data: null, error: { message: "No Cart available" } };
    }
  },
};
