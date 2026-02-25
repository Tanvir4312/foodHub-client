/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

import { ProviderProfileUpdateValue } from "@/types/providerProfileUpdate.type";

import { cookies } from "next/headers";


type ProviderProfile= {
    name: string;
    description: string;
    logo_url: string;
    location: string;
    phone_number: string;
}


const API_URL = env.API_URL;
export const providerServices = {
  getProviderService: async () => {
    try {
      const url = new URL(`${API_URL}/providers`);

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const providers = await res.json();

      if (!providers) {
        return { data: null, error: { message: "providers not found" } };
      }
      return { data: providers, error: null };
    } catch (e) {
      return { data: null, error: { message: "providers not found" } };
    }
  },
  getProviderById: async (id: string) => {
    try {
      const url = new URL(`${API_URL}/providers/${id}`);

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      const providers = await res.json();

      if (!providers) {
        return { data: null, error: { message: "providers not found" } };
      }
      return { data: providers, error: null };
    } catch (e) {
      return { data: null, error: { message: "providers not found" } };
    }
  },
  getProviderStats: async () => {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/provider/stats`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const providersStats = await res.json();

      if (!providersStats) {
        return { data: null, error: { message: "providers not found" } };
      }
      return { data: providersStats, error: null };
    } catch (e) {
      return { data: null, error: { message: "providers not found" } };
    }
  },
  createProviderProfile: async (providerProfileData: ProviderProfile) => {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/provider/provider-profile`);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providerProfileData),
      });

      const providerProfile = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: providerProfile.message || "providers not found" },
        };
      }
      return { data: providerProfile, error: null };
    } catch (e) {
      return { data: null, error: { message: "providers not found" } };
    }
  },
  updateProviderProfile: async (
    updateProviderProfileData: ProviderProfileUpdateValue,
    id: string,
  ) => {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/provider/provider-profile/${id}`);

      const res = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProviderProfileData),
      });

      const updateProviderProfile = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: updateProviderProfile.message || "providers not found",
          },
        };
      }
      return { data: updateProviderProfile, error: null };
    } catch (e) {
      return { data: null, error: { message: "providers not found" } };
    }
  },
};
