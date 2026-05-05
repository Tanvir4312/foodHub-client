"use server";
import { categoryServices } from "@/services/category.services";
import { NewCategoryType } from "@/types/createCategory.type";
import { revalidateTag } from "next/cache";

export const createCategoryAction = async (newCtegoryData: NewCategoryType) => {
  const createCategory =
    await categoryServices.createCategoryService(newCtegoryData);
  revalidateTag("category-data", "max");
  return createCategory;
};

export const getCategoriesAction = async (queryParams?: Record<string, string | number | undefined>) => {
  return await categoryServices.getCategoriesService(queryParams);
};

export const getCategoryByIdAction = async (id: string) => {
  return await categoryServices.getCategoryServiceById(id);
};

export const updateCategoryAction = async (
  updateCtegoryData: NewCategoryType,
  id: string,
) => {
  const updateCategory = await categoryServices.updateCategoryService(
    updateCtegoryData,
    id,
  );
  revalidateTag("category-data", "max");
  return updateCategory;
};

export const deleteCategoryAction = async (id: string) => {
  const deleteCategory = await categoryServices.deleteCategoryService(id);
  revalidateTag("category-data", "max");
  return deleteCategory;
};
