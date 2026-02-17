/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

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
};
