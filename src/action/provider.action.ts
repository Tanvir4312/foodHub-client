"use server"
import { providerServices } from "@/services/provider.services";

export const providerAction = async (id: string) => {
  return await providerServices.getProviderById(id);
};

export const providerStatsAction = async () => {
  return await providerServices.getProviderStats();
};
