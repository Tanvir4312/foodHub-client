export type OrderDataType = {
    delivery_address: string;
    phone_number: string;      // ← এটা missing ছিল
    couponCode?: string;       // ← coupon_code থেকে couponCode করুন
    items: {
        mealId: string;
        quantity: number;
    }[];
}