"use server";
import { mealServices } from "@/services/meal.services";
import { MealType } from "@/types/meal.type";
import { NewMealType } from "@/types/newMeal.type";
import { updateTag } from "next/cache";

export const getMealAction = async (id: string) => {
  return await mealServices.getMealById(id);
};

export const createMealAction = async (newMealData: NewMealType) => {
  const newMeal = await mealServices.createMealService(newMealData);
  updateTag("newMeal-create");
  return newMeal;
};

export const getMyMealAction = async () => {
  return await mealServices.getMyMealService();
};

export const getMyMealByIdAction = async (id: string) => {
  return await mealServices.getMyMealByIdService(id);
};

export const updateMyMealAction = async (id: string, mealData: MealType) => {
  const updateMeal = await mealServices.updateMyMealService(id, mealData);
  updateTag("newMeal-create");
  return updateMeal;
};
