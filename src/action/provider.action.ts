"use server"
import { providerServices } from "@/services/provider.services";

export const providerAction = async (id: string) => {
  return await providerServices.getProviderById(id);
};
