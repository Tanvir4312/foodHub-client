"use server";
import { adminServices } from "@/services/admin.sevices";
import { couponServices } from "@/services/coupon.service";
import { revalidateTag } from "next/cache";

// export const adminStatsAction = async () => {
//   return await adminServices.getAdminStats();
// };

export const getAllCouponAction = async () => {
    return await couponServices.getAllCouponService();
};

// export const updateUserStatusAction = async (
//   id: string,
//   updateStatus: string,
// ) => {
//   const result = await adminServices.updateUserStatusSevice(id, updateStatus);
//   revalidateTag("update-status", "max");
//   return result;
// };
