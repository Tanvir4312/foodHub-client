/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

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
        return { data: null, error: { message: "providers not found" } };
      }
      return { data: meals, error: null };
    } catch (e) {
      return { data: null, error: { message: "providers not found" } };
    }
  },
};