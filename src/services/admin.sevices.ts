/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const adminServices = {
  getAdminStats: async () => {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/admin/stats`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const adminStats = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: adminStats.message || "Something went wrong!" },
        };
      }
      return { data: adminStats, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getAllUserSevice: async () => {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/admin/users`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next : {tags : ["update-status"]}
      });

      const allUser = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: allUser.message || "Something went wrong!" },
        };
      }
      return { data: allUser, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  updateUserStatusSevice: async (id: string, statusData: string) => {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/admin/users/${id}`);

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      });

      const statusUpdate = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: statusUpdate.message || "Something went wrong!" },
        };
      }
      return { data: statusUpdate, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
