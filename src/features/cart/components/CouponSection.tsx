import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartHeaderDto } from "../types/cart.type";
import { useRemoveCoupon as useRC } from "../hooks/useCart";
import { useApplyCoupon as useAC } from "../hooks/useCart";
import { useAlert } from "@/contexts/AlertContext";
import { useState } from "react";

interface CouponSectionProps {
    cartHeaderDto: CartHeaderDto;
}

export default function CouponSection({ cartHeaderDto }: CouponSectionProps) {
    const { showAlert } = useAlert();
    const { useRemoveCoupon } = useRC();
    const { useApplyCoupon } = useAC();
    const [coupon, setCoupon] = useState(cartHeaderDto.CouponCode || '');

    const handleRemoveCoupon = async () => {
        const response = await useRemoveCoupon(cartHeaderDto);
        if (response?.isSuccess) {
            showAlert(response.message!, 'success', 3000);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            showAlert(response?.message || "Unknown error", 'error', 3000);
        }
    };

    const handleApplyCoupon = async () => {
        const response = await useApplyCoupon(
            { ...cartHeaderDto, CouponCode: coupon }
        );
        if (response?.isSuccess) {
            showAlert(response.message!, 'success', 3000);
            setTimeout(() => {
                  window.location.reload();
              }, 2000);
        } else {
            showAlert(response?.message || "Unknown error", 'error', 3000);
        }
    };


    return (
        <Card className="p-6 space-y-2">
            <CardHeader>
                <CardTitle>
                    <h2 className="text-lg font-semibold">Coupon Code</h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your coupon code to apply discounts to your order.
                    </p>
                </CardTitle>
            </CardHeader>
            {cartHeaderDto.CouponCode ? (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-md">
                    <span className="text-lg font-semibold text-green-600">
                        Coupon Applied: {cartHeaderDto.CouponCode}
                    </span><Button
                        onClick={handleRemoveCoupon}
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-red-600"
                    >
                        <span className="sr-only">Remove</span>
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
            ) : (
                <div className="space-y-2">
                    <Label htmlFor="coupon">Coupon Code</Label>
                    <div className="flex gap-2">
                        <Input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            id="coupon"
                            placeholder="Enter coupon"
                            className="flex-1"
                        />
                        <Button onClick={handleApplyCoupon} type="button" variant="secondary">
                            Apply
                        </Button>
                    </div>
                </div>
            )}

        </Card>

    )
}