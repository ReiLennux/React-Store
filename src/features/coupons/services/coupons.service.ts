import { CouponsRequestDto, CouponsResponseDto } from "../types/coupons.types";
import { deleteCoupon, getAllCoupons, getCouponById, postCoupon } from "../api/coupons.api";
import { Response } from "@/types/api";


export async function post(request: CouponsRequestDto): Promise<Response<CouponsResponseDto>> {
    const response = await postCoupon(request);

    if (!response?.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response;
}

export async function get(): Promise<Response<CouponsResponseDto[]>> {
    const response = await getAllCoupons();

    if (!response.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response
}

export async function getById(id: number): Promise<Response<CouponsResponseDto>> {
    const response = await getCouponById(id);

    if (!response.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response
}

export async function getByCode(code: string): Promise<Response<CouponsResponseDto>> {
    const response = await getByCode(code);

    if (!response.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response
}

export async function patch(request: CouponsRequestDto): Promise<Response<CouponsResponseDto>> {
    const response = await patch(request);

    if (!response?.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response;
}

export async function remove(id: number): Promise<Response<null>> {
    const response = await deleteCoupon(id);

    if (!response.isSuccess) throw new Error(response?.message || 'Post Product Error');

    return response
}

