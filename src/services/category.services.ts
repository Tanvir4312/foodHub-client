/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { NewCategoryType } from "@/types/createCategory.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const categoryServices = {
  createCategoryService: async (newCtegoryData: NewCategoryType) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/admin/categories`);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCtegoryData),
      });

      const newCategory = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: newCategory.message || "Categories not found" },
        };
      }
      return { data: newCategory, error: null };
    } catch (e) {
      return { data: null, error: { message: "Categories not found" } };
    }
  },
  getCategoriesService: async () => {
    try {
      const url = new URL(`${API_URL}/categories`);

      const res = await fetch(url.toString(), {
        next: { tags: ["category-data"] },
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

  updateCategoryService: async (
    categoryUpdateData: NewCategoryType,
    id: string,
  ) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/admin/categories/${id}`);

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryUpdateData),
      });

      const updateCategory = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: updateCategory.message || "Category not found" },
        };
      }
      return { data: updateCategory, error: null };
    } catch (err) {
      return { data: null, error: { message: "Category not found" } };
    }
  },

  deleteCategoryService: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/admin/categories/${id}`);

      const res = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const deleteCategory = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: deleteCategory.message || "Category not found" },
        };
      }
      return { data: deleteCategory, error: null };
    } catch (err) {
      return { data: null, error: { message: "Category not found" } };
    }
  },
};
