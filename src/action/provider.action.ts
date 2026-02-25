"use server";
import { providerServices } from "@/services/provider.services";
import { ProviderProfile } from "@/types/providerProfile.type";
import { ProviderProfileUpdateValue } from "@/types/providerProfileUpdate.type";

export const providerAction = async (id: string) => {
  return await providerServices.getProviderById(id);
};

export const providerStatsAction = async () => {
  return await providerServices.getProviderStats();
};

export const providerProfileAction = async (
  providerProfileData: ProviderProfile,
) => {
  return await providerServices.createProviderProfile(providerProfileData);
};

export const updateProviderProfileAction = async (
  updateProviderProfileData: ProviderProfileUpdateValue,
  id: string,
) => {
  return await providerServices.updateProviderProfile(
    updateProviderProfileData,
    id,
  );
};
