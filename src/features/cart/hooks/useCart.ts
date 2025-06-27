import { useState } from "react";
import { CartDto, CartHeaderDto } from "../types/cart.type";
import { Response } from "@/types/api";
import { applyCoupon, deleteCart, getCart, removeCoupon, upsertCart } from "../api/cart.api";

export function useGetCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const UseGetCart = async (userId: number): Promise<Response<CartDto> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCart(userId);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { UseGetCart, loading, error };
}

export function useUpsertCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useUpsertCart = async (cartDto: CartDto): Promise<Response<boolean> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await upsertCart(cartDto);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { useUpsertCart, loading, error };
}

export function useDeleteCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useDeleteCart = async (cartHeaderId: number): Promise<Response<boolean> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteCart(cartHeaderId);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { useDeleteCart, loading, error };
}

export function useApplyCoupon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useApplyCoupon = async (cartHeaderDto: CartHeaderDto): Promise<Response<boolean> | null> => {
    setLoading(true);
    setError(null);

    try {
      // Assuming there's an API endpoint to apply a coupon
      const response = await applyCoupon(cartHeaderDto);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { useApplyCoupon, loading, error };
}

export function useRemoveCoupon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useRemoveCoupon = async (cartHeaderDto: CartHeaderDto): Promise<Response<boolean> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await removeCoupon(cartHeaderDto);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { useRemoveCoupon, loading, error };
}