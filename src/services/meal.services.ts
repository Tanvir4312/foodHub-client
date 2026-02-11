/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

interface GetBlogsParams {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  dietary?: string;
  page?: string
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

      if(params){
        Object.entries(params).forEach(([key, value]) =>{
          if(value !== undefined && value !== null && value !== ""){
            url.searchParams.append(key, value)
          }
        })
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
    getTopMealById: async (id: string) => {
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
};
