

export interface CouponType {
    id: string;
    code: string;
    discount: number;
    expiresAt: string;
    isActive: boolean;
    usageLimit?: number;
    usedCount?: number;
    createdAt: string;
}