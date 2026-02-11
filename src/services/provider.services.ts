/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

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
  getProviderById: async (id : string) => {
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
};
