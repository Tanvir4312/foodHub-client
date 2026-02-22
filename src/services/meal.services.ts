/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { MealType } from "@/types/meal.type";
import { NewMealType } from "@/types/newMeal.type";
import { cookies } from "next/headers";

interface GetBlogsParams {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  dietary?: string;
  page?: string;
}

const API_URL = env.API_URL;
export const mealServices = {
  getTopMealService: async () => {
    try {
      const url = new URL(`${API_URL}/top-meals`);

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const meals = await res.json();

      if (!meals) {
        return { data: null, error: { message: "Meals not found" } };
      }

      return { data: meals, error: null };
    } catch (e) {
      return { data: null, error: { message: "Meals not found" } };
    }
  },

  getMealService: async (params: GetBlogsParams) => {
    try {
      const url = new URL(`${API_URL}/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const meals = await res.json();

      if (!meals) {
        return { data: null, error: { message: "Meals not found" } };
      }
      return { data: meals, error: null };
    } catch (e) {
      return { data: null, error: { message: "Meals not found" } };
    }
  },
  getMealById: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/meals/${id}`);

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const meal = await res.json();

      if (!meal) {
        return { data: null, error: { message: "Meals not found" } };
      }

      return { data: meal, error: null };
    } catch (e) {
      return { data: null, error: { message: "Meals not found" } };
    }
  },

  createMealService: async (newMealData: NewMealType) => {
    const cookieStore = cookies();
    try {
      const url = new URL(`${API_URL}/provider/meals`);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: (await cookieStore).toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMealData),
      });
      const newMeal = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: newMeal.message || "Something went wrong!!" },
        };
      }
      return { data: newMeal, error: null };
    } catch (err) {
      return { data: null, error: { message: "Creation Failed!!!" } };
    }
  },

  getMyMealService: async () => {
    const cookieStore = cookies();
    try {
      const url = new URL(`${API_URL}/provider/meals/own-meals`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: (await cookieStore).toString(),
        },
        next: { tags: ["newMeal-create"] },
      });
      const newMeal = await res.json();

      if (!newMeal) {
        return { data: null, error: { message: "Failed!!!" } };
      }
      return { data: newMeal, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed!!!" } };
    }
  },

  getMyMealByIdService: async (id: string) => {
    const cookieStore = cookies();
    try {
      const url = new URL(`${API_URL}/meals/${id}`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: (await cookieStore).toString(),
        },
      });
      const meal = await res.json();

      if (!meal) {
        return { data: null, error: { message: "Failed!!!" } };
      }
      return { data: meal, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed!!!" } };
    }
  },

  updateMyMealService: async (id: string, mealData: MealType) => {
    const cookieStore = cookies();
    try {
      const url = new URL(`${API_URL}/provider/meals/${id}`);

      const res = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          Cookie: (await cookieStore).toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      });
      const updateMeal = await res.json();

      if (!updateMeal) {
        return { data: null, error: { message: "Failed!!!" } };
      }
      return { data: updateMeal, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed!!!" } };
    }
  },
};
