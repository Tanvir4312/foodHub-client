"use server";

import { customerServices } from "@/services/customer.services";
import { UpdateProfileData } from "@/types/customerUpdate.type";
import { revalidateTag, updateTag } from "next/cache";

export const getCustomerProfileAction = async (id: string) => {
  return await customerServices.getCustomerProfileService(id);
};

export const customerProfileUpdateAction = async (
  updateData: UpdateProfileData,
) => {
  const result =
    await customerServices.customerProfileUpdateService(updateData);
  updateTag("update-profile");
  return result;
};
