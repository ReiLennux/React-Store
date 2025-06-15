export interface CouponsRequestDto {
    couponCode: string;
    discount: number;
    minAmount: number;
    AmountType: string;
    LimitUse: number;
    DateInit: Date;
    DateEnd: Date;
    Category: string;
    StateCoupon: boolean;
}


export interface CouponsResponseDto {
    id: number;
    couponCode: string;
    discount: number;
    minAmount: number;
    LastUpdated: Date;
    AmountType: string;
    LimitUse: number;
    DateInit: Date;
    DateEnd: Date;
    Category: string;
    StateCoupon: boolean;
}