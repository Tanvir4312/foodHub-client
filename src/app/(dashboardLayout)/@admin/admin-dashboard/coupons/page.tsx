import { getAllCouponAction } from "@/action/coupon.action";
import SpecialOffers from "@/components/modules/homePage/SpecialOffers/SpecialOffers";
import CreateCouponModal from "@/components/modules/adminDashboard/CreateCouponModal";
import { CouponType } from "@/types/coupon.type";
import React from "react";
import { Ticket } from "lucide-react";

import { Roles } from "@/constrants/roles";
import { services } from "@/services/user.services";

const CouponsPage = async () => {
    const res = await getAllCouponAction();
    const coupons: CouponType[] = res?.data || [];

    const { data } = await services.getSessionService();
    const userRole = data?.user?.role;

    return (
        <div className="">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 px-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-orange-500 rounded-xl text-white shadow-lg shadow-orange-200">
                            <Ticket size={24} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                            Management <span className="text-orange-500">Coupons</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium ml-1">
                        Create and manage discount codes for your restaurant platform
                    </p>
                </div>

                <CreateCouponModal />
            </div>

            {/* Coupons Display */}
            <div className="bg-white dark:bg-slate-900/50 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

                <div className="relative z-10">
                    {coupons.length > 0 ? (
                        <SpecialOffers activeCoupons={coupons} userRole={userRole} />
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 mb-6 border border-dashed border-slate-200">
                                <Ticket size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No coupons active</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">
                                Start by creating your first coupon to attract more customers to the platform.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CouponsPage;