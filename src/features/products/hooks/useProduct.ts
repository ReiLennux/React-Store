import { useState } from "react";
import { pagerRequest, pagerResponse, ProductRequestDto, ProductResponseDto } from "../types/products.types";
import { del, get, getById, getPaged, post, put } from "../services/products.service";
import { Response } from "@/types/api";


export function useGet() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getProducts = async (): Promise<Response<ProductResponseDto[]> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await get();
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { getProducts, loading, error }
}

export function useGetPager() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getPager = async (pager: pagerRequest): Promise<Response<pagerResponse<ProductResponseDto>> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await getPaged(pager);
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { getPager, loading, error }
}

export function useGetById() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getId = async (id: number): Promise<Response<ProductResponseDto> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await getById(id);
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { getId, loading, error }
}

export function useDelete() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const delProduct = async (id: number): Promise<Response<null> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await del(id);
            return response
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'unknown error';
            setError(errorMessage);
            return null;

        } finally {
            setLoading(false);
        }
    };

    return { delProduct, loading, error }
}

export function usePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postProduct = async (request: ProductRequestDto): Promise<Response<ProductResponseDto> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await post(request);
            return response;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { postProduct, loading, error }
}

export function usePut() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const putProduct = async (request: ProductRequestDto): Promise<Response<ProductResponseDto> | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await put(request);
            return response;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { putProduct, loading, error }
}