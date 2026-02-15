"use server"
import { mealServices } from "@/services/meal.services";

export const getMealAction = async (id: string) => {
  return await mealServices.getMealById(id);
};
