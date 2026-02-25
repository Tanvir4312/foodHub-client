/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";

import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;
export const services = {
  getSessionService: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      if (session.data === "null") {
        return { data: null, error: { message: "Something went wrong!!" } };
      }
      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong!!" } };
    }
  },
  getOwnUserData: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/user`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const userData = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: userData?.message || "Something went wrong!!" },
        };
      }
      return { data: userData, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong!!" } };
    }
  },
};
