/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

const API_URL = env.API_URL;
export const categoryServices = {
  getCategoriesService: async () => {
    try {
      const url = new URL(`${API_URL}/categories`);

      const res = await fetch(url.toString(), {
        next: { revalidate: 60 },
      });

      const categories = await res.json();

      if (!categories) {
        return { data: null, error: { message: "Categories not found" } };
      }
      return { data: categories, error: null };
    } catch (e) {
      return { data: null, error: { message: "Categories not found" } };
    }
  },

  getCategoryServiceById: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/categories/${id}`);

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const category = await res.json();

      if (!category) {
        return { data: null, error: { message: "Category not found" } };
      }
      return { data: category, error: null };
    } catch (err) {
      return { data: null, error: { message: "Category not found" } };
    }
  },
};
