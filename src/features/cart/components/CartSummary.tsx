import { CartHeaderDto } from "../types/cart.type";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CouponSection from "./CouponSection";

interface CartSummaryProps {
  CartHeader: CartHeaderDto | null;
  loading?: boolean;
  error?: string | null;
}

export default function CartSummary({
  CartHeader,
  loading = false,
  error,
}: CartSummaryProps) {


  if (loading) {
    return (
      <Card className="p-6">
        <CardTitle className="mb-4">Cart Summary</CardTitle>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border border-red-500">
        <CardTitle className="text-red-500">Error: {error}</CardTitle>
      </Card>
    );
  }

  if (!CartHeader) {
    return (
      <Card className="p-6">
        <CardTitle>No cart summary available</CardTitle>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <CardTitle className="text-lg font-semibold">Summary</CardTitle>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$4.99</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>- ${CartHeader.Discount.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4 flex justify-between text-foreground font-bold text-base">
          <span>Total</span>
          <span>${(CartHeader.Total + 4.99).toFixed(2)}</span>
        </div>

        {/* Coupon Code */}
        <CouponSection cartHeaderDto={CartHeader} />

        <Button className="w-full text-lg font-semibold mt-4">
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
