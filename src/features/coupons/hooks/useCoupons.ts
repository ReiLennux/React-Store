import { useState } from "react";
import { CouponsRequestDto, CouponsResponseDto } from "../types/coupons.types";
import type { Response } from "../../../types/api";
import { patchCoupon, postCoupon, getAllCoupons, getCouponById, getCouponByCode, deleteCoupon } from "../api/coupons.api";


export function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (request: CouponsRequestDto): Promise<Response<CouponsResponseDto> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await postCoupon(request);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error };
}

export function usePatch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = async ( id: number, request: CouponsRequestDto): Promise<Response<CouponsResponseDto> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await patchCoupon(id, request);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { patch, loading, error };
}

export function useGet() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getCoupons = async (): Promise<Response<CouponsResponseDto[]> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await getAllCoupons();
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { getCoupons, loading, error }
}

export function useGetById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getById = async (id: number): Promise<Response<CouponsResponseDto> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await getCouponById(id);
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { getById, loading, error }
}


export function useGetByCode(code: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getByCode = async (): Promise<Response<CouponsResponseDto> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await getCouponByCode(code);
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { getByCode, loading, error }
}

export function useDelete() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const remove = async (id: number): Promise<Response<null> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await deleteCoupon(id);
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error }
}