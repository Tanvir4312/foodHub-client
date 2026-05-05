"use server";
import { adminServices } from "@/services/admin.sevices";
import { revalidateTag } from "next/cache";

export const adminStatsAction = async () => {
  return await adminServices.getAdminStats();
};

export const getAllUserAction = async (queryParams: Record<string, string | number | undefined>) => {
  return await adminServices.getAllUserSevice(queryParams);
};

export const updateUserStatusAction = async (
  id: string,
  updateStatus: string,
) => {
  const result = await adminServices.updateUserStatusSevice(id, updateStatus);
  revalidateTag("update-status", "max");
  return result;
};
