/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { UpdateProfileData } from "@/types/customerUpdate.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const customerServices = {
  getCustomerProfileService: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/customer/customer-profile/${id}`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["update-profile"] },
      });
      const customerProfile = await res.json();

      if (!customerProfile) {
        return { data: null, error: { message: "Something went wrong!!" } };
      }
      return { data: customerProfile, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong!!" } };
    }
  },

  customerProfileUpdateService: async (updateData: UpdateProfileData) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/customer/customer-profile`);

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const customerProfileUpdate = await res.json();

      if (!customerProfileUpdate) {
        return { data: null, error: { message: "Something went wrong!!" } };
      }
      return { data: customerProfileUpdate, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong!!" } };
    }
  },
};
