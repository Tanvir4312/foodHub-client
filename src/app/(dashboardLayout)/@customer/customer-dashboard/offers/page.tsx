import { getAllCouponAction } from "@/action/coupon.action";
import SpecialOffers from "@/components/modules/homePage/SpecialOffers/SpecialOffers";
import { CouponType } from "@/types/coupon.type";

const OffersPage = async () => {
    const res = await getAllCouponAction();

    const coupons: CouponType[] = res?.data || [];

    const activeCoupons = coupons.filter((c) => c.isActive);
    return (
        <div>
            <SpecialOffers activeCoupons={activeCoupons} />
        </div>
    );
};

export default OffersPage;